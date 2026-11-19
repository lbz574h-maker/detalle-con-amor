import {
  CustomBaseProduct,
  GiftCategory,
  GiftProduct,
  NotificationItem,
  OccasionTag,
  ShippingOption,
  UserProfile,
} from '../types';

export const STORE_INFO = {
  brandName: 'Detalle',
  brandSubtitle: 'Con Amor',
  tagline: 'Regalos únicos hechos para personas especiales',
  whatsappDisplay: '+51 942 778 030',
  whatsappNumber: '51942778030',
  email: 'lucianalessandradiazorbegoso@gmail.com',
  address: 'Liverpool 284, Trujillo, Perú',
  city: 'Trujillo, La Libertad — Perú',
  hours: 'Lunes a Sábado: 9:00 a.m. – 7:30 p.m.',
};

export const STORE_IMAGES = {
  heroGiftBox: '/src/assets/images/hero_gift_box_1795052583057.jpg',
  shippingTruck: '/src/assets/images/shipping_pink_truck_1795052583450.jpg',
  pinkRoses: '/src/assets/images/prod_pink_roses_1795052583880.jpg',
  balloonBouquet: '/src/assets/images/prod_balloon_bouquet_1795052585651.jpg',
  teddyMugBox: '/src/assets/images/prod_teddy_mug_box_1795052585654.jpg',
  rosesPhotoBox: '/src/assets/images/prod_roses_photo_box_1795052585655.jpg',
  chocolateBouquet: '/src/assets/images/prod_chocolate_bouquet_1795052586187.jpg',
  customMug: '/src/assets/images/prod_custom_mug_1795052587098.jpg',
};

export const GIFT_CATEGORIES: GiftCategory[] = [
  'Todos',
  'Ramos',
  'Arreglos con globos',
  'Cajas personalizadas',
  'Tazas',
  'Chocolates',
];

export const POPULAR_OCCASIONS: OccasionTag[] = [
  'Cumpleaños',
  'Aniversario',
  'San Valentín',
  'Día de la madre',
  'Amistad',
  'Graduación',
];

