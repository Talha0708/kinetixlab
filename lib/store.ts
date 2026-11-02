export interface SneakerProduct {
  id: string;
  name: string;
  subtitle: string;
  category: 'high-tops' | 'runners' | 'trail' | 'minimalist';
  price: number;
  mainImage: string;
  hoverImage: string;
  sizes: string[];
  specs: string[];
  tag?: string;
  heroHeadline?: string;
  heroKicker?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'cod' | 'apple-pay';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  couponCode?: string;
}

export const PRODUCTS: SneakerProduct[] = [
  {
    id: 'volt-strike',
    name: 'VOLT STRIKE HI-TOP',
    subtitle: 'High-Altitude Tactical Boot // Air-Bubble',
    category: 'high-tops',
    price: 260,
    mainImage: '/images/sneaker1-main.jpg',
    hoverImage: '/images/sneaker1-hover.jpg',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: ['Air-cushion sole', 'Carbon fiber shank', 'Reflective harness'],
    tag: 'LIMITED 01',
    heroHeadline: 'TACTICAL VELOCITY // AIR-BUBBLE CHASSIS',
    heroKicker: 'DROP 04 · HIGH-ALTITUDE COMBAT READY',
  },
  {
    id: 'aero-run',
    name: 'AERO-RUN 2049',
    subtitle: 'Speed Platform // Hyperfly Mesh',
    category: 'runners',
    price: 220,
    mainImage: '/images/sneaker2-main.jpg',
    hoverImage: '/images/sneaker2-hover.jpg',
    sizes: ['US 7.5', 'US 8.5', 'US 9.5', 'US 10.5', 'US 11.5'],
    specs: ['Luminescent rear clip', 'Dual-layer monofilament', 'Reactive EVA'],
    tag: 'IN STOCK',
    heroHeadline: 'LUMINESCENT REAR HEEL // KINETIC STRIDE',
    heroKicker: 'AERO-RUN 2049 · 285G ULTRALIGHT',
  },
  {
    id: 'tech-trail',
    name: 'TECH-TRAIL VIBRAM',
    subtitle: 'All-Terrain // Vibram Lug Sole',
    category: 'trail',
    price: 285,
    mainImage: '/images/sneaker3-main.jpg',
    hoverImage: '/images/sneaker3-hover.jpg',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: ['Vibram deep lugs', 'Speed-lock toggle lacing', 'Ripstop ballistic shell'],
    tag: 'AGGRESSIVE LUG',
    heroHeadline: 'VIBRAM TOOTH TREAD // BALLISTIC MESH',
    heroKicker: 'HEAVY GRIP · DESIGNED FOR WET ASPHALT',
  },
  {
    id: 'cybernetix-velocita',
    name: 'CYBERNETIX VELOCITA',
    subtitle: 'Aerodynamic // Carbon Plate Racer',
    category: 'runners',
    price: 240,
    mainImage: '/images/sneaker4-main.jpg',
    hoverImage: '/images/sneaker4-hover.jpg',
    sizes: ['US 8.5', 'US 9', 'US 10', 'US 10.5', 'US 11'],
    specs: ['Carbon arch bridge', 'Perforated aero skin', 'Traction pod matrix'],
    tag: 'AERO STARK',
    heroHeadline: 'CARBON ARCH PROPULSION // OPTICAL LINING',
    heroKicker: 'MARATHON GRADE · SPEED-TESTED IN LAB',
  },
  {
    id: 'void-strike-ninja',
    name: 'VOID-STRIKE FIDLOCK BOOT',
    subtitle: 'Magnetic Tactical Boot // Neoprene Collar',
    category: 'high-tops',
    price: 295,
    mainImage: '/images/sneaker5-main.jpg',
    hoverImage: '/images/sneaker5-hover.jpg',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: ['Dual FIDLOCK magnetic buckles', 'Waterproof ripstop', 'Vibram Megagrip'],
    tag: 'NEW RELEASE',
    heroHeadline: 'MAGNETIC FIDLOCK HARNESS // HIGH-STANCE BOOT',
    heroKicker: 'STEALTH LAB EDITION · 350 NUMBERED PAIRS',
  },
  {
    id: 'maglev-racer',
    name: 'MAGLEV NITRO RACER',
    subtitle: 'Kinetic Track Racer // Dual Nitrogen Pods',
    category: 'runners',
    price: 235,
    mainImage: '/images/sneaker6-main.jpg',
    hoverImage: '/images/sneaker6-hover.jpg',
    sizes: ['US 7.5', 'US 8.5', 'US 9.5', 'US 10.5', 'US 11'],
    specs: ['Nitro-infused midsole', 'Neon speed vectors', 'Anti-abrasion toe guard'],
    tag: 'FAST TRACK',
  },
  {
    id: 'exoskeleton-brutalist',
    name: 'EXOSKELETON ARCHITECT',
    subtitle: '3D External Cage // Segmented Heel Block',
    category: 'trail',
    price: 310,
    mainImage: '/images/sneaker7-main.jpg',
    hoverImage: '/images/sneaker7-hover.jpg',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: ['3D printed TPU exoskeleton', 'Segmented geometric heel', 'Vibram sole'],
    tag: 'FLAGSHIP',
  },
  {
    id: 'aura-prism-low',
    name: 'AURA PRISM MINIMALIST',
    subtitle: 'Clean Streetwear Low // Electric Lacing',
    category: 'minimalist',
    price: 195,
    mainImage: '/images/sneaker8-main.jpg',
    hoverImage: '/images/sneaker8-hover.jpg',
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: ['Full-grain calfskin leather', 'Acid green bungee toggle', 'Cushioned cupsole'],
    tag: 'CORE ESSENTIAL',
  },
];

