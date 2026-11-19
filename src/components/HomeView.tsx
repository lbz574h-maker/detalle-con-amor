import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Gift,
  Heart,
  HelpCircle,
  MessageCircle,
  Pencil,
  ShoppingBag,
  Star,
  Truck,
  User,
} from 'lucide-react';
import { GiftProduct, ViewTab } from '../types';
import { STORE_IMAGES, STORE_INFO } from '../data/storeData';
import { formatCurrency } from '../utils/whatsapp';
import { ProductImage } from './ProductImage';

interface HomeViewProps {
  onNavigate: (tab: ViewTab) => void;
  products: GiftProduct[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (product: GiftProduct) => void;
}

const HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'Regalos únicos',
    subtitle: 'hechos para',
    highlight: 'personas especiales',
    cta: 'Ver productos',
    target: 'catalog' as ViewTab,
    image: STORE_IMAGES.heroGiftBox,
    bgClass: 'from-[#FDE9EF] via-[#FADCE5] to-[#F7CFD9]',
  },
  {
    id: 'slide-2',
    title: 'Diseña tu detalle',
    subtitle: 'tazas, cojines y',
    highlight: 'cajas a tu gusto',
    cta: 'Personalizar ahora',
    target: 'customize' as ViewTab,
    image: STORE_IMAGES.teddyMugBox,
    bgClass: 'from-[#F5ECF9] via-[#F2E2F7] to-[#FCE6EE]',
  },
  {
    id: 'slide-3',
    title: 'Envíos con amor',
    subtitle: 'en Trujillo y',
    highlight: 'todo el Perú',
    cta: 'Ver opciones de envío',
    target: 'shipping' as ViewTab,
    image: STORE_IMAGES.pinkRoses,
    bgClass: 'from-[#EDF4EA] via-[#F6F0EC] to-[#FCE9EF]',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  products,
  favorites,
  onToggleFavorite,
  onSelectProduct,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = HERO_SLIDES[activeSlide];

  const menuTiles: {
    id: ViewTab;
    title: string;
    subtitle: string;
    bg: string;
    iconBg: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'catalog',
      title: 'Catálogo',
      subtitle: 'Explora nuestros productos',
      bg: 'bg-[#FDECEF] hover:bg-[#FCE2E7]',
      iconBg: 'bg-white/90 text-[#E95D85]',
      icon: <ShoppingBag className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      id: 'customize',
      title: 'Personaliza',
      subtitle: 'Crea tu regalo único',
      bg: 'bg-[#F3EEF9] hover:bg-[#EAE1F5]',
      iconBg: 'bg-white/90 text-[#9B72C7]',
      icon: <Pencil className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      id: 'orders',
      title: 'Mis pedidos',
      subtitle: 'Consulta el estado de tus pedidos',
      bg: 'bg-[#FDF4E7] hover:bg-[#FAEBCE]',
      iconBg: 'bg-white/90 text-[#D88B4B]',
      icon: <Gift className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      id: 'favorites',
      title: 'Favoritos',
      subtitle: 'Tus productos guardados',
      bg: 'bg-[#ECF5EE] hover:bg-[#DFEFE3]',
      iconBg: 'bg-white/90 text-[#5BA37A]',
      icon: <Heart className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      id: 'account',
      title: 'Mi cuenta',
      subtitle: 'Edita tu información y preferencias',
      bg: 'bg-[#EEF4FA] hover:bg-[#E1ECF7]',
      iconBg: 'bg-white/90 text-[#5D8EC4]',
      icon: <User className="w-5 h-5" strokeWidth={1.8} />,
    },
    {
      id: 'help',
      title: 'Ayuda',
      subtitle: 'Preguntas frecuentes y contacto',
      bg: 'bg-[#FDF1EB] hover:bg-[#FAE4DA]',
      iconBg: 'bg-white/90 text-[#D97A5B]',
      icon: <HelpCircle className="w-5 h-5" strokeWidth={1.8} />,
    },
  ];

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-7 pb-6">
      {/* Hero Banner Carousel */}
      <section aria-label="Destacados de Detalle Con Amor">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slide.bgClass} border border-[#F5D6DF] shadow-sm`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-center">
              <p className="text-xs font-medium text-[#8C6470] tracking-wide mb-2">
                {STORE_INFO.city} · {STORE_INFO.address}
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#2E2326] leading-tight text-balance">
                {slide.title}{' '}
                <span className="font-normal text-[#5C474E] block sm:inline">{slide.subtitle}</span>
                <span
                  className="block text-3xl sm:text-4xl lg:text-[42px] text-[#E95D85] font-bold mt-0.5 leading-none"
                  style={{ fontFamily: 'var(--font-script)' }}
                >
                  {slide.highlight}
                </span>
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate(slide.target)}
                  className="px-5 py-2.5 rounded-xl bg-[#E95D85] hover:bg-[#D84B74] active:scale-[0.98] text-white text-sm font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
                >
                  {slide.cta}
                </button>
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(
                    'Hola Detalle · Con Amor, quisiera asesoría para elegir un regalo personalizado.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/85 hover:bg-white text-[#3D2B31] text-sm font-medium border border-[#F0CCD7] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 text-[#25A25A]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-6 relative min-h-[200px] sm:min-h-[240px] md:min-h-[270px]">
              <ProductImage
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover md:rounded-l-3xl"
              />
              <div className="hidden md:flex absolute bottom-3 right-3 gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                  }
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#3D2B31] flex items-center justify-center shadow-sm cursor-pointer"
                  aria-label="Banner anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#3D2B31] flex items-center justify-center shadow-sm cursor-pointer"
                  aria-label="Siguiente banner"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel dots */}
        <div className="flex items-center justify-center gap-2 mt-3">
          {HERO_SLIDES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveSlide(idx)}
              aria-label={`Ver presentación ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === activeSlide ? 'w-6 bg-[#E95D85]' : 'w-2 bg-[#E5CBD3] hover:bg-[#D5ABB8]'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Menú Principal */}
      <section aria-labelledby="home-menu-heading">
        <div className="flex items-center justify-between mb-3.5">
          <h2
            id="home-menu-heading"
            className="text-base font-bold tracking-wide text-[#3D2B31]"
          >
            Menú de la tienda
          </h2>
          <span className="text-xs text-[#7B656C]">Acceso rápido</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {menuTiles.map((tile) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => onNavigate(tile.id)}
              className={`group flex items-center justify-between gap-3 p-4 rounded-2xl ${tile.bg} border border-black/5 text-left transition-all duration-150 hover:-translate-y-0.5 shadow-2xs cursor-pointer`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-11 h-11 rounded-2xl ${tile.iconBg} flex items-center justify-center shadow-2xs shrink-0`}
                >
                  {tile.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-semibold text-[#2E2326] truncate">
                    {tile.title}
                  </div>
                  <div className="text-xs text-[#6E5A60] line-clamp-1 mt-0.5">{tile.subtitle}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8C747B] shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>

        {/* Envíos a todo el país full-width card */}
        <button
          type="button"
          onClick={() => onNavigate('shipping')}
          className="mt-3 w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#FDF2F5] hover:bg-[#FCE6EC] border border-[#F5D6DF] text-left transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white flex items-center justify-center text-[#E95D85] shadow-2xs shrink-0">
              <Truck className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
              <div className="text-[15px] font-semibold text-[#2E2326]">
                Envíos a todo el país
              </div>
              <div className="text-xs text-[#6E5A60] mt-0.5">
                Entrega express en Trujillo y envíos seguros a todo el Perú · Recojo en Liverpool 284
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E95D85] shrink-0">
            <span className="hidden sm:inline">Ver tarifas</span>
            <Heart className="w-4 h-4 fill-[#F4A6BC] text-[#E95D85] group-hover:scale-110 transition-transform" />
          </div>
        </button>
      </section>

      {/* Featured Products */}
      <section aria-labelledby="featured-gifts-heading">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 id="featured-gifts-heading" className="text-lg font-semibold text-[#2E2326]">
              Elegidos con amor
            </h2>
            <p className="text-xs text-[#7B656C]">
              Nuestros regalos más pedidos para sorprender hoy
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-[#E95D85] hover:text-[#C8436B] flex items-center gap-1 cursor-pointer whitespace-nowrap"
          >
            Ver catálogo <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          {featuredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#F1E2E7] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-[#FDF8F9] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="w-full h-full block text-left cursor-pointer"
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
                    aria-label={isFav ? `Quitar ${product.name} de favoritos` : `Guardar ${product.name} en favoritos`}
                    className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-xs transition-transform active:scale-90 cursor-pointer"
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
                    <div className="text-[11px] font-medium text-[#8C747B] truncate">
                      {product.category}
                    </div>
                    <h3 className="text-sm font-semibold text-[#2E2326] mt-0.5 line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-[#E95D85] tabular-nums">
                      {formatCurrency(product.basePrice)}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-[#6E5A60] tabular-nums">
                      <Star className="w-3.5 h-3.5 fill-[#F3B54A] text-[#F3B54A]" />
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
