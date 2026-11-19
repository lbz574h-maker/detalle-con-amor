export type ViewTab =
  | 'home'
  | 'catalog'
  | 'customize'
  | 'orders'
  | 'favorites'
  | 'account'
  | 'shipping'
  | 'notifications'
  | 'help';

export type GiftCategory =
  | 'Todos'
  | 'Ramos'
  | 'Arreglos con globos'
  | 'Cajas personalizadas'
  | 'Tazas'
  | 'Chocolates';

export type OccasionTag =
  | 'Cumpleaños'
  | 'Aniversario'
  | 'San Valentín'
  | 'Día de la madre'
  | 'Amistad'
  | 'Graduación';

export interface ProductPresentation {
  id: string;
  label: string;
  details: string;
  priceDelta: number;
}

export interface GiftProduct {
  id: string;
  name: string;
  category: Exclude<GiftCategory, 'Todos'>;
  occasions: OccasionTag[];
  basePrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  shortDesc: string;
  description: string;
  includes: string[];
  tag?: string;
  presentations: ProductPresentation[];
}

export type CustomBaseId = 'mug' | 'cushion' | 'keychain' | 'bottle' | 'giftbox';
export type DecorativeIconId = 'heart' | 'star' | 'flower' | 'crown' | 'smile';

export interface CustomBaseProduct {
  id: CustomBaseId;
  label: string;
  price: number;
  subtitle: string;
  dimensions: string;
  material: string;
}

export interface CustomizationSpec {
  baseId: CustomBaseId;
  baseLabel: string;
  mainText: string;
  secondaryText: string;
  iconId: DecorativeIconId;
  colorHex: string;
  colorName: string;
  fontStyle: 'script' | 'clean';
  photoDataUrl?: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  presentationLabel: string;
  dedicationNote?: string;
  customization?: CustomizationSpec;
}

export type ShippingMethodId = 'express' | 'standard' | 'scheduled' | 'pickup';

export interface ShippingOption {
  id: ShippingMethodId;
  title: string;
  badge?: string;
  description: string;
  note: string;
  price: number;
  etaLabel: string;
}

export type OrderStatus =
  | 'Pendiente de confirmación'
  | 'Confirmado'
  | 'En preparación'
  | 'Entregado';

export interface OrderCustomerInfo {
  fullName: string;
  phone: string;
  district: string;
  address: string;
  notes?: string;
  scheduledDate?: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  items: CartItem[];
  shippingOption: ShippingOption;
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  customer: OrderCustomerInfo;
  whatsappText: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  city: string;
  savedAddresses: { id: string; label: string; address: string; district: string }[];
  notifyOrders: boolean;
  notifyPromos: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  dateLabel: string;
  read: boolean;
  type: 'order' | 'promo' | 'tip';
}
