import React from 'react';
import { Bell, CheckCheck, Gift, Sparkles, Truck } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onMarkRead: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllRead,
  onMarkRead,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  const iconForType = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <Truck className="w-5 h-5 text-[#5D8EC4]" />;
      case 'promo':
        return <Sparkles className="w-5 h-5 text-[#E95D85]" />;
      case 'tip':
        return <Gift className="w-5 h-5 text-[#C8843F]" />;
    }
  };

  return (
    <div className="space-y-4 pb-8">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#7B656C]">
          {unreadCount > 0
            ? `Tienes ${unreadCount} notificación(es) sin leer`
            : 'Todas las notificaciones leídas'}
        </p>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-xs font-semibold text-[#E95D85] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Marcar todas como leídas</span>
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="p-10 rounded-3xl bg-white border border-[#EFE0E5] text-center space-y-2">
          <Bell className="w-8 h-8 text-[#E95D85] mx-auto" />
          <p className="text-sm font-semibold text-[#2E2326]">Sin avisos recientes</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {notifications.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onMarkRead(item.id)}
              className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-colors cursor-pointer ${
                item.read
                  ? 'bg-white border-[#EFE0E5]'
                  : 'bg-[#FDF4F7] border-[#F4C8D6]'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-[#F2E3E8] flex items-center justify-center shrink-0">
                {iconForType(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#2E2326]">{item.title}</h3>
                  <span className="text-[11px] text-[#8C747B] shrink-0">{item.dateLabel}</span>
                </div>
                <p className="text-xs text-[#5C474E] mt-1 leading-relaxed">{item.body}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
