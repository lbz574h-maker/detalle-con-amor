import React, { useState } from 'react';
import { Check, Copy, Download, ExternalLink, Package, Smartphone, X } from 'lucide-react';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWAInstall';

const getStoreUrl = () =>
  typeof window !== 'undefined' ? window.location.origin : '';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'card';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'compact' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const storeUrl = getStoreUrl();

  if (isInstalled) {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuide(true);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(storeUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch {
      setCopiedUrl(false);
    }
  };

  return (
    <>
      {variant === 'compact' ? (
        <button
          type="button"
          onClick={handleClick}
          className="h-9 px-3 rounded-full bg-[#FDECEF] hover:bg-[#FADBE2] border border-[#F3CED8] text-xs font-semibold text-[#C8436B] inline-flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Instalar App</span>
        </button>
      ) : (
        <div className="p-4 rounded-2xl bg-white border border-[#F0DFE5] space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/pwa-192x192.png"
                alt="Ícono de Detalle Con Amor"
                className="w-12 h-12 rounded-2xl border border-[#F3CED8] shadow-2xs shrink-0"
              />
              <div>
                <div className="text-sm font-semibold text-[#2E2326]">
                  Detalle · Con Amor en tu celular
                </div>
                <div className="text-xs text-[#6E5A60]">
                  Instálala como App directa o genera tu paquete APK para Android
                </div>
              </div>
            </div>
            <Smartphone className="w-5 h-5 text-[#E95D85] shrink-0 hidden sm:block" />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleClick}
              className="flex-1 min-w-[160px] h-10 px-4 rounded-xl bg-[#E95D85] hover:bg-[#D84B74] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isInstallable ? 'Instalar ahora' : 'Cómo instalar en celular'}</span>
            </button>

            <a
              href={`https://www.pwabuilder.com/report?site=${encodeURIComponent(storeUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[160px] h-10 px-4 rounded-xl bg-[#FAF2F4] hover:bg-[#F3E2E7] text-[#3D2B31] text-xs font-semibold inline-flex items-center justify-center gap-1.5"
            >
              <Package className="w-4 h-4 text-[#E95D85]" />
              <span>Generar .APK</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Instalar o empaquetar Detalle Con Amor"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white border border-[#F0DFE5] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="/pwa-192x192.png"
                  alt="Ícono de Detalle Con Amor"
                  className="w-11 h-11 rounded-2xl border border-[#F3CED8]"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#2E2326]">
                    {isIOS ? 'Instalar en iPhone / iPad' : 'Instalar App o Descargar APK'}
                  </h3>
                  <p className="text-[11px] text-[#7B656C]">Detalle · Con Amor</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Cerrar guía de instalación"
                className="w-8 h-8 rounded-full bg-[#FAF2F4] flex items-center justify-center text-[#3D2B31] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-2 text-xs text-[#5C474E] list-decimal pl-4 leading-relaxed">
                <li>Abre esta tienda desde <strong>Safari</strong> en tu iPhone o iPad.</li>
                <li>Toca el botón <strong>Compartir</strong> en la barra inferior.</li>
                <li>Selecciona <strong>Agregar a inicio</strong> para verla con su ícono rosado.</li>
              </ol>
            ) : (
              <div className="space-y-3">
                <ol className="space-y-1.5 text-xs text-[#5C474E] list-decimal pl-4 leading-relaxed">
                  <li>Abre la tienda en <strong>Google Chrome</strong> desde tu Android.</li>
                  <li>Toca el menú <strong>⋮</strong> y elige <strong>Instalar aplicación</strong>.</li>
                  <li>O empaquétala como archivo <strong>.APK</strong> en 1 clic con PWABuilder:</li>
                </ol>

                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.pwabuilder.com/report?site=${encodeURIComponent(storeUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-4 rounded-xl bg-[#2E2326] hover:bg-[#423337] text-white text-xs font-semibold inline-flex items-center justify-center gap-2"
                  >
                    <Package className="w-4 h-4 text-[#F9A8C0]" />
                    <span>Abrir en PWABuilder para .APK</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    className="h-9 px-3 rounded-xl bg-[#FAF2F4] hover:bg-[#F3E2E7] text-[#3D2B31] text-xs font-medium inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#25A25A]" />
                        <span>Enlace copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar enlace de la tienda</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="w-full h-10 rounded-xl bg-[#E95D85] text-white text-xs font-semibold cursor-pointer"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 z-50 px-3.5 py-2 rounded-xl bg-[#3D2B31] text-white text-xs font-medium shadow-lg">
      Sin conexión — mostrando catálogo guardado
    </div>
  );
};
