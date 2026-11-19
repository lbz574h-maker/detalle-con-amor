import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { GiftProduct } from '../types';
import { formatCurrency } from '../utils/whatsapp';
import { ProductImage } from './ProductImage';

interface FavoritesViewProps {
  products: GiftProduct[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: GiftProduct) => void;
  onExploreCatalog: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onExploreCatalog,
}) => {
  const savedProducts = products.filter((p) => favorites.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="p-10 rounded-3xl bg-white border border-[#EFE0E5] text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-[#FDECEF] text-[#E95D85] flex items-center justify-center mx-auto">
          <Heart className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-[#2E2326]">Aún no tienes favoritos guardados</h3>
        <p className="text-xs text-[#6E5A60] max-w-sm mx-auto">
          Toca el corazón en cualquier ramo, taza o caja personalizada para guardarlo aquí y compararlo luego.
        </p>
        <button
          type="button"
          onClick={onExploreCatalog}
          className="mt-1 px-5 py-2.5 rounded-xl bg-[#E95D85] text-white text-xs font-semibold hover:bg-[#D84B74] cursor-pointer"
        >
          Explorar catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8">
      <p className="text-xs text-[#7B656C]">
        Tienes <strong className="text-[#2E2326]">{savedProducts.length}</strong> regalo(s) guardados
        en este dispositivo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-[#EFE0E5] overflow-hidden shadow-2xs flex flex-col"
          >
            <div className="relative aspect-[4/3] bg-[#FDF8F9]">
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="w-full h-full block cursor-pointer"
              >
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                type="button"
                onClick={() => onToggleFavorite(product.id)}
                aria-label={`Quitar ${product.name} de favoritos`}
                className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-xs cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-[#E95D85] text-[#E95D85]" />
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[11px] text-[#8C747B]">{product.category}</div>
                <h3 className="text-sm font-semibold text-[#2E2326] mt-0.5">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-bold text-[#E95D85] tabular-nums">
                    {formatCurrency(product.basePrice)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#6E5A60] tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-[#F3B54A] text-[#F3B54A]" />
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="mt-3 w-full h-10 rounded-xl bg-[#FDECEF] hover:bg-[#FADBE2] text-[#C8436B] text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Elegir presentación</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
