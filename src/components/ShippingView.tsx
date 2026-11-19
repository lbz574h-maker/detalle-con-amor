import React from 'react';
import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Gift,
  Heart,
  MapPin,
  MessageCircle,
  MessageSquareHeart,
  PackageCheck,
  ShieldCheck,
  Store,
  Truck,
} from 'lucide-react';
import { ShippingMethodId, ShippingOption } from '../types';
import { SHIPPING_OPTIONS, STORE_IMAGES, STORE_INFO, TRUJILLO_DISTRICTS } from '../data/storeData';
import { formatCurrency } from '../utils/whatsapp';
import { ProductImage } from './ProductImage';

interface ShippingViewProps {
  selectedShippingId: ShippingMethodId;
  onSelectShipping: (id: ShippingMethodId) => void;
  deliveryDistrict: string;
  onChangeDistrict: (district: string) => void;
  deliveryAddress: string;
  onChangeAddress: (addr: string) => void;
  scheduledDate: string;
  onChangeScheduledDate: (date: string) => void;
  onGoToCart: () => void;
}

export const ShippingView: React.FC<ShippingViewProps> = ({
  selectedShippingId,
  onSelectShipping,
  deliveryDistrict,
  onChangeDistrict,
  deliveryAddress,
  onChangeAddress,
  scheduledDate,
  onChangeScheduledDate,
  onGoToCart,
}) => {
  const iconForOption = (opt: ShippingOption) => {
    switch (opt.id) {
      case 'express':
        return <Truck className="w-6 h-6 text-[#6B8E5B]" />;
      case 'standard':
        return <PackageCheck className="w-6 h-6 text-[#9C7667]" />;
      case 'scheduled':
        return <Calendar className="w-6 h-6 text-[#C47C8E]" />;
      case 'pickup':
        return <Store className="w-6 h-6 text-[#E95D85]" />;
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Green-Cream Hero Banner */}
      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#EBF2E4] via-[#F2F4EA] to-[#E6EFE2] border border-[#DDE7D6] grid grid-cols-1 sm:grid-cols-12 items-center">
        <div className="sm:col-span-7 p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#2E2326] leading-snug">
            Enviamos felicidad a todo el país
          </h2>
          <p className="text-sm text-[#5A544E] mt-1.5">
            Rápido, seguro y con mucho amor desde {STORE_INFO.address}
          </p>
        </div>
        <div className="sm:col-span-5 h-36 sm:h-40">
          <ProductImage
            src={STORE_IMAGES.shippingTruck}
            alt="Camioncito de envíos Detalle Con Amor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Opciones de envío */}
      <section aria-labelledby="shipping-options-heading">
        <div className="flex items-center justify-between mb-3">
          <h3 id="shipping-options-heading" className="text-base font-semibold text-[#2E2326]">
            Opciones de envío
          </h3>
          <span className="text-xs text-[#7B656C]">Selecciona la modalidad para tu pedido</span>
        </div>

        <div className="space-y-3">
          {SHIPPING_OPTIONS.map((opt) => {
            const active = selectedShippingId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onSelectShipping(opt.id)}
                className={`w-full flex items-center justify-between gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FDF4F7] border-[#E95D85] shadow-xs'
                    : 'bg-white border-[#EFE0E5] hover:bg-[#FDF9FA]'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F3EE] border border-[#EBE6DC] flex items-center justify-center shrink-0">
                    {iconForOption(opt)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-semibold text-[#2E2326]">{opt.title}</span>
                      {opt.badge && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#E7F2E2] text-[#4E7142]">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5C474E] mt-1">{opt.description}</p>
                    <p className="text-[11px] text-[#8C747B] mt-0.5">{opt.note}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 text-right">
                  <div>
                    <div className="text-base font-bold text-[#E95D85] tabular-nums">
                      {opt.price === 0 ? 'Gratis' : formatCurrency(opt.price)}
                    </div>
                    <div className="text-[11px] text-[#7B656C]">{opt.etaLabel}</div>
                  </div>
                  {active ? (
                    <CheckCircle2 className="w-5 h-5 text-[#E95D85]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[#A28D93]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedShippingId === 'scheduled' && (
          <div className="mt-3 p-4 rounded-2xl bg-[#FDF4F7] border border-[#F5C6D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label htmlFor="scheduled-date-input" className="text-xs font-semibold text-[#3D2B31]">
              Fecha deseada para la entrega programada:
            </label>
            <input
              id="scheduled-date-input"
              type="date"
              value={scheduledDate}
              onChange={(e) => onChangeScheduledDate(e.target.value)}
              className="h-10 px-3 rounded-xl bg-white border border-[#EED9E0] text-sm text-[#2E2326]"
            />
          </div>
        )}
      </section>

      {/* ¿A dónde enviamos? */}
      <section aria-labelledby="destination-heading" className="space-y-2.5">
        <h3 id="destination-heading" className="flex items-center gap-2 text-base font-semibold text-[#2E2326]">
          <MapPin className="w-4 h-4 text-[#E95D85]" />
          <span>¿A dónde enviamos?</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-2xl border border-[#EFE0E5]">
          <div className="sm:col-span-5">
            <label htmlFor="shipping-district" className="block text-xs font-medium text-[#6E5A60] mb-1">
              Distrito / Ciudad
            </label>
            <select
              id="shipping-district"
              value={deliveryDistrict}
              onChange={(e) => onChangeDistrict(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm text-[#2E2326] focus:outline-none focus:border-[#E95D85]"
            >
              {TRUJILLO_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-7">
            <label htmlFor="shipping-address" className="block text-xs font-medium text-[#6E5A60] mb-1">
              Dirección o referencia de entrega
            </label>
            <input
              id="shipping-address"
              type="text"
              value={deliveryAddress}
              onChange={(e) => onChangeAddress(e.target.value)}
              placeholder="Ej. Calle Liverpool 284, Trujillo"
              className="w-full h-11 px-3.5 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm text-[#2E2326] focus:outline-none focus:border-[#E95D85]"
            />
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section aria-labelledby="benefits-heading">
        <h3 id="benefits-heading" className="flex items-center gap-2 text-base font-semibold text-[#2E2326] mb-3">
          <Gift className="w-4 h-4 text-[#E95D85]" />
          <span>Beneficios Detalle</span>
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 rounded-3xl bg-[#F4F7EE] border border-[#E4ECD9] p-4">
          <div className="text-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#E1ECD8] text-[#4C7341] flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-[#2E2326]">Envíos seguros</p>
            <p className="text-[11px] text-[#6E5A60] mt-0.5">Tus regalos siempre protegidos</p>
          </div>
          <div className="text-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#F5EDF0] text-[#5C3B45] flex items-center justify-center mx-auto mb-2">
              <Gift className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-[#2E2326]">Empaque especial</p>
            <p className="text-[11px] text-[#6E5A60] mt-0.5">Cada detalle llega listo para sorprender</p>
          </div>
          <div className="text-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#FCE9EF] text-[#E95D85] flex items-center justify-center mx-auto mb-2">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-[#2E2326]">Seguimiento</p>
            <p className="text-[11px] text-[#6E5A60] mt-0.5">Te mantenemos informado por WhatsApp</p>
          </div>
          <div className="text-center p-2">
            <div className="w-10 h-10 rounded-full bg-[#FDE4EC] text-[#E95D85] flex items-center justify-center mx-auto mb-2">
              <Heart className="w-5 h-5 fill-[#F8A5BE]" />
            </div>
            <p className="text-xs font-semibold text-[#2E2326]">Hecho con amor</p>
            <p className="text-[11px] text-[#6E5A60] mt-0.5">Porque cada entrega importa</p>
          </div>
        </div>
      </section>

      {/* Bottom Help Banner */}
      <div className="rounded-3xl bg-[#FCEBF0] border border-[#F5D2DC] p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-[#2E2326]">
            ¿Necesitas ayuda con tu envío?
          </h4>
          <p className="text-xs text-[#6E5A60] mt-0.5">
            Estamos aquí para ayudarte en Trujillo ({STORE_INFO.address}) y todo el Perú
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Hola Detalle · Con Amor, tengo una consulta sobre las opciones de envío.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 px-4 rounded-full bg-white hover:bg-[#FDF8FA] border border-[#E9C9D3] text-xs font-semibold text-[#2E2326] inline-flex items-center gap-2 shadow-2xs"
          >
            <MessageCircle className="w-4 h-4 text-[#25A25A]" />
            <span>Contáctanos ({STORE_INFO.whatsappDisplay})</span>
          </a>
          <button
            type="button"
            onClick={onGoToCart}
            className="h-10 px-4 rounded-full bg-[#E95D85] hover:bg-[#D84B74] text-white text-xs font-semibold cursor-pointer"
          >
            Ir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
