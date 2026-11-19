import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import {
  CartItem,
  OrderCustomerInfo,
  OrderRecord,
  ShippingMethodId,
  UserProfile,
} from '../types';
import { SHIPPING_OPTIONS, STORE_INFO, TRUJILLO_DISTRICTS } from '../data/storeData';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppUrl,
  formatCurrency,
} from '../utils/whatsapp';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  selectedShippingId: ShippingMethodId;
  onSelectShipping: (id: ShippingMethodId) => void;
  userProfile: UserProfile;
  defaultDistrict: string;
  defaultAddress: string;
  scheduledDate: string;
  onConfirmOrder: (order: OrderRecord) => void;
  onViewOrders: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  selectedShippingId,
  onSelectShipping,
  userProfile,
  defaultDistrict,
  defaultAddress,
  scheduledDate,
  onConfirmOrder,
  onViewOrders,
}) => {
  const [step, setStep] = useState<'cart' | 'checkout' | 'done'>('cart');
  const [fullName, setFullName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [district, setDistrict] = useState(defaultDistrict);
  const [address, setAddress] = useState(defaultAddress);
  const [notes, setNotes] = useState('');
  const [dateInput, setDateInput] = useState(scheduledDate);
  const [formError, setFormError] = useState('');
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shippingOption =
    SHIPPING_OPTIONS.find((opt) => opt.id === selectedShippingId) ?? SHIPPING_OPTIONS[0];
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingCost = items.length > 0 ? shippingOption.price : 0;
  const total = subtotal + shippingCost;

  const handleOpenCheckout = () => {
    setFullName(userProfile.name);
    setPhone(userProfile.phone);
    setDistrict(defaultDistrict);
    setAddress(
      selectedShippingId === 'pickup'
        ? `Recojo en tienda: ${STORE_INFO.address}`
        : defaultAddress
    );
    setDateInput(scheduledDate);
    setFormError('');
    setStep('checkout');
  };

  const handleSubmitWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      setFormError('Por favor completa tu nombre, teléfono y dirección o referencia.');
      return;
    }

    const orderId = `DET-${Math.floor(100000 + Math.random() * 900000)}`;
    const customer: OrderCustomerInfo = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      district,
      address: address.trim(),
      notes: notes.trim() || undefined,
      scheduledDate: selectedShippingId === 'scheduled' ? dateInput || undefined : undefined,
    };

    const whatsappText = buildWhatsAppOrderMessage({
      orderId,
      customer,
      items,
      shippingOption,
      subtotal,
      total,
    });

    const newOrder: OrderRecord = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...items],
      shippingOption,
      subtotal,
      shippingCost,
      total,
      status: 'Pendiente de confirmación',
      customer,
      whatsappText,
    };

    onConfirmOrder(newOrder);
    setCompletedOrder(newOrder);
    setStep('done');

    const waUrl = buildWhatsAppUrl(whatsappText);
    const link = document.createElement('a');
    link.href = waUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleCopyMessage = async () => {
    if (!completedOrder) return;
    try {
      await navigator.clipboard.writeText(completedOrder.whatsappText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const resetAndClose = () => {
    setStep('cart');
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Carrito de compras Detalle Con Amor"
    >
      <div className="w-full max-w-md bg-[#FDF8F9] h-full flex flex-col shadow-2xl border-l border-[#F0DFE5]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-[#F2E3E8]">
          <div className="flex items-center gap-2.5">
            {step === 'checkout' && (
              <button
                type="button"
                onClick={() => setStep('cart')}
                aria-label="Volver al carrito"
                className="w-8 h-8 rounded-full bg-[#FAF2F4] hover:bg-[#F3E2E7] flex items-center justify-center text-[#3D2B31] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-bold text-[#2E2326]">
                {step === 'cart' && 'Tu carrito de regalos'}
                {step === 'checkout' && 'Finalizar pedido por WhatsApp'}
                {step === 'done' && 'Pedido registrado'}
              </h2>
              <p className="text-xs text-[#7B656C]">
                {step === 'cart' && `${items.reduce((a, b) => a + b.quantity, 0)} artículos`}
                {step === 'checkout' && `WhatsApp directo: ${STORE_INFO.whatsappDisplay}`}
                {step === 'done' && 'Pendiente de confirmación por WhatsApp'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Cerrar carrito"
            className="w-9 h-9 rounded-full bg-[#FAF2F4] hover:bg-[#F3E2E7] flex items-center justify-center text-[#3D2B31] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {step === 'cart' && items.length === 0 && (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-[#FDECEF] text-[#E95D85] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-base font-semibold text-[#2E2326]">Tu carrito está vacío</h3>
              <p className="text-xs text-[#6E5A60] max-w-xs mx-auto">
                Explora nuestros ramos, cajas sorpresa o diseña un producto personalizado a tu gusto.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="mt-2 px-5 py-2.5 rounded-xl bg-[#E95D85] text-white text-xs font-semibold cursor-pointer"
              >
                Seguir explorando
              </button>
            </div>
          )}

          {step === 'cart' && items.length > 0 && (
            <>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="p-3.5 rounded-2xl bg-white border border-[#EFE0E5] flex gap-3.5 shadow-2xs"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FDF8F9] border border-[#F3E5EA] shrink-0">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-[#2E2326] line-clamp-1">
                          {item.name}
                        </h3>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          aria-label={`Eliminar ${item.name}`}
                          className="text-[#9A848B] hover:text-[#D1436A] p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#7B656C] mt-0.5">{item.presentationLabel}</p>

                      {item.customization && (
                        <div className="mt-1.5 p-2 rounded-lg bg-[#FDF6F8] text-[11px] text-[#5C474E] space-y-0.5">
                          <p className="font-medium text-[#2E2326]">
                            “{item.customization.mainText}”
                            {item.customization.secondaryText
                              ? ` · ${item.customization.secondaryText}`
                              : ''}
                          </p>
                          <p>
                            Color: {item.customization.colorName}
                            {item.customization.photoDataUrl ? ' · Con foto adjunta' : ''}
                          </p>
                        </div>
                      )}

                      {item.dedicationNote && (
                        <p className="text-[11px] text-[#7B5D66] italic mt-1 line-clamp-2">
                          Tarjeta: “{item.dedicationNote}”
                        </p>
                      )}

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-[#EED9E0] bg-[#FDF9FA] h-8">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.cartItemId, -1)}
                            aria-label="Disminuir cantidad"
                            className="w-7 h-full flex items-center justify-center text-[#4C3A40] hover:text-[#E95D85] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.cartItemId, 1)}
                            aria-label="Aumentar cantidad"
                            className="w-7 h-full flex items-center justify-center text-[#4C3A40] hover:text-[#E95D85] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#E95D85] tabular-nums">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping quick selector */}
              <div className="p-4 rounded-2xl bg-white border border-[#EFE0E5] space-y-2.5">
                <span className="block text-xs font-bold text-[#2E2326]">Modalidad de entrega</span>
                <div className="space-y-1.5">
                  {SHIPPING_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                        selectedShippingId === opt.id
                          ? 'bg-[#FDF4F7] border-[#E95D85]'
                          : 'border-[#F2E5E9] hover:bg-[#FDF9FA]'
                      }`}
                    >
                      <span className="flex items-center gap-2 font-medium text-[#2E2326]">
                        <input
                          type="radio"
                          name="cart-shipping"
                          checked={selectedShippingId === opt.id}
                          onChange={() => onSelectShipping(opt.id)}
                          className="accent-[#E95D85]"
                        />
                        {opt.title}
                      </span>
                      <span className="font-bold text-[#E95D85] tabular-nums">
                        {opt.price === 0 ? 'Gratis' : formatCurrency(opt.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 'checkout' && (
            <form id="whatsapp-checkout-form" onSubmit={handleSubmitWhatsAppOrder} className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-[#ECF5EE] border border-[#D4E7D8] text-xs text-[#31583E]">
                Sin tarjetas ni pasarelas: al confirmar se abrirá nuestro chat oficial de WhatsApp (
                <strong>{STORE_INFO.whatsappDisplay}</strong>) con tu pedido listo para coordinar pago y entrega.
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-[#FDECEF] border border-[#E95D85] text-xs font-medium text-[#A92D53]">
                  {formError}
                </div>
              )}

              <div>
                <label htmlFor="co-name" className="block text-xs font-semibold text-[#3D2B31] mb-1">
                  Nombre completo *
                </label>
                <input
                  id="co-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#EED9E0] text-sm focus:outline-none focus:border-[#E95D85]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="co-phone" className="block text-xs font-semibold text-[#3D2B31] mb-1">
                    Celular / WhatsApp *
                  </label>
                  <input
                    id="co-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="987 654 321"
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#EED9E0] text-sm focus:outline-none focus:border-[#E95D85]"
                  />
                </div>
                <div>
                  <label htmlFor="co-district" className="block text-xs font-semibold text-[#3D2B31] mb-1">
                    Distrito / Ciudad *
                  </label>
                  <select
                    id="co-district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-white border border-[#EED9E0] text-sm focus:outline-none focus:border-[#E95D85]"
                  >
                    {TRUJILLO_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="co-address" className="block text-xs font-semibold text-[#3D2B31] mb-1">
                  Dirección o referencia de entrega *
                </label>
                <input
                  id="co-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej. Calle Liverpool 284, Trujillo"
                  className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#EED9E0] text-sm focus:outline-none focus:border-[#E95D85]"
                />
              </div>

              {selectedShippingId === 'scheduled' && (
                <div>
                  <label htmlFor="co-date" className="block text-xs font-semibold text-[#3D2B31] mb-1">
                    Fecha de entrega deseada
                  </label>
                  <input
                    id="co-date"
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-white border border-[#EED9E0] text-sm focus:outline-none focus:border-[#E95D85]"
                  />
                </div>
              )}

              <div>
                <label htmlFor="co-notes" className="block text-xs font-semibold text-[#3D2B31] mb-1">
                  Indicaciones adicionales (opcional)
                </label>
                <textarea
                  id="co-notes"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Horario preferido, color de lazo o persona que recibe..."
                  className="w-full p-3 rounded-xl bg-white border border-[#EED9E0] text-sm focus:outline-none focus:border-[#E95D85] resize-none"
                />
              </div>

              {/* Resumen */}
              <div className="p-4 rounded-2xl bg-white border border-[#EFE0E5] space-y-2 text-xs">
                <div className="font-bold text-[#2E2326]">Resumen del pedido</div>
                {items.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between text-[#5C474E]">
                    <span className="truncate pr-2">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-semibold tabular-nums shrink-0">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#F4E6EB] flex justify-between text-[#5C474E]">
                  <span>{shippingOption.title}</span>
                  <span className="font-semibold tabular-nums">
                    {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#2E2326]">
                  <span>Total a coordinar</span>
                  <span className="text-[#E95D85] tabular-nums">{formatCurrency(total)}</span>
                </div>
              </div>
            </form>
          )}

          {step === 'done' && completedOrder && (
            <div className="py-6 space-y-4">
              <div className="p-5 rounded-3xl bg-white border border-[#EFE0E5] text-center space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-[#ECF5EE] text-[#4E8B63] flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#2E2326]">
                  Pedido #{completedOrder.id} guardado
                </h3>
                <p className="text-xs text-[#6E5A60] leading-relaxed">
                  Tu pedido quedó registrado en <strong>Mis pedidos</strong> como{' '}
                  <strong>Pendiente de confirmación</strong>. Envía el mensaje por WhatsApp para que
                  confirmemos los detalles contigo.
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href={buildWhatsAppUrl(completedOrder.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-4 rounded-xl bg-[#25A25A] hover:bg-[#1F8D4D] text-white text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir WhatsApp ({STORE_INFO.whatsappDisplay})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="h-10 px-4 rounded-xl bg-[#FAF2F4] hover:bg-[#F3E2E7] text-[#3D2B31] text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#25A25A]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Mensaje copiado' : 'Copiar texto del pedido'}</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetAndClose();
                  onViewOrders();
                }}
                className="w-full h-11 rounded-xl border border-[#E95D85] text-[#E95D85] hover:bg-[#FDECEF] text-xs font-semibold cursor-pointer"
              >
                Ver en Mis pedidos
              </button>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        {step === 'cart' && items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#F2E3E8] space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#6E5A60]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6E5A60]">
                <span>Entrega ({shippingOption.title})</span>
                <span className="tabular-nums font-medium">
                  {shippingCost === 0 ? 'Gratis' : formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2E2326] pt-1">
                <span>Total del pedido</span>
                <span className="text-[#E95D85] tabular-nums">{formatCurrency(total)}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleOpenCheckout}
              className="w-full h-12 rounded-2xl bg-[#E95D85] hover:bg-[#D84B74] text-white text-sm font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              Realizar pedido
            </button>
          </div>
        )}

        {step === 'checkout' && (
          <div className="p-5 bg-white border-t border-[#F2E3E8]">
            <button
              type="submit"
              form="whatsapp-checkout-form"
              className="w-full h-12 rounded-2xl bg-[#25A25A] hover:bg-[#1F8D4D] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirmar pedido por WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
