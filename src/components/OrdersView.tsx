import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Gift,
  MessageCircle,
  Package,
  Truck,
} from 'lucide-react';
import { OrderRecord, OrderStatus } from '../types';
import { STORE_INFO } from '../data/storeData';
import { buildWhatsAppUrl, formatCurrency, formatOrderDate } from '../utils/whatsapp';

interface OrdersViewProps {
  orders: OrderRecord[];
  onExploreCatalog: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ orders, onExploreCatalog }) => {
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'Todos'>('Todos');

  const statusMeta = (status: OrderStatus) => {
    switch (status) {
      case 'Pendiente de confirmación':
        return {
          icon: <Clock className="w-4 h-4" />,
          color: 'text-[#B56A24] bg-[#FDF4E7]',
        };
      case 'Confirmado':
        return {
          icon: <CheckCircle2 className="w-4 h-4" />,
          color: 'text-[#397352] bg-[#ECF5EE]',
        };
      case 'En preparación':
        return {
          icon: <Package className="w-4 h-4" />,
          color: 'text-[#7456A3] bg-[#F3EEF9]',
        };
      case 'Entregado':
        return {
          icon: <Truck className="w-4 h-4" />,
          color: 'text-[#397352] bg-[#ECF5EE]',
        };
    }
  };

  const filteredOrders =
    filterStatus === 'Todos' ? orders : orders.filter((o) => o.status === filterStatus);

  const filterTabs: (OrderStatus | 'Todos')[] = [
    'Todos',
    'Pendiente de confirmación',
    'Confirmado',
    'En preparación',
    'Entregado',
  ];

  return (
    <div className="space-y-5 pb-8">
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF1F4] rounded-2xl overflow-x-auto no-scrollbar">
        {filterTabs.map((tab) => {
          const active = filterStatus === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setFilterStatus(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                active
                  ? 'bg-white text-[#2E2326] shadow-2xs'
                  : 'text-[#6E5A60] hover:text-[#2E2326]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {filteredOrders.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white border border-[#EFE0E5] text-center space-y-3">
          <Gift className="w-10 h-10 text-[#E95D85] mx-auto" />
          <h3 className="text-base font-semibold text-[#2E2326]">
            {orders.length === 0
              ? 'Aún no tienes pedidos registrados'
              : 'No hay pedidos en este estado'}
          </h3>
          <p className="text-xs text-[#6E5A60] max-w-sm mx-auto">
            Cuando confirmes un regalo desde tu carrito, aparecerá aquí con su número de orden y
            acceso directo a nuestro WhatsApp.
          </p>
          <button
            type="button"
            onClick={onExploreCatalog}
            className="mt-1 px-5 py-2.5 rounded-xl bg-[#E95D85] text-white text-xs font-semibold hover:bg-[#D84B74] cursor-pointer"
          >
            Explorar regalos
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const meta = statusMeta(order.status);
            return (
              <div
                key={order.id}
                className="p-5 rounded-3xl bg-white border border-[#EFE0E5] shadow-2xs space-y-3.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#F5E8EC]">
                  <div>
                    <div className="text-sm font-bold text-[#2E2326]">Pedido #{order.id}</div>
                    <div className="text-xs text-[#7B656C]">{formatOrderDate(order.createdAt)}</div>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold ${meta.color}`}
                  >
                    {meta.icon}
                    <span>{order.status}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="text-[#4C3A40]">
                        <span className="font-semibold text-[#2E2326]">
                          {item.quantity}× {item.name}
                        </span>{' '}
                        <span className="text-[#7B656C]">({item.presentationLabel})</span>
                        {item.customization && (
                          <div className="text-[11px] text-[#7B5D66] mt-0.5">
                            Personalizado: “{item.customization.mainText}” · {item.customization.colorName}
                          </div>
                        )}
                      </div>
                      <span className="font-semibold text-[#2E2326] tabular-nums shrink-0">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-2xl bg-[#FDF9FA] text-xs text-[#5C474E] space-y-1">
                  <div>
                    <strong>Entrega:</strong> {order.shippingOption.title} — {order.customer.district}
                  </div>
                  <div>
                    <strong>Dirección:</strong> {order.customer.address}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div>
                    <span className="text-xs text-[#7B656C] block">Total del pedido</span>
                    <span className="text-base font-bold text-[#E95D85] tabular-nums">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                  <a
                    href={buildWhatsAppUrl(order.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-4 rounded-xl bg-[#ECF5EE] hover:bg-[#DFEFE3] text-[#246A41] text-xs font-semibold inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Coordinar en WhatsApp ({STORE_INFO.whatsappDisplay})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