export const CATEGORIES = [
  { id: 'all', label: 'All Silhouettes' },
  { id: 'high-tops', label: 'High-Tops & Boots' },
  { id: 'runners', label: 'Speed Runners' },
  { id: 'trail', label: 'Trail & Brutalist' },
  { id: 'minimalist', label: 'Minimalist Low' },
] as const;

export function filterProductsByCategory(products: SneakerProduct[], category: string): SneakerProduct[] {
  if (category === 'all' || !category) return products;
  return products.filter(p => p.category === category);
}

export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { isValid: false, error: 'Email is required' };
  }
  const trimmed = email.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  return { isValid: true };
}

export function validateCoupon(code: string, subtotal: number): { isValid: boolean; discount: number; message: string } {
  const normalized = code.trim().toUpperCase();
  if (normalized === 'NEON20') {
    const discount = Math.round(subtotal * 0.2);
    return { isValid: true, discount, message: '20% OFF // Applied successfully' };
  }
  if (normalized === 'SYNDICATE') {
    const discount = Math.min(30, subtotal);
    return { isValid: true, discount, message: '$30 VIP CREDIT // Applied successfully' };
  }
  return { isValid: false, discount: 0, message: 'Invalid or expired promotional code' };
}

export function calculateCartTotals(
  items: CartItem[],
  options?: { shippingMethod?: 'standard' | 'express'; discount?: number }
): {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
} {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.min(subtotal, Math.max(0, options?.discount || 0));

  let shipping = 0;
  if (subtotal > 0) {
    if (options?.shippingMethod === 'express') {
      shipping = 15;
    } else {
      shipping = subtotal > 200 ? 0 : 15;
    }
  }

  const total = Math.max(0, subtotal - discount + shipping);

  return {
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
  };
}

export function addToCart(
  cart: CartItem[],
  product: SneakerProduct,
  selectedSize: string
): { success: boolean; cart: CartItem[]; error?: string } {
  if (!selectedSize) {
    return { success: false, cart, error: 'Please select a size first' };
  }

  if (!product.sizes.includes(selectedSize)) {
    return { success: false, cart, error: 'Selected size is not available' };
  }

  const existingIndex = cart.findIndex(
    item => item.productId === product.id && item.size === selectedSize
  );

  let newCart: CartItem[];
  if (existingIndex > -1) {
    newCart = cart.map((item, index) =>
      index === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    newCart = [
      ...cart,
      {
        productId: product.id,
        name: product.name,
        size: selectedSize,
        price: product.price,
        image: product.mainImage,
        quantity: 1,
      },
    ];
  }

  return { success: true, cart: newCart };
}

export function removeFromCart(cart: CartItem[], productId: string, size: string): CartItem[] {
  return cart.filter(item => !(item.productId === productId && item.size === size));
}

export function updateCartQuantity(
  cart: CartItem[],
  productId: string,
  size: string,
  delta: number
): CartItem[] {
  return cart
    .map(item => {
      if (item.productId === productId && item.size === size) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
}

export function validateCheckoutForm(form: CheckoutFormData): {
  isValid: boolean;
  errors: Partial<Record<keyof CheckoutFormData, string>>;
} {
  const errors: Partial<Record<keyof CheckoutFormData, string>> = {};

  if (!form.fullName || form.fullName.trim().length < 2) {
    errors.fullName = 'Full legal name is required';
  }

  const emailCheck = validateEmail(form.email);
  if (!emailCheck.isValid) {
    errors.email = emailCheck.error;
  }

  if (!form.phone || form.phone.trim().length < 7) {
    errors.phone = 'Valid contact phone number is required';
  }

  if (!form.address || form.address.trim().length < 5) {
    errors.address = 'Street address is required';
  }

  if (!form.city || form.city.trim().length < 2) {
    errors.city = 'City is required';
  }

  if (!form.postalCode || form.postalCode.trim().length < 3) {
    errors.postalCode = 'Postal code is required';
  }

  if (form.paymentMethod === 'card') {
    const rawCard = (form.cardNumber || '').replace(/\s+/g, '');
    if (!rawCard || rawCard.length < 13) {
      errors.cardNumber = 'Valid card number is required';
    }
    if (!form.cardExpiry || !/^\d{2}\/\d{2}$/.test(form.cardExpiry.trim())) {
      errors.cardExpiry = 'Expiry format MM/YY required';
    }
    if (!form.cardCvc || form.cardCvc.trim().length < 3) {
      errors.cardCvc = '3 or 4 digit CVC required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
