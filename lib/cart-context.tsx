'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  type SneakerProduct,
  type CartItem,
  addToCart as addLogic,
  removeFromCart as removeLogic,
  updateCartQuantity as updateLogic,
  calculateCartTotals,
  validateCoupon,
  PRODUCTS,
} from './store';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: SneakerProduct, size: string) => { success: boolean; error?: string };
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, delta: number) => void;
  clearCart: () => void;
  shippingMethod: 'standard' | 'express';
  setShippingMethod: (method: 'standard' | 'express') => void;
  couponCode: string;
  couponDiscount: number;
  couponMessage: string | null;
  applyCouponCode: (code: string) => { success: boolean; message: string };
  removeCouponCode: () => void;
  totals: {
    itemCount: number;
    subtotal: number;
    discount: number;
    shipping: number;
    total: number;
  };
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'kinetix_cart_items_v2';
const COUPON_KEY = 'kinetix_cart_coupon_v2';

function getInitialCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [
      {
        productId: PRODUCTS[0].id,
        name: PRODUCTS[0].name,
        size: 'US 10',
        price: PRODUCTS[0].price,
        image: PRODUCTS[0].mainImage,
        quantity: 1,
      },
    ];
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return [
    {
      productId: PRODUCTS[0].id,
      name: PRODUCTS[0].name,
      size: 'US 10',
      price: PRODUCTS[0].price,
      image: PRODUCTS[0].mainImage,
      quantity: 1,
    },
  ];
}

function getInitialCoupon(): string {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem(COUPON_KEY) || '';
  } catch {
    return '';
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(getInitialCart);
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [couponCode, setCouponCode] = useState<string>(getInitialCoupon);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Derived coupon calculation during render (no setState in useEffect!)
  const currentSubtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const couponResult = couponCode ? validateCoupon(couponCode, currentSubtotal) : null;
  const couponDiscount = couponResult?.isValid ? couponResult.discount : 0;
  const couponMessage = couponResult ? couponResult.message : null;

  // Save to localStorage when cart changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  // Save coupon
  useEffect(() => {
    try {
      localStorage.setItem(COUPON_KEY, couponCode);
    } catch {
      // ignore
    }
  }, [couponCode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleAddToCart = (product: SneakerProduct, size: string) => {
    const result = addLogic(cart, product, size);
    if (result.success) {
      setCart(result.cart);
      showToast(`Added ${product.name} (${size}) to bag`);
      setIsCartOpen(true);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleRemoveFromCart = (productId: string, size: string) => {
    setCart(removeLogic(cart, productId, size));
    showToast('Item removed from bag');
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCart(updateLogic(cart, productId, size, delta));
  };

  const handleClearCart = () => {
    setCart([]);
    setCouponCode('');
  };

  const applyCouponCode = (code: string) => {
    const result = validateCoupon(code, currentSubtotal);
    if (result.isValid) {
      setCouponCode(code.trim().toUpperCase());
      showToast('Promotional voucher applied');
      return { success: true, message: result.message };
    }
    return { success: false, message: result.message };
  };

  const removeCouponCode = () => {
    setCouponCode('');
    showToast('Promo code removed');
  };

  const totals = calculateCartTotals(cart, {
    shippingMethod,
    discount: couponDiscount,
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
        updateQuantity: handleUpdateQuantity,
        clearCart: handleClearCart,
        shippingMethod,
        setShippingMethod,
        couponCode,
        couponDiscount,
        couponMessage,
        applyCouponCode,
        removeCouponCode,
        totals,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