export const GIFT_PRODUCTS: GiftProduct[] = [
  {
    id: 'ramo-rosas-rosadas',
    name: 'Ramo de rosas rosadas',
    category: 'Ramos',
    occasions: ['Aniversario', 'Día de la madre', 'San Valentín', 'Cumpleaños'],
    basePrice: 79.9,
    rating: 4.9,
    reviewsCount: 128,
    image: STORE_IMAGES.pinkRoses,
    shortDesc: 'Rosas frescas envueltas en papel coreano blush con lazo satinado.',
    description:
      'Delicado ramo armado a mano con rosas rosadas seleccionadas del día, follaje de nube blanca y papel coreano impermeable en tono rosa bebé, cerrado con un lazo satinado y tarjeta dedicatoria.',
    includes: [
      '12 rosas rosadas frescas seleccionadas',
      'Follaje decorativo gypsophila (nube)',
      'Envoltura coreana rosa pastel y cinta satinada',
      'Tarjeta impresa con tu dedicatoria personal',
    ],
    tag: 'Más vendido',
    presentations: [
      { id: 'estandar', label: 'Clásico (12 rosas)', details: 'Envuelto con tarjeta dedicatoria', priceDelta: 0 },
      { id: 'mediano', label: 'Especial (18 rosas)', details: 'Incluye chocolates de cortesía', priceDelta: 25 },
      { id: 'deluxe', label: 'Deluxe (24 rosas + foto)', details: 'Incluye foto polaroid impresa', priceDelta: 45 },
    ],
  },
  {
    id: 'arreglo-globos-cumple',
    name: 'Arreglo con globos Feliz Cumpleaños',
    category: 'Arreglos con globos',
    occasions: ['Cumpleaños', 'Amistad', 'Graduación'],
    basePrice: 89.9,
    rating: 4.8,
    reviewsCount: 96,
    image: STORE_IMAGES.balloonBouquet,
    shortDesc: 'Globo burbuja personalizado en tonos rose gold y rosa pastel.',
    description:
      'Bouquet festivo con globo burbuja transparente relleno de confeti rosado y mensaje vinílico personalizado, acompañado de globos cromados rose gold y base ponderada elegante.',
    includes: [
      'Globo burbuja de 24 pulgadas con frase personalizada',
      '10 globos látex y cromados rose gold',
      'Lazo de raso y base decorativa estable',
      'Tarjeta de cumpleaños personalizada',
    ],
    tag: 'Personalizable',
    presentations: [
      { id: 'estandar', label: 'Bouquet Clásico', details: 'Globo burbuja + 10 globos', priceDelta: 0 },
      { id: 'con-chocolates', label: 'Con caja de trufas', details: 'Suma 6 bombones dorados en la base', priceDelta: 22 },
      { id: 'deluxe', label: 'Pack Fiesta + Taza', details: 'Incluye taza personalizada a juego', priceDelta: 35 },
    ],
  },
  {
    id: 'caja-personalizada-con-amor',
    name: 'Caja personalizada Con Amor',
    category: 'Cajas personalizadas',
    occasions: ['Aniversario', 'Cumpleaños', 'Amistad', 'Día de la madre'],
    basePrice: 69.9,
    rating: 4.9,
    reviewsCount: 76,
    image: STORE_IMAGES.teddyMugBox,
    shortDesc: 'Caja kraft con osito de felpa suave, taza rosada y tarjeta especial.',
    description:
      'Nuestra cajita insignia lista para emocionar desde el primer segundo: incluye un tierno osito de felpa, una taza cerámica con detalles de corazones, viruta natural y tarjeta impresa con tu mensaje.',
    includes: [
      'Caja rígida kraft con lazo exterior',
      'Osito de peluche suave de 20 cm',
      'Taza cerámica diseño corazones (11 oz)',
      'Tarjeta dedicatoria "Para alguien especial"',
    ],
    tag: 'Favorito',
    presentations: [
      { id: 'estandar', label: 'Caja Clásica', details: 'Osito + taza + tarjeta', priceDelta: 0 },
      { id: 'dulce', label: 'Con chocolates', details: 'Agrega 4 bombones y foto polaroid', priceDelta: 18 },
      { id: 'deluxe', label: 'Edición Premium', details: 'Taza con nombre + 2 fotos + vela aromática', priceDelta: 32 },
    ],
  },
  {
    id: 'caja-rosas-con-foto',
    name: 'Caja de rosas con foto',
    category: 'Cajas personalizadas',
    occasions: ['Aniversario', 'San Valentín', 'Día de la madre'],
    basePrice: 99.9,
    rating: 4.9,
    reviewsCount: 54,
    image: STORE_IMAGES.rosesPhotoBox,
    shortDesc: 'Caja corazón con rosas rojas frescas, cinta satinada y foto impresa.',
    description:
      'Elegante caja en forma de corazón rodeada de cinta de raso rosa champagne, repleta de rosas rojas frescas y una fotografía especial impresa en papel fotográfico de alta nitidez.',
    includes: [
      'Caja corazón rígida de acabado mate',
      '14 a 16 rosas rojas frescas hidratadas',
      'Impresión de tu fotografía favorita enmarcada',
      'Cinta satinada y tarjeta con sobre sellado',
    ],
    tag: 'Romántico',
    presentations: [
      { id: 'estandar', label: 'Corazón Clásico', details: 'Rosas rojas + 1 foto impresa', priceDelta: 0 },
      { id: 'chocolates', label: 'Corazón + Bombones', details: 'Incluye 8 trufas en compartimento lateral', priceDelta: 24 },
      { id: 'deluxe', label: 'Corazón Gran Reserva', details: 'Rosas preservadas + 2 fotos + dedicatoria dorada', priceDelta: 48 },
    ],
  },
  {
    id: 'taza-personalizada-amor',
    name: 'Taza personalizada',
    category: 'Tazas',
    occasions: ['Cumpleaños', 'Amistad', 'Día de la madre', 'Graduación'],
    basePrice: 39.9,
    rating: 4.7,
    reviewsCount: 112,
    image: STORE_IMAGES.customMug,
    shortDesc: 'Taza cerámica blanca 11 oz sublimada con tu frase e ícono favorito.',
    description:
      'Taza cerámica de alta resistencia apta para microondas y lavavajillas. Sublimamos el texto, nombre, fecha o dedicatoria que elijas con colores vibrantes y acabado brillante duradero.',
    includes: [
      'Taza cerámica AAA de 11 oz (325 ml)',
      'Estampado a todo color en alta definición',
      'Cajita individual lista para regalar con lazo',
      'Tarjeta pequeña con mensaje personalizado',
    ],
    presentations: [
      { id: 'estandar', label: 'Taza Blanca 11 oz', details: 'Impresión panorámica + cajita regalo', priceDelta: 0 },
      { id: 'magica', label: 'Taza Mágica Negra', details: 'Revela el diseño con agua caliente', priceDelta: 10 },
      { id: 'duo', label: 'Pack Dúo (2 Tazas)', details: 'Dos tazas coordinadas para pareja o amistad', priceDelta: 32 },
    ],
  },
  {
    id: 'ramo-chocolates-premium',
    name: 'Ramo de chocolates Premium',
    category: 'Chocolates',
    occasions: ['Cumpleaños', 'San Valentín', 'Aniversario', 'Graduación'],
    basePrice: 89.9,
    rating: 4.8,
    reviewsCount: 67,
    image: STORE_IMAGES.chocolateBouquet,
    shortDesc: 'Bouquet de bombones dorados con avellanas, eucalipto y lazo terciopelo.',
    description:
      'Un bouquet irresistible armado con bombones dorados de chocolate y avellana, delicadas ramas de eucalipto y papel blush de alta gramaje cerrado con un lazo de terciopelo rosa antiguo.',
    includes: [
      '18 bombones dorados de avellana y chocolate',
      'Detalles botánicos de eucalipto y espigas doradas',
      'Envoltura boutique y lazo de terciopelo',
      'Etiqueta dedicatoria personalizada',
    ],
    tag: 'Dulce detalle',
    presentations: [
      { id: 'estandar', label: 'Bouquet 18 bombones', details: 'Presentación boutique con lazo', priceDelta: 0 },
      { id: 'grande', label: 'Bouquet 24 bombones', details: 'Mayor volumen + tarjeta foil', priceDelta: 22 },
      { id: 'deluxe', label: 'Bouquet + Globo', details: 'Suma mini globo metálico con nombre', priceDelta: 34 },
    ],
  },
  {
    id: 'box-corazon-tejido',
    name: 'Box Corazón Tejido y Taza',
    category: 'Cajas personalizadas',
    occasions: ['San Valentín', 'Aniversario', 'Cumpleaños', 'Amistad'],
    basePrice: 74.9,
    rating: 5.0,
    reviewsCount: 43,
    image: STORE_IMAGES.heroGiftBox,
    shortDesc: 'Caja sorpresa con corazón crochet artesanal, taza y foto polaroid.',
    description:
      'Un detalle cálido y artesanal pensado para abrazar a la distancia: incluye un corazón tejido a crochet en hilo algodón rosado, taza cerámica con cucharita, y tu foto estilo polaroid con fecha especial.',
    includes: [
      'Corazón tejido a mano en crochet rosa bebé',
      'Taza cerámica artesanal con cucharita',
      'Foto estilo polaroid con frase y fecha impresa',
      'Caja kraft con viruta crema y lazo rústico',
    ],
    tag: 'Edición artesanal',
    presentations: [
      { id: 'estandar', label: 'Box Artesanal', details: 'Corazón crochet + taza + 1 polaroid', priceDelta: 0 },
      { id: 'recuerdos', label: 'Box + 4 Polaroids', details: 'Incluye set de 4 fotos + mini luces LED', priceDelta: 16 },
      { id: 'deluxe', label: 'Box Completo', details: 'Suma ramo mini de flores secas + chocolates', priceDelta: 30 },
    ],
  },
];

