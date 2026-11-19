import { CartItem, OrderCustomerInfo, ShippingOption } from '../types';
import { STORE_INFO } from '../data/storeData';

export function formatCurrency(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

export function formatOrderDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export function buildWhatsAppOrderMessage(params: {
  orderId: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  shippingOption: ShippingOption;
  subtotal: number;
  total: number;
}): string {
  const { orderId, customer, items, shippingOption, subtotal, total } = params;

  const lines: string[] = [
    `Hola *Detalle · Con Amor*! Quiero confirmar el siguiente pedido:`,
    ``,
    `*Pedido:* ${orderId}`,
    `*Cliente:* ${customer.fullName}`,
    `*Teléfono:* ${customer.phone}`,
    `*Distrito / Ciudad:* ${customer.district}`,
    `*Dirección / Referencia:* ${customer.address}`,
  ];

  if (customer.scheduledDate) {
    lines.push(`*Fecha programada:* ${customer.scheduledDate}`);
  }

  lines.push(``, `*Detalle de productos:*`);

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. *${item.name}* (${item.presentationLabel}) x${item.quantity} — ${formatCurrency(
        item.unitPrice * item.quantity
      )}`
    );
    if (item.customization) {
      lines.push(
        `   • Personalización: "${item.customization.mainText}"` +
          (item.customization.secondaryText ? ` / "${item.customization.secondaryText}"` : '') +
          ` · Color: ${item.customization.colorName}` +
          (item.customization.photoDataUrl ? ' · (Incluye foto adjunta — la envío por aquí)' : '')
      );
    }
    if (item.dedicationNote) {
      lines.push(`   • Dedicatoria: "${item.dedicationNote}"`);
    }
  });

  lines.push(
    ``,
    `*Método de entrega:* ${shippingOption.title} (${
      shippingOption.price === 0 ? 'Gratis' : formatCurrency(shippingOption.price)
    })`,
    `*Subtotal:* ${formatCurrency(subtotal)}`,
    `*Total del pedido:* ${formatCurrency(total)}`
  );

  if (customer.notes && customer.notes.trim()) {
    lines.push(``, `*Indicaciones adicionales:* ${customer.notes.trim()}`);
  }

  lines.push(``, `Quedo atento(a) para coordinar el pago y la entrega. ¡Muchas gracias!`);

  return lines.join('\n');
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
