import React, { useState } from 'react';
import { Check, Heart, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import { GiftProduct } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { ProductImage } from './ProductImage';

interface ProductDetailModalProps {
  product: GiftProduct;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onAddToCart: (params: {
    product: GiftProduct;
    presentationLabel: string;
    unitPrice: number;
    quantity: number;
    dedicationNote?: string;
  }) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onClose,
  onAddToCart,
}) => {
  const [selectedPresId, setSelectedPresId] = useState(product.presentations[0].id);
  const [quantity, setQuantity] = useState(1);
  const [dedicationNote, setDedicationNote] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const selectedPres =
    product.presentations.find((p) => p.id === selectedPresId) ?? product.presentations[0];
  const unitPrice = product.basePrice + selectedPres.priceDelta;

  const handleAdd = () => {
    onAddToCart({
      product,
      presentationLabel: selectedPres.label,
      unitPrice,
      quantity,
      dedicationNote: dedicationNote.trim() || undefined,
    });
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 850);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-xs p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-title"
    >
      <div className="relative w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white border border-[#F0DFE5] shadow-2xl">
        {/* Top bar for mobile drag/close */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-sm border-b border-[#F4E6EB]">
          <span className="text-xs font-medium text-[#7B656C] truncate">
            {product.category} · {product.occasions.slice(0, 2).join(' / ')}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(product.id)}
              aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              className="w-9 h-9 rounded-full bg-[#FDF5F7] hover:bg-[#FCE8EE] flex items-center justify-center cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#E95D85] text-[#E95D85]' : 'text-[#6E5A60]'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar detalle de producto"
              className="w-9 h-9 rounded-full bg-[#FAF2F4] hover:bg-[#F3E2E7] flex items-center justify-center text-[#3D2B31] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-6">
          {/* Left image + includes */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FDF8F9] border border-[#F2E3E8]">
              <ProductImage
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FDF8F9] border border-[#F2E3E8]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#7B5D66] mb-2">
                ¿Qué incluye este regalo?
              </h3>
              <ul className="space-y-1.5">
                {product.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-xs text-[#4C3A40]">
                    <Check className="w-3.5 h-3.5 text-[#E95D85] shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right contiguous purchase module */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6E5A60]">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#2E2326] tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-[#F3B54A] text-[#F3B54A]" />
                    {product.rating.toFixed(1)}
                  </span>
                  <span>·</span>
                  <span>{product.reviewsCount} reseñas</span>
                </div>
                <h2 id="pdp-title" className="text-2xl font-semibold text-[#2E2326] mt-1">
                  {product.name}
                </h2>
                <p className="text-2xl font-bold text-[#E95D85] mt-1.5 tabular-nums">
                  {formatCurrency(unitPrice)}
                </p>
                <p className="text-sm text-[#5C474E] mt-2 leading-relaxed">{product.description}</p>
              </div>

              {/* Presentation Selector */}
              <div>
                <span className="block text-xs font-bold text-[#2E2326] mb-2">
                  Elige la presentación
                </span>
                <div className="space-y-2">
                  {product.presentations.map((pres) => {
                    const active = pres.id === selectedPresId;
                    return (
                      <button
                        key={pres.id}
                        type="button"
                        onClick={() => setSelectedPresId(pres.id)}
                        className={`w-full flex items-center justify-between gap-3 p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#FDECEF] border-[#E95D85]'
                            : 'bg-white border-[#EFE0E5] hover:bg-[#FDF8F9]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-semibold text-[#2E2326]">{pres.label}</div>
                          <div className="text-[11px] text-[#6E5A60]">{pres.details}</div>
                        </div>
                        <span className="text-xs font-bold text-[#E95D85] tabular-nums shrink-0">
                          {formatCurrency(product.basePrice + pres.priceDelta)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom card dedication */}
              <div>
                <label
                  htmlFor="pdp-dedication"
                  className="block text-xs font-bold text-[#2E2326] mb-1.5"
                >
                  Mensaje para la tarjeta dedicatoria (gratis, opcional)
                </label>
                <textarea
                  id="pdp-dedication"
                  rows={2}
                  maxLength={140}
                  value={dedicationNote}
                  onChange={(e) => setDedicationNote(e.target.value)}
                  placeholder="Ej. Feliz cumpleaños, gracias por iluminar mis días..."
                  className="w-full p-3 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-xs text-[#2E2326] focus:outline-none focus:border-[#E95D85] resize-none"
                />
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="pt-3 border-t border-[#F4E6EB] flex items-center gap-3">
              <div className="inline-flex items-center rounded-xl border border-[#EED9E0] bg-[#FDF9FA] h-12">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Disminuir cantidad"
                  className="w-10 h-full flex items-center justify-center text-[#4C3A40] hover:text-[#E95D85] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold tabular-nums">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar cantidad"
                  className="w-10 h-full flex items-center justify-center text-[#4C3A40] hover:text-[#E95D85] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 h-12 px-5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
                  justAdded
                    ? 'bg-[#5BA37A] text-white'
                    : 'bg-[#E95D85] hover:bg-[#D84B74] text-white shadow-sm'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡Agregado al carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Agregar · {formatCurrency(unitPrice * quantity)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
