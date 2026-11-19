import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { STORE_FAQS, STORE_INFO } from '../data/storeData';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { PWAInstallButton } from './PWAInstallButton';

export const HelpView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState('');

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      setCopiedField(null);
    }
  };

  const handleSendCustomInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      customMessage.trim() ||
      'Hola Detalle · Con Amor, quisiera consultar sobre un regalo personalizado.';
    const link = document.createElement('a');
    link.href = buildWhatsAppUrl(text);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Direct Contact Cards */}
      <section aria-labelledby="contact-channels-heading" className="space-y-3">
        <h2 id="contact-channels-heading" className="text-base font-semibold text-[#2E2326]">
          Canales de atención directa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* WhatsApp */}
          <div className="p-4 rounded-2xl bg-white border border-[#EFE0E5] flex flex-col justify-between gap-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#ECF5EE] text-[#25A25A] flex items-center justify-center mb-3">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-[#7B656C]">WhatsApp y Pedidos</div>
              <div className="text-base font-bold text-[#2E2326] mt-0.5 tabular-nums">
                {STORE_INFO.whatsappDisplay}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={buildWhatsAppUrl('Hola Detalle · Con Amor, tengo una consulta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-9 px-3 rounded-xl bg-[#25A25A] hover:bg-[#1F8D4D] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5"
              >
                <span>Chatear</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy('phone', STORE_INFO.whatsappDisplay)}
                aria-label="Copiar número de WhatsApp"
                className="h-9 w-9 rounded-xl bg-[#FAF2F4] hover:bg-[#F3E2E7] flex items-center justify-center text-[#3D2B31] cursor-pointer"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-4 h-4 text-[#25A25A]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="p-4 rounded-2xl bg-white border border-[#EFE0E5] flex flex-col justify-between gap-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FDECEF] text-[#E95D85] flex items-center justify-center mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-[#7B656C]">Correo electrónico</div>
              <div className="text-sm font-bold text-[#2E2326] mt-0.5 break-all">
                {STORE_INFO.email}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${STORE_INFO.email}?subject=${encodeURIComponent(
                  'Consulta Detalle · Con Amor'
                )}`}
                className="flex-1 h-9 px-3 rounded-xl bg-[#E95D85] hover:bg-[#D84B74] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5"
              >
                <span>Enviar correo</span>
              </a>
              <button
                type="button"
                onClick={() => handleCopy('email', STORE_INFO.email)}
                aria-label="Copiar correo electrónico"
                className="h-9 w-9 rounded-xl bg-[#FAF2F4] hover:bg-[#F3E2E7] flex items-center justify-center text-[#3D2B31] cursor-pointer"
              >
                {copiedField === 'email' ? (
                  <Check className="w-4 h-4 text-[#25A25A]" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Physical Address */}
          <div className="p-4 rounded-2xl bg-white border border-[#EFE0E5] flex flex-col justify-between gap-3">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#FDF4E7] text-[#C8843F] flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs font-medium text-[#7B656C]">Dirección del taller y recojo</div>
              <div className="text-sm font-bold text-[#2E2326] mt-0.5">{STORE_INFO.address}</div>
              <p className="text-[11px] text-[#7B656C] mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />
                <span>{STORE_INFO.hours}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('address', STORE_INFO.address)}
              className="h-9 px-3 rounded-xl bg-[#FAF2F4] hover:bg-[#F3E2E7] text-[#3D2B31] text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copiedField === 'address' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#25A25A]" />
                  <span>Dirección copiada</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar dirección</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Install as App Card */}
      <PWAInstallButton variant="card" />

      {/* Quick WhatsApp Message Composer */}
      <section className="p-5 rounded-3xl bg-[#FDF2F5] border border-[#F5D6DF] space-y-3">
        <h3 className="text-sm font-bold text-[#2E2326]">
          ¿Quieres un diseño especial o pedido corporativo?
        </h3>
        <form onSubmit={handleSendCustomInquiry} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Escribe tu consulta (ej. 10 tazas con logo para evento en Trujillo)..."
            className="flex-1 h-11 px-4 rounded-xl bg-white border border-[#EED9E0] text-sm focus:outline-none focus:border-[#E95D85]"
          />
          <button
            type="submit"
            className="h-11 px-5 rounded-xl bg-[#25A25A] hover:bg-[#1F8D4D] text-white text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            <span>Enviar por WhatsApp</span>
          </button>
        </form>
      </section>

      {/* FAQ Accordion */}
      <section aria-labelledby="faq-heading" className="space-y-3">
        <h2 id="faq-heading" className="text-base font-semibold text-[#2E2326]">
          Preguntas frecuentes
        </h2>
        <div className="space-y-2.5">
          {STORE_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-[#EFE0E5] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left text-sm font-semibold text-[#2E2326] hover:bg-[#FDF9FA] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#8C747B] shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-[#E95D85]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#5C474E] leading-relaxed border-t border-[#F7EDF0] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
