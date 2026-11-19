import React, { useRef, useState } from 'react';
import {
  Check,
  Coffee,
  Crown,
  Flower2,
  Gift,
  Heart,
  ImagePlus,
  KeyRound,
  RefreshCw,
  ShoppingBag,
  Smile,
  Square,
  Star,
  Trash2,
} from 'lucide-react';
import {
  CustomBaseId,
  CustomizationSpec,
  DecorativeIconId,
} from '../types';
import {
  CUSTOM_BASE_PRODUCTS,
  DESIGN_COLORS,
  STORE_IMAGES,
} from '../data/storeData';
import { formatCurrency } from '../utils/whatsapp';

interface CustomizerViewProps {
  onAddCustomizedToCart: (spec: CustomizationSpec, price: number) => void;
}

export const CustomizerView: React.FC<CustomizerViewProps> = ({ onAddCustomizedToCart }) => {
  const [baseId, setBaseId] = useState<CustomBaseId>('mug');
  const [mainText, setMainText] = useState('Te quiero MAMÁ');
  const [secondaryText, setSecondaryText] = useState('Eres mi persona favorita');
  const [iconId, setIconId] = useState<DecorativeIconId>('heart');
  const [colorHex, setColorHex] = useState(DESIGN_COLORS[0].hex);
  const [fontStyle, setFontStyle] = useState<'script' | 'clean'>('script');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | undefined>(undefined);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedProduct = CUSTOM_BASE_PRODUCTS.find((p) => p.id === baseId) ?? CUSTOM_BASE_PRODUCTS[0];
  const selectedColor = DESIGN_COLORS.find((c) => c.hex === colorHex) ?? DESIGN_COLORS[0];

  const baseIcons: Record<CustomBaseId, React.ReactNode> = {
    mug: <Coffee className="w-5 h-5" />,
    cushion: <Square className="w-5 h-5" />,
    keychain: <KeyRound className="w-5 h-5" />,
    bottle: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 3h6v3l2 3v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9l2-3V3z" />
      </svg>
    ),
    giftbox: <Gift className="w-5 h-5" />,
  };

  const decorativeIcons: { id: DecorativeIconId; label: string; icon: React.ReactNode }[] = [
    { id: 'heart', label: 'Corazón', icon: <Heart className="w-4 h-4 fill-current" /> },
    { id: 'star', label: 'Estrella', icon: <Star className="w-4 h-4 fill-current" /> },
    { id: 'flower', label: 'Flor', icon: <Flower2 className="w-4 h-4" /> },
    { id: 'crown', label: 'Corona', icon: <Crown className="w-4 h-4" /> },
    { id: 'smile', label: 'Sonrisa', icon: <Smile className="w-4 h-4" /> },
  ];

  const renderSelectedDeco = (sizeClass = 'w-6 h-6') => {
    switch (iconId) {
      case 'heart':
        return <Heart className={`${sizeClass} fill-current`} style={{ color: colorHex }} />;
      case 'star':
        return <Star className={`${sizeClass} fill-current`} style={{ color: colorHex }} />;
      case 'flower':
        return <Flower2 className={sizeClass} style={{ color: colorHex }} />;
      case 'crown':
        return <Crown className={sizeClass} style={{ color: colorHex }} />;
      case 'smile':
        return <Smile className={sizeClass} style={{ color: colorHex }} />;
    }
  };

  const handleCycleProduct = () => {
    const idx = CUSTOM_BASE_PRODUCTS.findIndex((p) => p.id === baseId);
    const next = CUSTOM_BASE_PRODUCTS[(idx + 1) % CUSTOM_BASE_PRODUCTS.length];
    setBaseId(next.id);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoDataUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    onAddCustomizedToCart(
      {
        baseId,
        baseLabel: selectedProduct.label,
        mainText: mainText.trim() || 'Para alguien especial',
        secondaryText: secondaryText.trim(),
        iconId,
        colorHex,
        colorName: selectedColor.name,
        fontStyle,
        photoDataUrl,
      },
      selectedProduct.price
    );
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1800);
  };

  const renderLiveProductMockup = (compact = false) => {
    const textFont = fontStyle === 'script' ? 'var(--font-script)' : 'var(--font-display)';

    return (
      <div className="relative w-full h-full flex items-center justify-center p-3">
        {baseId === 'mug' && (
          <div className="relative flex items-center justify-center">
            {/* Mug handle */}
            <div
              className={`${
                compact ? 'w-5 h-9 -right-3 border-[4px]' : 'w-11 h-20 -right-7 border-[8px]'
              } absolute rounded-r-full border-[#EFE7E4] bg-transparent shadow-xs`}
            />
            {/* Mug body */}
            <div
              className={`${
                compact ? 'w-20 h-22 rounded-b-xl rounded-t-sm' : 'w-48 sm:w-56 h-52 sm:h-60 rounded-b-3xl rounded-t-lg'
              } relative bg-gradient-to-br from-white via-[#FCF9F8] to-[#EFE8E5] border border-[#E5DAD6] shadow-md flex flex-col items-center justify-center px-3 text-center overflow-hidden`}
            >
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-black/5 to-transparent" />
              {photoDataUrl && (
                <img
                  src={photoDataUrl}
                  alt="Foto personalizada"
                  className={`${
                    compact ? 'w-7 h-7 mb-0.5' : 'w-14 h-14 mb-2'
                  } rounded-full object-cover border-2 border-white shadow-xs`}
                />
              )}
              <p
                className={`${
                  compact ? 'text-xs leading-tight' : 'text-2xl sm:text-3xl leading-tight'
                } font-bold break-words max-w-full`}
                style={{ color: colorHex, fontFamily: textFont }}
              >
                {mainText || 'Tu texto aquí'}
              </p>
              {secondaryText && (
                <p
                  className={`${
                    compact ? 'text-[7px] mt-0.5' : 'text-xs sm:text-sm mt-1.5'
                  } font-medium text-[#4C3A40] break-words max-w-full`}
                >
                  {secondaryText}
                </p>
              )}
              <div className={compact ? 'mt-1' : 'mt-2.5'}>
                {renderSelectedDeco(compact ? 'w-3 h-3' : 'w-6 h-6')}
              </div>
            </div>
          </div>
        )}

        {baseId === 'cushion' && (
          <div
            className={`${
              compact ? 'w-22 h-22 rounded-2xl p-2' : 'w-52 sm:w-60 h-52 sm:h-60 rounded-[2rem] p-6'
            } relative bg-gradient-to-br from-[#FFFDFD] via-[#FAF3F5] to-[#EFE2E6] border-2 border-[#E6D4DA] shadow-md flex flex-col items-center justify-center text-center`}
          >
            <div className="absolute inset-2 rounded-[1.5rem] border border-dashed border-[#E6CED6] pointer-events-none" />
            {photoDataUrl && (
              <img
                src={photoDataUrl}
                alt="Foto en cojín"
                className={`${
                  compact ? 'w-7 h-7 mb-0.5' : 'w-16 h-16 mb-2'
                } rounded-xl object-cover border-2 border-white shadow-xs`}
              />
            )}
            <p
              className={`${compact ? 'text-xs' : 'text-2xl sm:text-3xl'} font-bold leading-tight`}
              style={{ color: colorHex, fontFamily: textFont }}
            >
              {mainText || 'Tu texto aquí'}
            </p>
            {secondaryText && (
              <p className={`${compact ? 'text-[7px]' : 'text-xs sm:text-sm mt-1.5'} text-[#4C3A40]`}>
                {secondaryText}
              </p>
            )}
            <div className={compact ? 'mt-1' : 'mt-2.5'}>
              {renderSelectedDeco(compact ? 'w-3 h-3' : 'w-6 h-6')}
            </div>
          </div>
        )}

        {baseId === 'keychain' && (
          <div className="flex flex-col items-center">
            <div
              className={`${
                compact ? 'w-4 h-4 border-2' : 'w-9 h-9 border-[3px]'
              } rounded-full border-[#D8B468]`}
            />
            <div className={`${compact ? 'w-0.5 h-2' : 'w-1 h-4'} bg-[#D8B468]`} />
            <div
              className={`${
                compact ? 'w-18 h-18 rounded-2xl p-2' : 'w-44 h-44 rounded-3xl p-5'
              } bg-gradient-to-br from-white via-[#FFF7FA] to-[#FCE9F0] border-2 border-[#F0CCD7] shadow-md flex flex-col items-center justify-center text-center`}
            >
              {photoDataUrl ? (
                <img
                  src={photoDataUrl}
                  alt="Foto llavero"
                  className={`${
                    compact ? 'w-6 h-6 mb-0.5' : 'w-14 h-14 mb-1.5'
                  } rounded-full object-cover border-2 border-white shadow-xs`}
                />
              ) : (
                <div className={compact ? 'mb-0.5' : 'mb-1.5'}>
                  {renderSelectedDeco(compact ? 'w-3.5 h-3.5' : 'w-7 h-7')}
                </div>
              )}
              <p
                className={`${compact ? 'text-[10px]' : 'text-xl'} font-bold leading-tight`}
                style={{ color: colorHex, fontFamily: textFont }}
              >
                {mainText || 'Tu texto'}
              </p>
              {secondaryText && !compact && (
                <p className="text-[11px] text-[#5C474E] mt-1 line-clamp-2">{secondaryText}</p>
              )}
            </div>
          </div>
        )}

        {baseId === 'bottle' && (
          <div className="flex flex-col items-center">
            <div
              className={`${
                compact ? 'w-7 h-3 rounded-t-md' : 'w-16 h-6 rounded-t-xl'
              } bg-[#3D2B31]`}
            />
            <div
              className={`${
                compact ? 'w-12 h-20 rounded-xl px-1.5' : 'w-32 h-52 rounded-2xl px-4'
              } bg-gradient-to-r from-[#F9F6F7] via-white to-[#EAE2E5] border border-[#DFD2D6] shadow-md flex flex-col items-center justify-center text-center`}
            >
              {photoDataUrl && (
                <img
                  src={photoDataUrl}
                  alt="Foto botella"
                  className={`${
                    compact ? 'w-5 h-5 mb-0.5' : 'w-12 h-12 mb-2'
                  } rounded-full object-cover border border-white shadow-xs`}
                />
              )}
              <p
                className={`${compact ? 'text-[9px]' : 'text-lg'} font-bold leading-tight`}
                style={{ color: colorHex, fontFamily: textFont }}
              >
                {mainText || 'Tu nombre'}
              </p>
              {secondaryText && !compact && (
                <p className="text-[10px] text-[#5C474E] mt-1 line-clamp-2">{secondaryText}</p>
              )}
              <div className={compact ? 'mt-0.5' : 'mt-2'}>
                {renderSelectedDeco(compact ? 'w-2.5 h-2.5' : 'w-5 h-5')}
              </div>
            </div>
          </div>
        )}

        {baseId === 'giftbox' && (
          <div className="flex flex-col items-center">
            <div
              className={`${
                compact ? 'w-22 h-4 rounded-t-lg' : 'w-56 sm:w-64 h-8 rounded-t-2xl'
              } bg-[#F9DCE5] border border-[#EAB8C7] shadow-xs flex items-center justify-center`}
            >
              <div
                className={`${compact ? 'w-3 h-full' : 'w-7 h-full'} bg-[#E95D85]/80`}
              />
            </div>
            <div
              className={`${
                compact ? 'w-20 h-18 rounded-b-lg p-1.5' : 'w-52 sm:w-60 h-44 sm:h-48 rounded-b-2xl p-5'
              } bg-[#FFF8FA] border-x border-b border-[#EAB8C7] shadow-md flex flex-col items-center justify-center text-center`}
            >
              {photoDataUrl && (
                <img
                  src={photoDataUrl}
                  alt="Foto caja"
                  className={`${
                    compact ? 'w-6 h-6 mb-0.5' : 'w-14 h-14 mb-2'
                  } rounded-lg object-cover border border-white shadow-xs`}
                />
              )}
              <p
                className={`${compact ? 'text-[10px]' : 'text-2xl'} font-bold leading-tight`}
                style={{ color: colorHex, fontFamily: textFont }}
              >
                {mainText || 'Caja sorpresa'}
              </p>
              {secondaryText && (
                <p className={`${compact ? 'text-[7px]' : 'text-xs mt-1'} text-[#5C474E]`}>
                  {secondaryText}
                </p>
              )}
              <div className={compact ? 'mt-0.5' : 'mt-2'}>
                {renderSelectedDeco(compact ? 'w-3 h-3' : 'w-5 h-5')}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header Subtitle */}
      <div className="text-center sm:text-left">
        <p className="text-sm text-[#7B5D66]">Crea un regalo único y especial con vista previa en vivo</p>
      </div>

      {/* 1. Elige tu producto */}
      <section aria-labelledby="step-1-heading">
        <h2 id="step-1-heading" className="text-sm font-bold text-[#2E2326] mb-3">
          1. Elige tu producto
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
          {CUSTOM_BASE_PRODUCTS.map((item) => {
            const active = item.id === baseId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setBaseId(item.id)}
                className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FDECEF] border-[#E95D85] text-[#C8436B] shadow-2xs'
                    : 'bg-white border-[#EFE0E5] text-[#4C3A40] hover:bg-[#FDF6F8]'
                }`}
              >
                <div>{baseIcons[item.id]}</div>
                <span className="text-xs font-semibold leading-tight">{item.label}</span>
                <span className="text-[11px] font-bold tabular-nums opacity-85">
                  {formatCurrency(item.price)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Live Interactive Studio Stage + Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Live Preview Stage */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative rounded-3xl overflow-hidden border border-[#EFE0E5] bg-gradient-to-br from-[#FBF5F2] via-[#FAF0EC] to-[#F6E8E4] min-h-[300px] sm:min-h-[340px] flex flex-col items-center justify-center p-5 shadow-xs">
            <img
              src={STORE_IMAGES.customMug}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none"
            />
            <div className="relative z-10 w-full flex items-center justify-center">
              {renderLiveProductMockup(false)}
            </div>
            <button
              type="button"
              onClick={handleCycleProduct}
              className="relative z-10 mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white border border-[#EED9E0] text-xs font-medium text-[#4C3A40] shadow-2xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#E95D85]" />
              <span>Cambiar producto</span>
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#EFE0E5] text-xs text-[#6E5A60] flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong className="text-[#2E2326]">{selectedProduct.label}:</strong>{' '}
              {selectedProduct.subtitle}
            </span>
            <span className="text-[#8C747B]">{selectedProduct.dimensions}</span>
          </div>
        </div>

        {/* 2. Personaliza tu diseño */}
        <div className="lg:col-span-7 space-y-4 bg-white rounded-3xl border border-[#EFE0E5] p-5 shadow-2xs">
          <h2 className="text-sm font-bold text-[#2E2326]">2. Personaliza tu diseño</h2>

          {/* Main text */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="custom-main-text" className="text-xs font-medium text-[#5C474E]">
                Texto principal
              </label>
              <span className="text-xs text-[#8C747B] tabular-nums">
                {mainText.length}/25
              </span>
            </div>
            <div className="relative">
              <input
                id="custom-main-text"
                type="text"
                maxLength={25}
                value={mainText}
                onChange={(e) => setMainText(e.target.value)}
                placeholder="Ej. Te quiero MAMÁ"
                className="w-full h-11 px-4 pr-10 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm text-[#2E2326] focus:outline-none focus:border-[#E95D85] focus:bg-white"
              />
              <Heart className="w-4 h-4 text-[#E95D85] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Secondary text */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="custom-secondary-text" className="text-xs font-medium text-[#5C474E]">
                Texto secundario (opcional)
              </label>
              <span className="text-xs text-[#8C747B] tabular-nums">
                {secondaryText.length}/30
              </span>
            </div>
            <div className="relative">
              <input
                id="custom-secondary-text"
                type="text"
                maxLength={30}
                value={secondaryText}
                onChange={(e) => setSecondaryText(e.target.value)}
                placeholder="Ej. Eres mi persona favorita"
                className="w-full h-11 px-4 pr-10 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm text-[#2E2326] focus:outline-none focus:border-[#E95D85] focus:bg-white"
              />
              <Heart className="w-4 h-4 text-[#D99BB0] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Font style + Optional Photo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="block text-xs font-medium text-[#5C474E] mb-1.5">
                Tipografía del diseño
              </span>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-[#FAF2F5] rounded-xl">
                <button
                  type="button"
                  onClick={() => setFontStyle('script')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    fontStyle === 'script'
                      ? 'bg-white text-[#2E2326] shadow-2xs'
                      : 'text-[#6E5A60] hover:text-[#2E2326]'
                  }`}
                >
                  Manuscrita
                </button>
                <button
                  type="button"
                  onClick={() => setFontStyle('clean')}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    fontStyle === 'clean'
                      ? 'bg-white text-[#2E2326] shadow-2xs'
                      : 'text-[#6E5A60] hover:text-[#2E2326]'
                  }`}
                >
                  Editorial
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs font-medium text-[#5C474E] mb-1.5">
                Fotografía opcional
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {photoDataUrl ? (
                <div className="flex items-center justify-between gap-2 h-10 px-3 rounded-xl bg-[#FDECEF] border border-[#F5C6D6]">
                  <span className="text-xs font-medium text-[#C8436B] truncate">
                    Foto adjuntada
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhotoDataUrl(undefined)}
                    aria-label="Quitar foto adjuntada"
                    className="text-[#C8436B] hover:text-[#9F2E51] cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-10 px-3 rounded-xl border border-dashed border-[#DFB9C5] bg-[#FDF9FA] hover:bg-[#FDECEF] text-xs font-medium text-[#5C474E] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ImagePlus className="w-4 h-4 text-[#E95D85]" />
                  <span>Subir foto</span>
                </button>
              )}
            </div>
          </div>

          {/* Decorative icon */}
          <div>
            <span className="block text-xs font-medium text-[#5C474E] mb-2">
              Ícono decorativo
            </span>
            <div className="grid grid-cols-5 gap-2">
              {decorativeIcons.map((deco) => {
                const active = iconId === deco.id;
                return (
                  <button
                    key={deco.id}
                    type="button"
                    onClick={() => setIconId(deco.id)}
                    aria-label={deco.label}
                    className={`h-11 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      active
                        ? 'bg-[#FDECEF] border-[#E95D85] text-[#E95D85]'
                        : 'bg-[#FDF9FA] border-[#EFE0E5] text-[#5C474E] hover:bg-white'
                    }`}
                  >
                    {deco.icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color swatches */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#5C474E]">Color del diseño</span>
              <span className="text-xs text-[#7B656C]">{selectedColor.name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {DESIGN_COLORS.map((swatch) => {
                const active = swatch.hex === colorHex;
                return (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => setColorHex(swatch.hex)}
                    aria-label={swatch.name}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                      active ? 'scale-110 ring-2 ring-offset-2 ring-[#E95D85]' : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {active && <Check className="w-4 h-4 text-white" strokeWidth={2.5} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Vista previa + Add to Cart Bar */}
      <section
        aria-labelledby="step-3-heading"
        className="rounded-3xl bg-white border border-[#EFE0E5] p-4 sm:p-5 shadow-2xs"
      >
        <h2 id="step-3-heading" className="text-sm font-bold text-[#2E2326] mb-3">
          3. Vista previa y resumen
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-24 h-24 rounded-2xl bg-[#FAF2F4] border border-[#EFE0E5] shrink-0 overflow-hidden flex items-center justify-center">
              {renderLiveProductMockup(true)}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2E2326]">
                {selectedProduct.label} personalizada
              </p>
              <p className="text-xs text-[#6E5A60] mt-0.5">
                Así se verá tu producto personalizado ({selectedColor.name})
              </p>
              <p className="text-xs text-[#8C747B] mt-1">{selectedProduct.material}</p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F5E8EC]">
            <div className="text-left sm:text-right">
              <span className="block text-[11px] text-[#7B656C]">Precio final</span>
              <span className="text-xl font-bold text-[#E95D85] tabular-nums">
                {formatCurrency(selectedProduct.price)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={`h-12 px-6 rounded-2xl text-sm font-semibold inline-flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                addedFeedback
                  ? 'bg-[#5BA37A] text-white'
                  : 'bg-[#E95D85] hover:bg-[#D84B74] text-white'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Agregado!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Agregar al carrito</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