export const CUSTOM_BASE_PRODUCTS: CustomBaseProduct[] = [
  {
    id: 'mug',
    label: 'Tazas',
    price: 39.9,
    subtitle: 'Cerámica blanca 11 oz apta para microondas',
    dimensions: '9.5 cm alto × 8 cm diámetro',
    material: 'Cerámica AAA sublimada',
  },
  {
    id: 'cushion',
    label: 'Cojines',
    price: 49.9,
    subtitle: 'Tela felpa extra suave con relleno incluido',
    dimensions: '40 cm × 40 cm con cierre',
    material: 'Poliéster terciopelo lavable',
  },
  {
    id: 'keychain',
    label: 'Llaveros',
    price: 22.9,
    subtitle: 'Dije acrílico cristal con borla rosada',
    dimensions: '5.5 cm × 5.5 cm',
    material: 'Acrílico espejo y herraje dorado',
  },
  {
    id: 'bottle',
    label: 'Botellas',
    price: 45.9,
    subtitle: 'Termo térmico acero inoxidable 500 ml',
    dimensions: '24 cm alto × 7 cm diámetro',
    material: 'Acero doble pared frío/calor',
  },
  {
    id: 'giftbox',
    label: 'Cajas de regalo',
    price: 69.9,
    subtitle: 'Caja sorpresa personalizada con tapa impresa',
    dimensions: '25 cm × 20 cm × 10 cm',
    material: 'Cartón rígido laminado + cinta satinada',
  },
];

