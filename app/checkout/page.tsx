'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Truck,
  Tag,
  CheckCircle2,
  AlertCircle,
  Lock,
  Printer,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { validateCheckoutForm, type CheckoutFormData } from '@/lib/store';

export default function CheckoutPage() {
  const {
    cart,
    totals,
    shippingMethod,
    setShippingMethod,
    couponCode,
    couponDiscount,
    couponMessage,
    applyCouponCode,
    removeCouponCode,
    clearCart,
    showToast,
  } = useCart();

  const [form, setForm] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [promoInput, setPromoInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    trackingId: string;
    date: string;
    items: typeof cart;
    totals: typeof totals;
    customer: CheckoutFormData;
  } | null>(null);

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    applyCouponCode(promoInput);
    setPromoInput('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your bag is empty');
      return;
    }

    const validation = validateCheckoutForm(form);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast('Please fix required fields in the form');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `KX-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedTracking = `TRK-${Math.floor(10000 + Math.random() * 90000)}-NEO`;
      const dateStr = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });

      setOrderConfirmed({
        orderId: generatedOrderId,
        trackingId: generatedTracking,
        date: dateStr,
        items: [...cart],
        totals: { ...totals },
        customer: { ...form },
      });

      clearCart();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="tech-grid min-h-screen bg-[#060709] text-zinc-100 py-10 px-4 sm:px-6">
      
      {/* Top Header */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between border-b border-white/10 pb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#10ff60] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO LABORATORY STORE</span>
        </Link>

        <div className="font-extrabold text-xl tracking-tighter text-white">
          KINETIX<span className="text-[#10ff60] font-mono">.CHECKOUT</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#10ff60] bg-[#0c0e12] border border-[#10ff60]/30 px-3 py-1">
          <Lock className="w-3 h-3" />
          <span>256-BIT ENCRYPTED</span>
        </div>
      </div>

      {/* Main Checkout View */}
      {orderConfirmed ? (
        /* ORDER CONFIRMATION SCREEN */
        <div className="max-w-3xl mx-auto bg-[#0c0e12] border border-[#10ff60] p-8 sm:p-12 shadow-[0_0_30px_-5px_rgba(16,255,96,0.25)]">
          
          <div className="text-center mb-8 pb-8 border-b border-white/10">
            <div className="w-16 h-16 bg-[#10ff60]/10 border border-[#10ff60] flex items-center justify-center mx-auto mb-4 text-[#10ff60]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="text-xs font-mono font-bold text-[#10ff60] uppercase tracking-widest mb-1">
              DISPATCH CONFIRMED // PROTOCOL ACTIVE
            </div>
            <h1 className="text-3xl font-extrabold uppercase text-white tracking-tight mb-2">
              RESERVATION AUTHORIZED
            </h1>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Your pair allocation has been logged in the distribution vault. Priority shipment is being prepared.
            </p>
          </div>

          {/* Receipt Data Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#060709] p-4 border border-white/10 mb-8 font-mono text-xs">
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">ORDER ID</div>
              <div className="text-white font-bold">{orderConfirmed.orderId}</div>
            </div>
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">TRACKING</div>
              <div className="text-[#10ff60] font-bold">{orderConfirmed.trackingId}</div>
            </div>
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">DATE</div>
              <div className="text-white">{orderConfirmed.date}</div>
            </div>
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">TOTAL PAID</div>
              <div className="text-[#10ff60] font-bold tabular-nums">
                ${orderConfirmed.totals.total.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Itemized Purchased Sneaker List */}
          <div className="mb-8 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-zinc-400">ALLOCATED FOOTWEAR</h3>
            {orderConfirmed.items.map((item, idx) => (
              <div
                key={`${item.productId}-${idx}`}
                className="flex items-center justify-between p-3 bg-[#060709] border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-black border border-white/10 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white uppercase">{item.name}</h4>
                    <div className="text-[11px] font-mono text-[#10ff60]">SIZE: {item.size} · QTY: {item.quantity}</div>
                  </div>
                </div>
                <div className="font-mono text-xs font-bold text-white tabular-nums">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Delivery & Customer Info */}
          <div className="p-4 bg-[#060709] border border-white/10 mb-8 text-xs font-mono text-zinc-400 space-y-1">
            <div className="text-white font-bold uppercase mb-2">SHIPPING DESTINATION:</div>
            <div>{orderConfirmed.customer.fullName}</div>
            <div>{orderConfirmed.customer.address}</div>
            <div>{orderConfirmed.customer.city}, {orderConfirmed.customer.postalCode}</div>
            <div>{orderConfirmed.customer.country} · {orderConfirmed.customer.phone}</div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-[#12151b] hover:bg-[#181c24] text-white font-mono text-xs uppercase border border-white/20 flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT RECEIPT</span>
            </button>
            <Link
              href="/"
              className="flex-1 py-3 bg-[#10ff60] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 text-center"
            >
              <span>CONTINUE TO STORE</span>
            </Link>
          </div>

        </div>
      ) : (
        /* CHECKOUT SPLIT: FORM & SUMMARY */
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: CHECKOUT FORM (7 COLS) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Customer Contact */}
            <div className="bg-[#0c0e12] border border-white/10 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10ff60] uppercase tracking-wider mb-4">
                <span>01 // CONTACT INFORMATION</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    placeholder="agent@kinetix.io"
                    className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                  />
                  {errors.email && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                  />
                  {errors.phone && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-[#0c0e12] border border-white/10 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10ff60] uppercase tracking-wider mb-4">
                <span>02 // SHIPPING ADDRESS</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">FULL LEGAL NAME *</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={e => handleInputChange('fullName', e.target.value)}
                    placeholder="Takeshi Kovacs"
                    className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-1">STREET ADDRESS *</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={e => handleInputChange('address', e.target.value)}
                    placeholder="42 Neon Boulevard, Suite 801"
                    className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                  />
                  {errors.address && (
                    <p className="text-[11px] font-mono text-red-400 mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">CITY *</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => handleInputChange('city', e.target.value)}
                      placeholder="Neo-Tokyo"
                      className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                    />
                    {errors.city && (
                      <p className="text-[11px] font-mono text-red-400 mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">POSTAL CODE *</label>
                    <input
                      type="text"
                      value={form.postalCode}
                      onChange={e => handleInputChange('postalCode', e.target.value)}
                      placeholder="94103"
                      className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                    />
                    {errors.postalCode && (
                      <p className="text-[11px] font-mono text-red-400 mt-1">{errors.postalCode}</p>
                    )}
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-mono text-zinc-400 mb-1">COUNTRY</label>
                    <select
                      value={form.country}
                      onChange={e => handleInputChange('country', e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                    >
                      <option value="United States">United States</option>
                      <option value="Japan">Japan</option>
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Bangladesh">Bangladesh</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Speed */}
            <div className="bg-[#0c0e12] border border-white/10 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10ff60] uppercase tracking-wider mb-4">
                <span>03 // DISPATCH SPEED</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('shippingMethod', 'standard');
                    setShippingMethod('standard');
                  }}
                  className={`p-4 border text-left transition-all ${
                    form.shippingMethod === 'standard'
                      ? 'border-[#10ff60] bg-[#10ff60]/5'
                      : 'border-white/10 bg-[#060709] hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-white uppercase">STANDARD GROUND</span>
                    <span className="text-xs font-mono text-[#10ff60] font-bold">
                      {totals.subtotal > 200 ? 'FREE' : '$15.00'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">3–5 Business Days · Tracked</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleInputChange('shippingMethod', 'express');
                    setShippingMethod('express');
                  }}
                  className={`p-4 border text-left transition-all ${
                    form.shippingMethod === 'express'
                      ? 'border-[#10ff60] bg-[#10ff60]/5'
                      : 'border-white/10 bg-[#060709] hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-xs text-white uppercase">CYBER PRIORITY AIR</span>
                    <span className="text-xs font-mono text-[#10ff60] font-bold">$15.00</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">Next-Day Dispatch · Vault Packing</p>
                </button>
              </div>
            </div>

            {/* Step 4: Payment Method */}
            <div className="bg-[#0c0e12] border border-white/10 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10ff60] uppercase tracking-wider mb-4">
                <span>04 // PAYMENT AUTHORIZATION</span>
              </div>

              {/* Payment selector tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => handleInputChange('paymentMethod', 'card')}
                  className={`py-2 px-3 text-xs font-mono border text-center transition-all ${
                    form.paymentMethod === 'card'
                      ? 'bg-[#10ff60] text-black border-[#10ff60] font-bold'
                      : 'bg-[#060709] text-zinc-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  CREDIT CARD
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('paymentMethod', 'apple-pay')}
                  className={`py-2 px-3 text-xs font-mono border text-center transition-all ${
                    form.paymentMethod === 'apple-pay'
                      ? 'bg-[#10ff60] text-black border-[#10ff60] font-bold'
                      : 'bg-[#060709] text-zinc-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  APPLE / GOOGLE
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('paymentMethod', 'cod')}
                  className={`py-2 px-3 text-xs font-mono border text-center transition-all ${
                    form.paymentMethod === 'cod'
                      ? 'bg-[#10ff60] text-black border-[#10ff60] font-bold'
                      : 'bg-[#060709] text-zinc-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  CASH ON DELIVERY
                </button>
              </div>

              {form.paymentMethod === 'card' && (
                <div className="space-y-4">
                  {/* Cyber Holographic Card Preview */}
                  <div className="relative p-5 bg-gradient-to-tr from-black via-[#0c0e12] to-zinc-900 border border-[#10ff60]/40 rounded-none shadow-lg overflow-hidden max-w-sm mx-auto mb-6">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-8 h-6 bg-[#10ff60]/30 border border-[#10ff60] rounded-sm"></div>
                      <span className="font-mono text-[10px] text-[#10ff60] tracking-widest">KINETIX LAB // PASS</span>
                    </div>
                    <div className="font-mono text-sm tracking-widest text-white mb-4">
                      {form.cardNumber || '•••• •••• •••• 4242'}
                    </div>
                    <div className="flex justify-between items-end text-[10px] font-mono text-zinc-400">
                      <div>
                        <div className="text-[8px] text-zinc-600 uppercase">HOLDER</div>
                        <div className="text-white uppercase truncate max-w-[150px]">{form.fullName || 'TAKASHI KOVACS'}</div>
                      </div>
                      <div>
                        <div className="text-[8px] text-zinc-600 uppercase">EXPIRY</div>
                        <div className="text-white">{form.cardExpiry || '12/28'}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">CARD NUMBER *</label>
                    <input
                      type="text"
                      maxLength={19}
                      value={form.cardNumber}
                      onChange={e => handleInputChange('cardNumber', e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                    />
                    {errors.cardNumber && (
                      <p className="text-[11px] font-mono text-red-400 mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">EXPIRY (MM/YY) *</label>
                      <input
                        type="text"
                        maxLength={5}
                        value={form.cardExpiry}
                        onChange={e => handleInputChange('cardExpiry', e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                      />
                      {errors.cardExpiry && (
                        <p className="text-[11px] font-mono text-red-400 mt-1">{errors.cardExpiry}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">SECURITY CODE (CVC) *</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={form.cardCvc}
                        onChange={e => handleInputChange('cardCvc', e.target.value)}
                        placeholder="888"
                        className="w-full px-3.5 py-2.5 bg-[#060709] border border-white/20 text-white font-mono text-xs focus:outline-none focus:border-[#10ff60]"
                      />
                      {errors.cardCvc && (
                        <p className="text-[11px] font-mono text-red-400 mt-1">{errors.cardCvc}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {form.paymentMethod === 'apple-pay' && (
                <div className="p-6 bg-[#060709] border border-white/10 text-center font-mono text-xs">
                  <div className="text-[#10ff60] font-bold mb-2">BIOMETRIC AUTHORIZATION READY</div>
                  <p className="text-zinc-400 text-[11px] mb-4">
                    One-touch checkout with encrypted Touch ID / Face ID simulation.
                  </p>
                  <div className="px-4 py-2 bg-white text-black font-bold uppercase inline-block">
                     Pay / G Pay Ready
                  </div>
                </div>
              )}

              {form.paymentMethod === 'cod' && (
                <div className="p-6 bg-[#060709] border border-white/10 text-center font-mono text-xs">
                  <div className="text-[#10ff60] font-bold mb-2">CASH ON ARRIVAL (COD)</div>
                  <p className="text-zinc-400 text-[11px]">
                    Pay cash upon delivery. SMS verification code will be sent to your contact number upon dispatch.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (5 COLS) */}
          <div className="lg:col-span-5">
            <div className="bg-[#0c0e12] border border-white/10 p-6 sticky top-28 space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-extrabold text-lg uppercase text-white tracking-tight">ORDER SUMMARY</h3>
                <span className="text-xs font-mono text-[#10ff60] font-bold">
                  {totals.itemCount} ITEMS
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="py-8 text-center text-xs font-mono text-zinc-500">
                    No items in bag.{' '}
                    <Link href="/" className="text-[#10ff60] underline">
                      Add a pair
                    </Link>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.productId}-${item.size}-${idx}`}
                      className="flex items-center justify-between gap-3 p-2 bg-[#060709] border border-white/10"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-12 bg-black shrink-0 border border-white/10">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-white uppercase truncate">{item.name}</h4>
                          <div className="text-[10px] font-mono text-[#10ff60]">SIZE: {item.size} × {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono font-bold text-white tabular-nums shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="pt-2 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={e => setPromoInput(e.target.value)}
                    placeholder="PROMO (e.g. NEON20, SYNDICATE)"
                    className="flex-1 px-3 py-2 bg-[#060709] border border-white/20 text-white font-mono text-xs uppercase focus:outline-none focus:border-[#10ff60]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#12151b] hover:bg-[#10ff60] hover:text-black text-white font-mono text-xs uppercase border border-white/20 transition-colors"
                  >
                    APPLY
                  </button>
                </div>
                {couponMessage && (
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#10ff60] mt-2">
                    <span>{couponMessage}</span>
                    <button
                      type="button"
                      onClick={removeCouponCode}
                      className="text-zinc-500 hover:text-red-400"
                    >
                      REMOVE
                    </button>
                  </div>
                )}
              </form>

              {/* Cost Calculations */}
              <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-bold tabular-nums">${totals.subtotal.toFixed(2)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-[#10ff60]">
                    <span>PROMO DISCOUNT ({couponCode})</span>
                    <span className="tabular-nums">-${totals.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-400">
                  <span>SHIPPING</span>
                  <span className={totals.shipping === 0 ? 'text-[#10ff60]' : 'text-white'}>
                    {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-extrabold text-white pt-3 border-t border-white/10">
                  <span>TOTAL DUE</span>
                  <span className="text-[#10ff60] font-mono tabular-nums text-lg">
                    ${totals.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Authorize & Place Order CTA */}
              <button
                type="button"
                disabled={cart.length === 0 || isSubmitting}
                onClick={handlePlaceOrder}
                className="w-full py-4 bg-[#10ff60] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_-3px_rgba(16,255,96,0.4)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING TO VAULT...</span>
                ) : (
                  <>
                    <span>AUTHORIZE & PLACE ORDER</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[10px] font-mono text-zinc-500 text-center leading-relaxed">
                By clicking Authorize, you confirm the reservation of limited Batch 04 inventory. Dispatch initiates within 24 hours.
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}
