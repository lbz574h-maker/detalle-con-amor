import React, { useMemo, useState } from 'react';
import {
  Coffee,
  Flower2,
  Gift,
  Heart,
  LayoutGrid,
  PartyPopper,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { GiftCategory, GiftProduct, OccasionTag } from '../types';
import { GIFT_CATEGORIES, POPULAR_OCCASIONS } from '../data/storeData';
import { formatCurrency } from '../utils/whatsapp';
import { ProductImage } from './ProductImage';

interface CatalogViewProps {
  products: GiftProduct[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: GiftProduct) => void;
  onGoCustomize: () => void;
}

type SortMode = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onGoCustomize,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GiftCategory>('Todos');
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionTag | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortMode>('relevance');

  const categoryIcon = (cat: GiftCategory) => {
    switch (cat) {
      case 'Todos':
        return <LayoutGrid className="w-5 h-5" />;
      case 'Ramos':
        return <Flower2 className="w-5 h-5" />;
      case 'Arreglos con globos':
        return <PartyPopper className="w-5 h-5" />;
      case 'Cajas personalizadas':
        return <Gift className="w-5 h-5" />;
      case 'Tazas':
        return <Coffee className="w-5 h-5" />;
      case 'Chocolates':
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesOccasion = !selectedOccasion || p.occasions.includes(selectedOccasion);
      const matchesPrice = p.basePrice <= maxPrice;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.occasions.some((o) => o.toLowerCase().includes(q));
      return matchesCategory && matchesOccasion && matchesPrice && matchesQuery;
    });

    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [products, query, selectedCategory, selectedOccasion, maxPrice, sortBy]);

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory('Todos');
    setSelectedOccasion(null);
    setMaxPrice(150);
    setSortBy('relevance');
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Search + Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C747B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué regalo estás buscando?"
            aria-label="Buscar regalos personalizados"
            className="w-full h-11 pl-10 pr-9 rounded-2xl bg-white border border-[#EED9E0] text-sm text-[#2E2326] placeholder:text-[#9A848B] focus:outline-none focus:border-[#E95D85] focus:ring-2 focus:ring-[#F9DCE5]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C747B] hover:text-[#2E2326] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowFilters((v) => !v)}
          className={`h-11 px-4 rounded-2xl border text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer shrink-0 ${
            showFilters || selectedOccasion !== null || maxPrice < 150
              ? 'bg-[#FDECEF] border-[#E95D85] text-[#C8436B]'
              : 'bg-white border-[#EED9E0] text-[#3D2B31] hover:bg-[#FDF6F8]'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filtros</span>
        </button>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="p-4 rounded-2xl bg-white border border-[#EED9E0] shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#2E2326]">
              Filtrar por presupuesto máximo
            </span>
            <span className="text-sm font-bold text-[#E95D85] tabular-nums">
              Hasta {formatCurrency(maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min={35}
            max={150}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#E95D85] cursor-pointer"
          />
          <div className="flex items-center justify-between text-xs text-[#8C747B]">
            <span>S/ 35</span>
            <button
              type="button"
              onClick={clearFilters}
              className="font-semibold text-[#E95D85] hover:underline cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
            <span>S/ 150</span>
          </div>
        </div>
      )}

      {/* Horizontal Categories */}
      <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
        {GIFT_CATEGORIES.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`flex flex-col items-center justify-center gap-1.5 min-w-[92px] px-3 py-3 rounded-2xl border text-center transition-all cursor-pointer shrink-0 ${
                active
                  ? 'bg-[#EF88A6] border-[#E95D85] text-white shadow-xs'
                  : 'bg-white border-[#F0DFE5] text-[#4C3A40] hover:bg-[#FDF5F7]'
              }`}
            >
              <div className={active ? 'text-white' : 'text-[#5C3B45]'}>
                {categoryIcon(category)}
              </div>
              <span className="text-[11px] font-medium leading-tight whitespace-nowrap">
                {category}
              </span>
            </button>
          );
        })}
      </div>

      {/* Búsquedas populares / Ocasiones */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-[#3D2B31]">Ocasiones populares</h2>
          {selectedOccasion && (
            <button
              type="button"
              onClick={() => setSelectedOccasion(null)}
              className="text-xs font-medium text-[#E95D85] hover:underline cursor-pointer"
            >
              Ver todas
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {POPULAR_OCCASIONS.map((occasion) => {
            const active = selectedOccasion === occasion;
            return (
              <button
                key={occasion}
                type="button"
                onClick={() => setSelectedOccasion(active ? null : occasion)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#E95D85] text-white'
                    : 'bg-[#FAF0F3] hover:bg-[#F6E2E8] text-[#4C3A40]'
                }`}
              >
                <Search className="w-3 h-3 opacity-75" />
                <span>{occasion}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-[#F2E5E9]">
        <p className="text-sm text-[#4C3A40] font-medium">
          Resultados{' '}
          <span className="text-[#8C747B] tabular-nums">({filteredProducts.length} productos)</span>
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="catalog-sort" className="text-xs text-[#7B656C]">
            Ordenar por:
          </label>
          <select
            id="catalog-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortMode)}
            className="h-9 px-3 rounded-xl bg-white border border-[#EED9E0] text-xs font-medium text-[#2E2326] focus:outline-none focus:border-[#E95D85] cursor-pointer"
          >
            <option value="relevance">Relevancia</option>
            <option value="price-asc">Menor precio</option>
            <option value="price-desc">Mayor precio</option>
            <option value="rating">Mejor valorados</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-8 rounded-3xl bg-white border border-[#F0DFE5] text-center space-y-3">
          <Gift className="w-10 h-10 text-[#E95D85] mx-auto" />
          <h3 className="text-base font-semibold text-[#2E2326]">
            No encontramos regalos con esos filtros
          </h3>
          <p className="text-sm text-[#6E5A60] max-w-md mx-auto">
            Prueba limpiando la búsqueda o diseña un regalo 100% a tu medida en nuestro estudio de personalización.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 rounded-xl bg-[#FAF0F3] text-[#3D2B31] text-sm font-medium hover:bg-[#F5E1E7] cursor-pointer"
            >
              Ver todo el catálogo
            </button>
            <button
              type="button"
              onClick={onGoCustomize}
              className="px-4 py-2 rounded-xl bg-[#E95D85] text-white text-sm font-semibold hover:bg-[#D84B74] cursor-pointer"
            >
              Personalizar regalo
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#F0DFE5] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#FDF8F9] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full block cursor-pointer"
                  >
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(product.id)}
                    aria-label={isFav ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
                    className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isFav ? 'fill-[#E95D85] text-[#E95D85]' : 'text-[#8C747B]'
                      }`}
                    />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProduct(product)}
                  className="p-3.5 text-left flex-1 flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-[11px] text-[#8C747B] truncate">
                      {product.category}
                      {product.tag ? ` · ${product.tag}` : ''}
                    </p>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-[#2E2326] mt-0.5 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#F7EDF0] flex items-center justify-between gap-2">
                    <span className="text-sm sm:text-base font-bold text-[#E95D85] tabular-nums">
                      {formatCurrency(product.basePrice)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#6E5A60] tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-[#F3B54A] text-[#F3B54A]" />
                      {product.rating.toFixed(1)}
                      <span className="text-[#9A848B]">({product.reviewsCount})</span>
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