export const DESIGN_COLORS = [
  { name: 'Rosa Detalle', hex: '#E95D85' },
  { name: 'Lavanda Suave', hex: '#9B89C7' },
  { name: 'Azul Cielo', hex: '#6EA3D5' },
  { name: 'Verde Menta', hex: '#6FB39C' },
  { name: 'Champagne', hex: '#C7A97E' },
  { name: 'Negro Clásico', hex: '#383234' },
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'express',
    title: 'Envío express (mismo día)',
    badge: 'Disponible en Trujillo',
    description: 'Recibe tu pedido el mismo día directo a la puerta.',
    note: '*Aplica para pedidos realizados antes de las 12:00 p.m.',
    price: 15.9,
    etaLabel: '1 – 6 horas',
  },
  {
    id: 'standard',
    title: 'Envío estándar',
    description: 'Recibe tu pedido de 1 a 3 días hábiles con empaque protegido.',
    note: '*Válido para todo el Perú (Shalom / Olva Courier)',
    price: 9.9,
    etaLabel: '1 – 3 días hábiles',
  },
  {
    id: 'scheduled',
    title: 'Envío programado',
    description: 'Elige la fecha exacta en la que deseas sorprender con tu regalo.',
    note: '*Programa con al menos 24 horas de anticipación',
    price: 12.9,
    etaLabel: 'Elige la fecha',
  },
  {
    id: 'pickup',
    title: 'Recojo en tienda (Trujillo)',
    badge: 'Sin costo',
    description: 'Recoge tu pedido listo y empacado en Liverpool 284, Trujillo.',
    note: '*Coordinamos tu horario exacto por WhatsApp',
    price: 0,
    etaLabel: 'Gratis',
  },
];

export const TRUJILLO_DISTRICTS = [
  'Trujillo Centro',
  'Víctor Larco Herrera',
  'Moche',
  'Huanchaco',
  'La Esperanza',
  'El Porvenir',
  'Florencia de Mora',
  'Laredo',
  'Lima Metropolitana',
  'Otra provincia del Perú',
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'María Fernández',
  email: 'mariafernandez@email.com',
  phone: '987 654 321',
  city: 'Trujillo, Perú',
  savedAddresses: [
    {
      id: 'addr-1',
      label: 'Casa',
      address: 'Av. Larco 450, Urb. California',
      district: 'Víctor Larco Herrera',
    },
    {
      id: 'addr-2',
      label: 'Estudio Detalle (Recojo)',
      address: 'Liverpool 284',
      district: 'Trujillo Centro',
    },
  ],
  notifyOrders: true,
  notifyPromos: true,
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Bienvenida a Detalle · Con Amor',
    body: 'Personaliza tu primera taza, cojín o caja sorpresa en minutos y coordina tu entrega directa en Trujillo o todo el Perú.',
    dateLabel: 'Hoy',
    read: false,
    type: 'promo',
  },
  {
    id: 'notif-2',
    title: 'Envíos express disponibles en Trujillo',
    body: 'Realiza tu pedido antes de las 12:00 p.m. para recibirlo hoy mismo o recógelo gratis en Liverpool 284.',
    dateLabel: 'Aviso de tienda',
    read: false,
    type: 'tip',
  },
];

export const STORE_FAQS = [
  {
    q: '¿Con cuánto tiempo de anticipación debo pedir un regalo personalizado?',
    a: 'Las tazas, llaveros y botellas personalizadas se preparan en el mismo día si confirmas antes de las 12:00 p.m. Para cajas con fotos, cojines o arreglos florales grandes recomendamos pedir con 24 horas de anticipación.',
  },
  {
    q: '¿Cómo envío la foto para mi caja de rosas o regalo personalizado?',
    a: 'Puedes adjuntar tu foto directamente en nuestra sección "Personaliza" o enviárnosla en alta calidad al WhatsApp +51 942 778 030 indicando tu número de pedido.',
  },
  {
    q: '¿Hacen entregas en Trujillo y envíos a otras ciudades del Perú?',
    a: 'Sí. En Trujillo contamos con reparto express (1 a 6 horas) y recojo gratuito en nuestra dirección: Liverpool 284, Trujillo, Perú. También enviamos a Lima y provincias mediante courier en 1 a 3 días hábiles.',
  },
  {
    q: '¿Cómo realizo el pago de mi pedido?',
    a: 'No pedimos tarjetas dentro de la app. Al finalizar tu carrito se genera automáticamente tu resumen por WhatsApp al +51 942 778 030, donde coordinas el pago por Yape, Plin o transferencia antes del despacho.',
  },
];
