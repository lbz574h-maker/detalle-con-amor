import React, { useState } from 'react';
import {
  Award,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Heart,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  User,
} from 'lucide-react';
import { OrderRecord, UserProfile, ViewTab } from '../types';
import { TRUJILLO_DISTRICTS } from '../data/storeData';

interface AccountViewProps {
  profile: UserProfile;
  onUpdateProfile: (next: UserProfile) => void;
  orders: OrderRecord[];
  favoritesCount: number;
  onNavigate: (tab: ViewTab) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({
  profile,
  onUpdateProfile,
  orders,
  favoritesCount,
  onNavigate,
}) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [emailInput, setEmailInput] = useState(profile.email);
  const [phoneInput, setPhoneInput] = useState(profile.phone);
  const [cityInput, setCityInput] = useState(profile.city);

  const [activeSection, setActiveSection] = useState<'addresses' | 'notifications' | null>(null);
  const [newAddrLabel, setNewAddrLabel] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrDistrict, setNewAddrDistrict] = useState(TRUJILLO_DISTRICTS[0]);

  const inProgressCount = orders.filter(
    (o) => o.status === 'Pendiente de confirmación' || o.status === 'Confirmado' || o.status === 'En preparación'
  ).length;
  const completedCount = orders.filter((o) => o.status === 'Entregado').length;
  const points = 150 + orders.length * 50;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...profile,
      name: nameInput.trim() || profile.name,
      email: emailInput.trim() || profile.email,
      phone: phoneInput.trim() || profile.phone,
      city: cityInput.trim() || profile.city,
    });
    setEditingProfile(false);
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrLabel.trim() || !newAddrStreet.trim()) return;
    onUpdateProfile({
      ...profile,
      savedAddresses: [
        ...profile.savedAddresses,
        {
          id: `addr-${Date.now()}`,
          label: newAddrLabel.trim(),
          address: newAddrStreet.trim(),
          district: newAddrDistrict,
        },
      ],
    });
    setNewAddrLabel('');
    setNewAddrStreet('');
  };

  const handleDeleteAddress = (id: string) => {
    onUpdateProfile({
      ...profile,
      savedAddresses: profile.savedAddresses.filter((a) => a.id !== id),
    });
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Profile Card */}
      <div className="p-5 rounded-3xl bg-white border border-[#EFE0E5] shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FDECEF] to-[#F7CAD8] border-2 border-white shadow-sm flex items-center justify-center text-[#C8436B] font-bold text-xl shrink-0">
              {profile.name
                .split(' ')
                .slice(0, 2)
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-[#2E2326] truncate">{profile.name}</h2>
              <div className="space-y-0.5 mt-1 text-xs text-[#6E5A60]">
                <p className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#E95D85] shrink-0" />
                  <span>{profile.email}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#E95D85] shrink-0" />
                  <span>{profile.phone}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E95D85] shrink-0" />
                  <span>{profile.city}</span>
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setEditingProfile((v) => !v)}
            className="h-10 px-4 rounded-xl border border-[#EED9E0] bg-[#FDF9FA] hover:bg-[#FDECEF] text-xs font-semibold text-[#3D2B31] inline-flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-center shrink-0"
          >
            <Pencil className="w-3.5 h-3.5 text-[#E95D85]" />
            <span>{editingProfile ? 'Cancelar' : 'Editar perfil'}</span>
          </button>
        </div>

        {editingProfile && (
          <form onSubmit={handleSaveProfile} className="mt-4 pt-4 border-t border-[#F4E6EB] grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#5C474E] mb-1">Nombre completo</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5C474E] mb-1">Correo electrónico</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5C474E] mb-1">Teléfono</label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#5C474E] mb-1">Ciudad</label>
              <input
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#FDF9FA] border border-[#EED9E0] text-sm"
              />
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="h-10 px-5 rounded-xl bg-[#E95D85] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Guardar cambios</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('orders')}
          className="p-4 rounded-2xl bg-[#FDECEF] border border-[#F6D5DF] text-center hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#E95D85] flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-[#4C3A40]">Mis pedidos</div>
          <div className="text-2xl font-bold text-[#2E2326] mt-0.5 tabular-nums">{orders.length}</div>
          <div className="text-[11px] font-semibold text-[#E95D85] mt-1">Ver pedidos &gt;</div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('orders')}
          className="p-4 rounded-2xl bg-[#EEF4FA] border border-[#DCE7F3] text-center hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#5D8EC4] flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <Truck className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-[#4C3A40]">En proceso</div>
          <div className="text-2xl font-bold text-[#2E2326] mt-0.5 tabular-nums">{inProgressCount}</div>
          <div className="text-[11px] font-semibold text-[#5D8EC4] mt-1">Ver detalles &gt;</div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('orders')}
          className="p-4 rounded-2xl bg-[#ECF5EE] border border-[#D8E9DC] text-center hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#4E8B63] flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-[#4C3A40]">Completados</div>
          <div className="text-2xl font-bold text-[#2E2326] mt-0.5 tabular-nums">{completedCount}</div>
          <div className="text-[11px] font-semibold text-[#4E8B63] mt-1">Ver historial &gt;</div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('favorites')}
          className="p-4 rounded-2xl bg-[#FDF4E7] border border-[#F5E4CA] text-center hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#C8843F] flex items-center justify-center mx-auto mb-2 shadow-2xs">
            <Heart className="w-5 h-5" />
          </div>
          <div className="text-xs font-semibold text-[#4C3A40]">Favoritos</div>
          <div className="text-2xl font-bold text-[#2E2326] mt-0.5 tabular-nums">{favoritesCount}</div>
          <div className="text-[11px] font-semibold text-[#C8843F] mt-1">Ver favoritos &gt;</div>
        </button>
      </div>

      {/* Configuración de cuenta */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold text-[#2E2326]">Configuración de cuenta</h3>
        <div className="rounded-3xl bg-white border border-[#EFE0E5] divide-y divide-[#F5E8EC] overflow-hidden">
          <button
            type="button"
            onClick={() => setEditingProfile(true)}
            className="w-full flex items-center justify-between p-4 hover:bg-[#FDF9FA] text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FAF2F4] text-[#5C3B45] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#2E2326]">Información personal</div>
                <div className="text-xs text-[#7B656C]">Actualiza tu nombre, teléfono y correo</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9A848B]" />
          </button>

          <div>
            <button
              type="button"
              onClick={() =>
                setActiveSection((s) => (s === 'addresses' ? null : 'addresses'))
              }
              className="w-full flex items-center justify-between p-4 hover:bg-[#FDF9FA] text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FDECEF] text-[#E95D85] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2E2326]">Direcciones guardadas</div>
                  <div className="text-xs text-[#7B656C]">
                    {profile.savedAddresses.length} direcciones registradas
                  </div>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-[#9A848B] transition-transform ${
                  activeSection === 'addresses' ? 'rotate-90' : ''
                }`}
              />
            </button>

            {activeSection === 'addresses' && (
              <div className="px-4 pb-4 space-y-3 bg-[#FDF9FA]">
                {profile.savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-3 rounded-xl bg-white border border-[#EFE0E5] flex items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-[#2E2326]">{addr.label}</span>
                      <p className="text-[#6E5A60]">
                        {addr.address} · {addr.district}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(addr.id)}
                      aria-label={`Eliminar dirección ${addr.label}`}
                      className="text-[#9A848B] hover:text-[#D1436A] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <form onSubmit={handleAddAddress} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="Etiqueta (Ej. Oficina)"
                    value={newAddrLabel}
                    onChange={(e) => setNewAddrLabel(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-white border border-[#EED9E0] text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Dirección completa"
                    value={newAddrStreet}
                    onChange={(e) => setNewAddrStreet(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-white border border-[#EED9E0] text-xs"
                  />
                  <div className="flex gap-2">
                    <select
                      value={newAddrDistrict}
                      onChange={(e) => setNewAddrDistrict(e.target.value)}
                      className="flex-1 h-9 px-2 rounded-lg bg-white border border-[#EED9E0] text-xs"
                    >
                      {TRUJILLO_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      aria-label="Agregar dirección"
                      className="h-9 px-3 rounded-lg bg-[#E95D85] text-white text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div>
            <button
              type="button"
              onClick={() =>
                setActiveSection((s) => (s === 'notifications' ? null : 'notifications'))
              }
              className="w-full flex items-center justify-between p-4 hover:bg-[#FDF9FA] text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FDF4E7] text-[#C8843F] flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#2E2326]">Notificaciones</div>
                  <div className="text-xs text-[#7B656C]">Elige qué avisos recibir en la app</div>
                </div>
              </div>
              <ChevronRight
                className={`w-4 h-4 text-[#9A848B] transition-transform ${
                  activeSection === 'notifications' ? 'rotate-90' : ''
                }`}
              />
            </button>

            {activeSection === 'notifications' && (
              <div className="px-4 pb-4 space-y-2.5 bg-[#FDF9FA] text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EFE0E5] cursor-pointer">
                  <span>Actualizaciones de mis pedidos</span>
                  <input
                    type="checkbox"
                    checked={profile.notifyOrders}
                    onChange={(e) =>
                      onUpdateProfile({ ...profile, notifyOrders: e.target.checked })
                    }
                    className="accent-[#E95D85] w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#EFE0E5] cursor-pointer">
                  <span>Novedades y fechas especiales (San Valentín, Mamá)</span>
                  <input
                    type="checkbox"
                    checked={profile.notifyPromos}
                    onChange={(e) =>
                      onUpdateProfile({ ...profile, notifyPromos: e.target.checked })
                    }
                    className="accent-[#E95D85] w-4 h-4"
                  />
                </label>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mis beneficios */}
      <section className="space-y-2.5">
        <h3 className="text-base font-semibold text-[#2E2326]">Mis beneficios</h3>
        <div className="p-5 rounded-3xl bg-[#FDF2F5] border border-[#F5D6DF] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#F9DCE5] text-[#E95D85] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#2E2326]">Cliente Detalle · Nivel 2</div>
              <p className="text-xs text-[#6E5A60] mt-0.5">
                Acumula puntos con cada pedido personalizado y canjéalos por tarjetas o lazos premium.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-xl font-bold text-[#E95D85] tabular-nums">{points}</div>
            <div className="text-[11px] text-[#7B656C]">Puntos disponibles</div>
          </div>
        </div>
      </section>
    </div>
  );
};
