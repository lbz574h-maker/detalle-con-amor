import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Gift,
  Heart,
  HelpCircle,
  Home,
  Menu,
  Pencil,
  Search,
  ShoppingBag,
  ShoppingCart,
  Truck,
  User,
  X,
} from 'lucide-react';
import {
  CartItem,
  CustomizationSpec,
  GiftProduct,
  NotificationItem,
  OrderRecord,
  ShippingMethodId,
  UserProfile,
  ViewTab,
} from './types';
import {
  GIFT_PRODUCTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER_PROFILE,
  STORE_IMAGES,
  STORE_INFO,
  TRUJILLO_DISTRICTS,
} from './data/storeData';
import { BrandLogo } from './components/BrandLogo';
import { HomeView } from './components/HomeView';
import { CatalogView } from './components/CatalogView';
import { CustomizerView } from './components/CustomizerView';
import { ShippingView } from './components/ShippingView';
import { OrdersView } from './components/OrdersView';
import { FavoritesView } from './components/FavoritesView';
import { AccountView } from './components/AccountView';
import { NotificationsView } from './components/NotificationsView';
import { HelpView } from './components/HelpView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OfflineIndicator, PWAInstallButton } from './components/PWAInstallButton';

const STORAGE_KEYS = {
  CART: 'detalle_con_amor_cart_v1',
  FAVORITES: 'detalle_con_amor_favorites_v1',
  ORDERS: 'detalle_con_amor_orders_v1',
  PROFILE: 'detalle_con_amor_profile_v1',
  NOTIFICATIONS: 'detalle_con_amor_notifications_v1',
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<GiftProduct | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage(STORAGE_KEYS.CART, []));
  const [favorites, setFavorites] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.FAVORITES, ['caja-personalizada-con-amor', 'ramo-rosas-rosadas'])
  );
  const [orders, setOrders] = useState<OrderRecord[]>(() =>
    loadFromStorage(STORAGE_KEYS.ORDERS, [])
  );
  const [profile, setProfile] = useState<UserProfile>(() =>
    loadFromStorage(STORAGE_KEYS.PROFILE, INITIAL_USER_PROFILE)
  );
  const [notifications, setNotifications] = useState<NotificationItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS)
  );

  const [selectedShippingId, setSelectedShippingId] = useState<ShippingMethodId>('express');
  const [deliveryDistrict, setDeliveryDistrict] = useState<string>(TRUJILLO_DISTRICTS[0]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>(
    profile.savedAddresses[0]?.address ?? 'Liverpool 284, Trujillo'
  );
  const [scheduledDate, setScheduledDate] = useState<string>('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // Ignore storage quota errors
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch {
      // Ignore storage quota errors
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch {
      // Ignore storage quota errors
    }
  }, [notifications]);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const unreadNotifs = notifications.filter((n) => !n.read).length;

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddProductToCart = (params: {
    product: GiftProduct;
    presentationLabel: string;
    unitPrice: number;
    quantity: number;
    dedicationNote?: string;
  }) => {
    const { product, presentationLabel, unitPrice, quantity, dedicationNote } = params;
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.presentationLabel === presentationLabel &&
          (item.dedicationNote ?? '') === (dedicationNote ?? '') &&
          !item.customization
      );
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          cartItemId: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          productId: product.id,
          name: product.name,
          image: product.image,
          unitPrice,
          quantity,
          presentationLabel,
          dedicationNote,
        },
      ];
    });
  };

  const handleAddCustomizedToCart = (spec: CustomizationSpec, price: number) => {
    const imageMap: Record<CustomizationSpec['baseId'], string> = {
      mug: STORE_IMAGES.customMug,
      cushion: STORE_IMAGES.heroGiftBox,
      keychain: STORE_IMAGES.teddyMugBox,
      bottle: STORE_IMAGES.customMug,
      giftbox: STORE_IMAGES.teddyMugBox,
    };

    setCart((prev) => [
      ...prev,
      {
        cartItemId: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        productId: `custom-${spec.baseId}`,
        name: `${spec.baseLabel} personalizada`,
        image: spec.photoDataUrl || imageMap[spec.baseId],
        unitPrice: price,
        quantity: 1,
        presentationLabel: `Diseño ${spec.fontStyle === 'script' ? 'Manuscrito' : 'Editorial'}`,
        customization: spec,
      },
    ]);
  };

  const handleUpdateCartQty = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleConfirmOrder = (order: OrderRecord) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    setNotifications((prev) => [
      {
        id: `notif-order-${order.id}`,
        title: `Pedido #${order.id} registrado`,
        body: `Tu pedido está pendiente de confirmación en WhatsApp (${STORE_INFO.whatsappDisplay}).`,
        dateLabel: 'Ahora',
        read: false,
        type: 'order',
      },
      ...prev,
    ]);
  };

  const navigateTo = (tab: ViewTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sidebarItems: { id: ViewTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Inicio', icon: <Home className="w-4 h-4" /> },
    { id: 'catalog', label: 'Catálogo', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'customize', label: 'Personaliza', icon: <Pencil className="w-4 h-4" /> },
    { id: 'orders', label: 'Mis pedidos', icon: <Gift className="w-4 h-4" /> },
    { id: 'favorites', label: 'Favoritos', icon: <Heart className="w-4 h-4" /> },
    { id: 'account', label: 'Mi cuenta', icon: <User className="w-4 h-4" /> },
    { id: 'help', label: 'Ayuda', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const pageHeaderMeta: Record<ViewTab, { title: string; subtitle: string }> = {
    home: { title: 'Inicio', subtitle: STORE_INFO.tagline },
    catalog: { title: 'Buscar', subtitle: 'Encuentra el regalo perfecto' },
    customize: { title: 'Personalizar', subtitle: 'Crea un regalo único y especial' },
    orders: { title: 'Mis pedidos', subtitle: 'Consulta el estado de tus compras' },
    favorites: { title: 'Favoritos', subtitle: 'Tus regalos guardados con amor' },
    account: { title: 'Mi cuenta', subtitle: 'Gestiona tu información y preferencias' },
    shipping: { title: 'Envíos', subtitle: 'Llevamos tu regalo a donde quieras' },
    notifications: { title: 'Notificaciones', subtitle: 'Avisos de tus pedidos y fechas especiales' },
    help: { title: 'Ayuda y contacto', subtitle: `${STORE_INFO.address} · ${STORE_INFO.whatsappDisplay}` },
  };

  const currentMeta = pageHeaderMeta[activeTab];

  return (
    <div className="min-h-screen bg-[#FDF8F9] text-[#2E2326] flex">
      {/* Desktop / Tablet Persistent Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 shrink-0 bg-[#FDF2F5] border-r border-[#F3DCE3] sticky top-0 h-screen p-5 justify-between">
        <div className="space-y-6">
          <div className="flex justify-center pt-1">
            <BrandLogo onClick={() => navigateTo('home')} />
          </div>

          <nav aria-label="Navegación principal" className="space-y-1">
            {sidebarItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#EF88A6] text-white shadow-xs'
                      : 'text-[#4C3A40] hover:bg-[#FCE6EC]'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                  {item.id === 'favorites' && favorites.length > 0 && (
                    <span
                      className={`text-[11px] font-bold tabular-nums ${
                        active ? 'text-white' : 'text-[#E95D85]'
                      }`}
                    >
                      {favorites.length}
                    </span>
                  )}
                  {item.id === 'orders' && orders.length > 0 && (
                    <span
                      className={`text-[11px] font-bold tabular-nums ${
                        active ? 'text-white' : 'text-[#7B656C]'
                      }`}
                    >
                      {orders.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Shipping Promo Card in Sidebar */}
        <button
          type="button"
          onClick={() => navigateTo('shipping')}
          className={`w-full p-4 rounded-2xl text-left border transition-colors cursor-pointer ${
            activeTab === 'shipping'
              ? 'bg-[#FCE4EC] border-[#E95D85]'
              : 'bg-[#FAE9EE] hover:bg-[#F7DFE6] border-[#F3CED8]'
          }`}
        >
          <div className="w-9 h-9 rounded-xl bg-white text-[#E95D85] flex items-center justify-center mb-2 shadow-2xs">
            <Truck className="w-4 h-4" />
          </div>
          <div className="text-sm font-bold text-[#2E2326]">Envíos a todo el país</div>
          <div className="text-xs text-[#6E5A60] mt-0.5 flex items-center justify-between">
            <span>Sorprende a quien más quieres</span>
            <Heart className="w-3.5 h-3.5 fill-[#E95D85] text-[#E95D85] shrink-0" />
          </div>
        </button>
      </aside>

      {/* Mobile Slide-Over Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex bg-black/45 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Menú lateral"
        >
          <div className="w-72 max-w-[82vw] bg-[#FDF2F5] h-full p-5 flex flex-col justify-between shadow-2xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <BrandLogo compact onClick={() => navigateTo('home')} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Cerrar menú"
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#3D2B31]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item) => {
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => navigateTo(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium ${
                        active ? 'bg-[#EF88A6] text-white' : 'text-[#4C3A40] hover:bg-[#FCE6EC]'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => navigateTo('shipping')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-medium ${
                    activeTab === 'shipping'
                      ? 'bg-[#EF88A6] text-white'
                      : 'text-[#4C3A40] hover:bg-[#FCE6EC]'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Envíos</span>
                </button>
              </nav>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/85 border border-[#F3CED8] text-xs text-[#5C474E] space-y-1">
              <div className="font-bold text-[#2E2326]">Tienda Trujillo</div>
              <div>{STORE_INFO.address}</div>
              <div>WhatsApp: {STORE_INFO.whatsappDisplay}</div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Shell */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#FDF8F9]/92 backdrop-blur-md border-b border-[#F2E3E8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
            {/* Left Zone */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Abrir menú"
                className="md:hidden w-10 h-10 rounded-full bg-white border border-[#F0DFE5] flex items-center justify-center text-[#E95D85] shrink-0 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              {activeTab !== 'home' && (
                <button
                  type="button"
                  onClick={() => navigateTo('home')}
                  aria-label="Volver al inicio"
                  className="hidden md:flex w-9 h-9 rounded-full bg-[#FDECEF] hover:bg-[#FADBE2] items-center justify-center text-[#3D2B31] shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}

              <div className="md:hidden">
                <BrandLogo compact onClick={() => navigateTo('home')} />
              </div>

              <div className="hidden md:block min-w-0">
                <h1 className="text-lg font-bold text-[#2E2326] leading-tight truncate">
                  {currentMeta.title}
                </h1>
                <p className="text-xs text-[#7B656C] truncate">{currentMeta.subtitle}</p>
              </div>
            </div>

            {/* Right Zone: Install App + Notifications (Desktop) + Cart Button */}
            <div className="flex items-center gap-2 shrink-0">
              <PWAInstallButton variant="compact" />

              <button
                type="button"
                onClick={() => navigateTo('notifications')}
                aria-label="Ver notificaciones"
                className="hidden md:flex relative w-10 h-10 rounded-full bg-white border border-[#F0DFE5] hover:bg-[#FDF2F5] items-center justify-center text-[#4C3A40] cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E95D85] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                    {unreadNotifs}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setCartOpen(true)}
                aria-label="Abrir carrito de compras"
                className="relative h-10 px-3.5 rounded-full bg-white border border-[#F0DFE5] hover:bg-[#FDF2F5] flex items-center gap-2 text-[#2E2326] cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-[#3D2B31]" />
                <span className="text-xs font-semibold hidden sm:inline">Carrito</span>
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-[#E95D85] text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
                  {totalCartItems}
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Subheader for Mobile when inside inner screens */}
        {activeTab !== 'home' && (
          <div className="md:hidden px-4 pt-4 pb-1 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              aria-label="Volver al inicio"
              className="w-8 h-8 rounded-full bg-[#FDECEF] flex items-center justify-center text-[#3D2B31]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-base font-bold text-[#2E2326] leading-tight">
                {currentMeta.title}
              </h1>
              <p className="text-[11px] text-[#7B656C]">{currentMeta.subtitle}</p>
            </div>
          </div>
        )}

        {/* Active View Container */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-5 pb-24 md:pb-10">
          {activeTab === 'home' && (
            <HomeView
              onNavigate={navigateTo}
              products={GIFT_PRODUCTS}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectProduct={setSelectedProduct}
            />
          )}

          {activeTab === 'catalog' && (
            <CatalogView
              products={GIFT_PRODUCTS}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectProduct={setSelectedProduct}
              onGoCustomize={() => navigateTo('customize')}
            />
          )}

          {activeTab === 'customize' && (
            <CustomizerView onAddCustomizedToCart={handleAddCustomizedToCart} />
          )}

          {activeTab === 'shipping' && (
            <ShippingView
              selectedShippingId={selectedShippingId}
              onSelectShipping={setSelectedShippingId}
              deliveryDistrict={deliveryDistrict}
              onChangeDistrict={setDeliveryDistrict}
              deliveryAddress={deliveryAddress}
              onChangeAddress={setDeliveryAddress}
              scheduledDate={scheduledDate}
              onChangeScheduledDate={setScheduledDate}
              onGoToCart={() => setCartOpen(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              orders={orders}
              onExploreCatalog={() => navigateTo('catalog')}
            />
          )}

          {activeTab === 'favorites' && (
            <FavoritesView
              products={GIFT_PRODUCTS}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectProduct={setSelectedProduct}
              onExploreCatalog={() => navigateTo('catalog')}
            />
          )}

          {activeTab === 'account' && (
            <AccountView
              profile={profile}
              onUpdateProfile={setProfile}
              orders={orders}
              favoritesCount={favorites.length}
              onNavigate={navigateTo}
            />
          )}

          {activeTab === 'notifications' && (
            <NotificationsView
              notifications={notifications}
              onMarkAllRead={() =>
                setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
              }
              onMarkRead={(id) =>
                setNotifications((prev) =>
                  prev.map((n) => (n.id === id ? { ...n, read: true } : n))
                )
              }
            />
          )}

          {activeTab === 'help' && <HelpView />}
        </main>
      </div>

      {/* Fixed Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Navegación inferior móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDF2F5]/95 backdrop-blur-md border-t border-[#F0D6DF] h-16 px-2 grid grid-cols-5 items-center"
      >
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center h-full text-[10px] font-medium ${
            activeTab === 'home' ? 'text-[#E95D85]' : 'text-[#5C474E]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="mt-0.5">Inicio</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('catalog')}
          className={`flex flex-col items-center justify-center h-full text-[10px] font-medium ${
            activeTab === 'catalog' ? 'text-[#E95D85]' : 'text-[#5C474E]'
          }`}
        >
          <Search className="w-5 h-5" />
          <span className="mt-0.5">Buscar</span>
        </button>

        {/* Center Elevated Personalizar Button */}
        <div className="flex flex-col items-center justify-center relative">
          <button
            type="button"
            onClick={() => navigateTo('customize')}
            className={`-mt-6 w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-md border-4 border-[#FDF8F9] transition-transform active:scale-95 ${
              activeTab === 'customize'
                ? 'bg-[#D84B74] text-white'
                : 'bg-[#EE7396] text-white'
            }`}
            aria-label="Personalizar regalo"
          >
            <Gift className="w-5 h-5" />
          </button>
          <span
            className={`text-[10px] font-semibold mt-0.5 ${
              activeTab === 'customize' ? 'text-[#E95D85]' : 'text-[#5C474E]'
            }`}
          >
            Personalizar
          </span>
        </div>

        <button
          type="button"
          onClick={() => navigateTo('notifications')}
          className={`relative flex flex-col items-center justify-center h-full text-[10px] font-medium ${
            activeTab === 'notifications' ? 'text-[#E95D85]' : 'text-[#5C474E]'
          }`}
        >
          <div className="relative">
            <Bell className="w-5 h-5" />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#E95D85] text-white text-[9px] font-bold flex items-center justify-center">
                {unreadNotifs}
              </span>
            )}
          </div>
          <span className="mt-0.5">Avisos</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('account')}
          className={`flex flex-col items-center justify-center h-full text-[10px] font-medium ${
            activeTab === 'account' ? 'text-[#E95D85]' : 'text-[#5C474E]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="mt-0.5">Perfil</span>
        </button>
      </nav>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isFavorite={favorites.includes(selectedProduct.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddProductToCart}
        />
      )}

      {/* Cart & WhatsApp Checkout Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        selectedShippingId={selectedShippingId}
        onSelectShipping={setSelectedShippingId}
        userProfile={profile}
        defaultDistrict={deliveryDistrict}
        defaultAddress={deliveryAddress}
        scheduledDate={scheduledDate}
        onConfirmOrder={handleConfirmOrder}
        onViewOrders={() => navigateTo('orders')}
      />

      <OfflineIndicator />
    </div>
  );
}
