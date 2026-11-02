'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Minus,
  Check,
  AlertCircle,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Lock,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  ArrowUp,
  ShieldCheck,
  Truck,
  Sparkles,
  Menu,
  RefreshCw,
} from 'lucide-react';
import {
  type SneakerProduct,
  PRODUCTS,
  CATEGORIES,
  filterProductsByCategory,
  validateEmail,
} from '@/lib/store';
import { useCart } from '@/lib/cart-context';

export default function SneakerStorePage() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totals,
    isCartOpen,
    setIsCartOpen,
    toastMessage,
    showToast,
  } = useCart();

  // Hero carousel step state (0 to 4: 5 flagship sneakers in hero)
  const [heroIndex, setHeroIndex] = useState(0);
  const heroProducts = PRODUCTS.slice(0, 5);
  const currentHero = heroProducts[heroIndex];
  const [heroSelectedSizes, setHeroSelectedSizes] = useState<Record<number, string>>({});
  const heroSelectedSize = heroSelectedSizes[heroIndex] || currentHero.sizes[1] || 'US 10';

  // Category filter state
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const filteredProducts = filterProductsByCategory(PRODUCTS, activeCategory);

  // Selected sizes for product cards
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [sizeErrors, setSizeErrors] = useState<Record<string, boolean>>({});

  // Mobile navigation drawer state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mobile image angle flip state per sneaker
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });

  // Next / Prev hero slide
  const nextHeroSlide = () => {
    setHeroIndex(prev => (prev + 1) % heroProducts.length);
  };

  const prevHeroSlide = () => {
    setHeroIndex(prev => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    setSizeErrors(prev => ({ ...prev, [productId]: false }));
  };

  const handleCardAddToCart = (product: SneakerProduct) => {
    const size = selectedSizes[product.id];
    if (!size) {
      setSizeErrors(prev => ({ ...prev, [product.id]: true }));
      return;
    }
    addToCart(product, size);
  };

  const handleHeroAddToCart = () => {
    if (!heroSelectedSize) return;
    addToCart(currentHero, heroSelectedSize);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEmail(newsletterEmail);
    if (!validation.isValid) {
      setNewsletterStatus({
        type: 'error',
        message: validation.error || 'Please enter a valid email address.',
      });
      return;
    }

    setNewsletterStatus({
      type: 'success',
      message: 'ACCESS GRANTED // Priority raffle pass #KX-8891 sent to your inbox!',
    });
    setNewsletterEmail('');
    showToast('Syndicate membership registered');
  };

  return (
    <div className="tech-grid min-h-screen flex flex-col bg-[#060709] text-zinc-100 selection:bg-[#10ff60] selection:text-black">
      
      {/* Top Banner */}
      <div className="bg-black border-b border-white/10 px-3 sm:px-4 py-2 text-center text-xs tracking-wider text-zinc-400 font-mono">
        <span className="text-[#10ff60] font-bold mr-2">DROP // 04</span>
        <span className="hidden sm:inline">LIMITED RELEASE · WORLDWIDE EXPRESS DISPATCH · FREE SHIPPING OVER $200</span>
        <span className="sm:hidden text-[11px]">WORLDWIDE EXPRESS DISPATCH</span>
      </div>

      {/* Header with Mobile Left Hamburger Menu */}
      <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            {/* Mobile Left Hamburger Menu Button as explicitly requested */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-zinc-200 hover:text-[#10ff60] border border-white/20 hover:border-[#10ff60] bg-[#0c0e12] transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Brand Wordmark: Green Diamond + KINETIX.LAB */}
            <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
              <span className="w-3.5 h-3.5 bg-[#10ff60] transform rotate-45 inline-block group-hover:scale-110 transition-transform"></span>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-white">
                KINETIX<span className="text-[#10ff60]">.LAB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider uppercase text-zinc-300">
            <a href="#new-arrivals" className="hover:text-[#10ff60] transition-colors">NEW ARRIVALS</a>
            <a href="#innovations" className="hover:text-[#10ff60] transition-colors">INNOVATIONS</a>
            <a href="#ad-partner" className="hover:text-[#10ff60] transition-colors">PARTNER COLLAB</a>
            <a href="#newsletter" className="hover:text-[#10ff60] transition-colors">RAFFLE VIP</a>
          </nav>

          {/* Action buttons on the right */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/checkout"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 border border-white/20 hover:border-[#10ff60] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#10ff60]" />
              <span className="hidden sm:inline">CHECKOUT</span>
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-3.5 py-1.5 border border-white/20 hover:border-[#10ff60] bg-[#0c0e12] text-white transition-colors group"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-white group-hover:text-[#10ff60] transition-colors" />
              <span className="text-xs font-mono font-bold tracking-wider">BAG</span>
              <span className="px-1.5 py-0.5 text-xs font-mono font-bold bg-[#10ff60] text-black tabular-nums">
                {totals.itemCount}
              </span>
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER (Slides in from Left) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Left Drawer Panel */}
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-[#060709] border-r border-white/15 flex flex-col justify-between shadow-2xl z-50 animate-in slide-in-from-left duration-200">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0c0e12]">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 bg-[#10ff60] transform rotate-45 inline-block"></span>
                <span className="font-extrabold text-xl tracking-tighter text-white">
                  KINETIX<span className="text-[#10ff60]">.LAB</span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-zinc-400 hover:text-[#10ff60] border border-white/15 hover:border-[#10ff60] bg-[#12151b] transition-colors"
                aria-label="Close mobile navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Online Protocol Status */}
              <div className="p-3 bg-[#0c0e12] border border-[#10ff60]/20 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#10ff60] rounded-full animate-pulse"></span>
                  <span className="text-[#10ff60] font-bold">SYSTEM ONLINE</span>
                </div>
                <span className="text-zinc-500">DROP // 04</span>
              </div>

              {/* Quick Bag & Checkout Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="p-3 bg-[#12151b] hover:bg-[#181c24] border border-white/15 hover:border-[#10ff60] text-left transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400">YOUR BAG</div>
                    <div className="text-xs font-bold font-mono text-white mt-0.5">{totals.itemCount} ITEMS</div>
                  </div>
                  <ShoppingBag className="w-4 h-4 text-[#10ff60]" />
                </button>

                <Link
                  href="/checkout"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-3 bg-[#10ff60] hover:bg-white text-black transition-colors flex items-center justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase opacity-80">SECURE</div>
                    <div className="text-xs font-extrabold uppercase mt-0.5">CHECKOUT</div>
                  </div>
                  <Lock className="w-4 h-4 text-black" />
                </Link>
              </div>

              {/* Main Navigation Links */}
              <div>
                <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  SECTIONS NAVIGATION
                </div>
                <nav className="space-y-1.5 font-mono text-xs">
                  <a
                    href="#new-arrivals"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#0c0e12] hover:bg-[#12151b] border border-white/10 hover:border-[#10ff60] text-zinc-200 hover:text-[#10ff60] transition-colors"
                  >
                    <span className="font-bold">01 // NEW ARRIVALS</span>
                    <span className="text-[11px] text-[#10ff60] font-bold">8 SILHOUETTES →</span>
                  </a>

                  <a
                    href="#innovations"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#0c0e12] hover:bg-[#12151b] border border-white/10 hover:border-[#10ff60] text-zinc-200 hover:text-[#10ff60] transition-colors"
                  >
                    <span className="font-bold">02 // INNOVATIONS</span>
                    <span className="text-[11px] text-zinc-400">SPECS →</span>
                  </a>

                  <a
                    href="#ad-partner"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#0c0e12] hover:bg-[#12151b] border border-white/10 hover:border-[#10ff60] text-zinc-200 hover:text-[#10ff60] transition-colors"
                  >
                    <span className="font-bold">03 // PARTNER COLLAB</span>
                    <span className="text-[11px] text-zinc-400">TITAN-9 →</span>
                  </a>

                  <a
                    href="#newsletter"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between p-3 bg-[#0c0e12] hover:bg-[#12151b] border border-white/10 hover:border-[#10ff60] text-zinc-200 hover:text-[#10ff60] transition-colors"
                  >
                    <span className="font-bold">04 // RAFFLE VIP</span>
                    <span className="text-[11px] text-[#10ff60]">ACCESS →</span>
                  </a>
                </nav>
              </div>

              {/* Fast Category Filter Switcher */}
              <div>
                <div className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest mb-3">
                  FILTER BY CATEGORY
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {CATEGORIES.map(cat => {
                    const count = cat.id === 'all'
                      ? PRODUCTS.length
                      : PRODUCTS.filter(p => p.category === cat.id).length;
                    const isActive = activeCategory === cat.id;

                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setIsMobileMenuOpen(false);
                          const el = document.getElementById('new-arrivals');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`p-2.5 text-xs font-mono border text-left flex items-center justify-between transition-all ${
                          isActive
                            ? 'bg-[#10ff60] text-black border-[#10ff60] font-bold'
                            : 'bg-[#0c0e12] text-zinc-300 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 ${isActive ? 'bg-black text-[#10ff60]' : 'bg-[#181c24] text-zinc-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Drawer Bottom Info */}
            <div className="p-5 border-t border-white/10 bg-[#0c0e12] space-y-3">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>CURRENCY</span>
                <span className="text-white font-bold">USD ($) · GLOBAL</span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>DISPATCH STATUS</span>
                <span className="text-[#10ff60] font-bold">EXPRESS ACTIVE</span>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>KINETIX FOOTWEAR LAB</span>
                <span>TOKYO // BERLIN</span>
              </div>
            </div>

          </div>
        </div>
      )}

      <main className="flex-1">

        {/* HERO SECTION: EXACT DESIGN MATCHING USER SCREENSHOT image_bc128111.png */}
        <section id="hero" className="relative w-full min-h-[640px] md:min-h-[720px] lg:min-h-[760px] flex items-center overflow-hidden bg-black border-b border-white/10">
          
          {/* Full-bleed background with atmospheric green lasers and the tactical sneaker on the right */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero.jpg"
              alt="SPEED FORGED IN THE DARK - KINETIX flagship sneaker drop"
              fill
              priority
              sizes="100vw"
              className="object-cover object-right md:object-center filter brightness-95 contrast-110"
              referrerPolicy="no-referrer"
            />
            {/* Smooth left gradient overlay to guarantee razor-sharp typography readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 md:via-black/55 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
            <div className="max-w-2xl">
              
              {/* Mono Subtitle Tag matching screenshot */}
              <div className="text-xs font-mono font-bold tracking-widest text-[#10ff60] mb-4 uppercase">
                {heroIndex === 0
                  ? 'BATCH 04 // PROTO-SPEC · SPRING 2026'
                  : `BATCH 04 // ${currentHero.name} · ${currentHero.specs[0].toUpperCase()}`
                }
              </div>

              {/* Massive Headline matching screenshot */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6 text-balance">
                SPEED FORGED <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#10ff60]">
                  IN THE DARK.
                </span>
              </h1>

              {/* Subtitle description matching screenshot */}
              <p className="text-sm sm:text-base text-zinc-300 max-w-xl leading-relaxed mb-8 font-normal">
                {heroIndex === 0
                  ? 'Ballistic monofilament mesh, vacuum-formed carbon heel shanks, and responsive neon shock-pod cushioning. Designed for concrete terrain and zero compromises.'
                  : `${currentHero.subtitle}. Precision engineered with carbon fiber torque plates and high-velocity kinetic damping for concrete streets.`
                }
              </p>

              {/* Dual CTA Buttons matching screenshot: EXPLORE NEW ARRIVALS → and VIEW ARCHITECTURE [4] */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#new-arrivals"
                  className="px-7 py-4 bg-[#10ff60] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-2.5 shadow-[0_0_25px_rgba(16,255,96,0.35)] hover:shadow-white/30"
                >
                  <span>EXPLORE NEW ARRIVALS</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#innovations"
                  className="px-6 py-4 bg-black/80 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 hover:border-white transition-colors"
                >
                  VIEW ARCHITECTURE [4]
                </a>
              </div>

              {/* Step-by-Step Silhouette Controller for 5 Sneakers */}
              <div className="mt-10 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 max-w-xl bg-black/50 backdrop-blur-md p-3 border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="w-2 h-2 bg-[#10ff60] animate-pulse"></span>
                  <span className="text-[#10ff60] font-bold">HERO SHOWCASE:</span>
                  <span className="text-white">STEP 0{heroIndex + 1} / 05</span>
                  <span className="text-zinc-500">· {currentHero.name}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {heroProducts.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setHeroIndex(idx)}
                      className={`px-2.5 py-1 text-[11px] font-mono border transition-all ${
                        heroIndex === idx
                          ? 'bg-[#10ff60] text-black border-[#10ff60] font-bold shadow-[0_0_10px_rgba(16,255,96,0.4)]'
                          : 'bg-black/60 text-zinc-400 border-white/10 hover:border-white/30'
                      }`}
                    >
                      0{idx + 1}
                    </button>
                  ))}
                  <button
                    onClick={prevHeroSlide}
                    className="p-1 bg-black/60 hover:bg-[#12151b] border border-white/10 hover:border-[#10ff60] text-zinc-300"
                    aria-label="Previous silhouette"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={nextHeroSlide}
                    className="p-1 bg-black/60 hover:bg-[#12151b] border border-white/10 hover:border-[#10ff60] text-zinc-300"
                    aria-label="Next silhouette"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-40 h-1 bg-[#10ff60] shadow-[0_0_15px_#10ff60]"></div>
        </section>

        {/* FULL CATALOG GRID WITH DISTINCT CATEGORIES (8 SNEAKERS) */}
        <section id="new-arrivals" className="py-24 px-6 max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#10ff60] uppercase tracking-widest mb-2">
                <span>COLLECTION PROTOCOL</span>
                <span className="text-zinc-600">{'//'}</span>
                <span>8 EXPANDED SILHOUETTES</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white text-balance">
                COMPLETE SNEAKER LABORATORY
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
              <span className="inline-block w-2 h-2 bg-[#10ff60]"></span>
              <span>Hover any sneaker to inspect alternate angle</span>
            </div>
          </div>

          {/* Interactive Category Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4">
            <span className="text-xs font-mono text-zinc-500 mr-2 uppercase flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#10ff60]" />
              <span>FILTER CATEGORY:</span>
            </span>

            {CATEGORIES.map(cat => {
              const count = cat.id === 'all'
                ? PRODUCTS.length
                : PRODUCTS.filter(p => p.category === cat.id).length;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono border transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#10ff60] text-black border-[#10ff60] font-bold shadow-[0_0_15px_rgba(16,255,96,0.3)]'
                      : 'bg-[#0c0e12] hover:bg-[#12151b] text-zinc-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-none font-bold ${
                    isActive ? 'bg-black text-[#10ff60]' : 'bg-[#181c24] text-zinc-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 8 Sneaker Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => {
              const selectedSize = selectedSizes[product.id];
              const hasError = sizeErrors[product.id];
              const isFlipped = flippedCards[product.id] || false;

              return (
                <div
                  key={product.id}
                  className="product-card bg-[#0c0e12] border border-white/10 hover:border-[#10ff60] transition-all duration-300 flex flex-col group"
                >
                  
                  {/* Sneaker Image Box with Smooth Hover Reveal & Mobile Tap Flip */}
                  <div
                    onClick={() => setFlippedCards(prev => ({ ...prev, [product.id]: !prev[product.id] }))}
                    className="relative w-full aspect-[4/3] bg-[#060709] overflow-hidden border-b border-white/10 cursor-pointer"
                  >
                    
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2 py-1 bg-black/80 border border-[#10ff60]/40 text-[10px] font-mono font-bold text-[#10ff60] uppercase tracking-widest">
                        {product.tag || 'RELEASE'}
                      </span>
                    </div>

                    {/* Main Image */}
                    <Image
                      src={product.mainImage}
                      alt={`${product.name} primary angle`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className={`object-cover transition-opacity duration-300 ease-in-out ${
                        isFlipped ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Hover Image */}
                    <Image
                      src={product.hoverImage}
                      alt={`${product.name} secondary angle`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className={`object-cover transition-opacity duration-300 ease-in-out ${
                        isFlipped ? 'opacity-100 scale-105' : 'opacity-0 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {/* Mobile Tap-to-Flip / Desktop Hover Badge */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFlippedCards(prev => ({ ...prev, [product.id]: !prev[product.id] }));
                      }}
                      className="absolute bottom-2 right-2 z-20 bg-black/90 hover:bg-[#10ff60] text-zinc-300 hover:text-black border border-white/20 hover:border-[#10ff60] px-2 py-0.5 text-[10px] font-mono flex items-center gap-1 transition-colors"
                      title="Tap to switch angle"
                    >
                      <RefreshCw className="w-2.5 h-2.5 text-[#10ff60] group-hover:text-black" />
                      <span>{isFlipped ? 'ANGLE 02' : 'FLIP ANGLE'}</span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-1 truncate">
                        {product.subtitle}
                      </div>
                      <h3 className="font-bold text-lg text-white group-hover:text-[#10ff60] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-baseline justify-between mt-2 mb-4">
                        <span className="text-xs font-mono text-zinc-400">RETAIL</span>
                        <span className="text-lg font-mono font-bold text-white tabular-nums">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Size Selector UI */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                          <span>SELECT SIZE (US)</span>
                          <span className={`font-bold ${selectedSize ? 'text-[#10ff60]' : 'text-zinc-500'}`}>
                            {selectedSize || 'CHOOSE'}
                          </span>
                        </div>

                        <div className="grid grid-cols-5 gap-1.5">
                          {product.sizes.map(size => {
                            const isSelected = selectedSize === size;
                            return (
                              <button
                                key={size}
                                type="button"
                                onClick={() => handleSelectSize(product.id, size)}
                                className={`py-1.5 text-xs font-mono border transition-all ${
                                  isSelected
                                    ? 'bg-[#10ff60] text-black border-[#10ff60] font-bold shadow-[0_0_10px_rgba(16,255,96,0.3)]'
                                    : 'bg-[#12151b] hover:bg-[#181c24] text-zinc-300 border-white/10 hover:border-[#10ff60]'
                                }`}
                              >
                                {size.replace('US ', '')}
                              </button>
                            );
                          })}
                        </div>

                        {hasError && (
                          <div className="flex items-center gap-1.5 text-[11px] font-mono text-red-400 mt-2">
                            <AlertCircle className="w-3 h-3" />
                            <span>Select size first</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Add to Bag Button */}
                    <button
                      type="button"
                      onClick={() => handleCardAddToCart(product)}
                      className="w-full py-2.5 bg-white hover:bg-[#10ff60] text-black font-extrabold text-xs uppercase tracking-wider transition-colors duration-200 mt-2 flex items-center justify-center gap-2"
                    >
                      <span>ADD TO BAG</span>
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </section>

        {/* AD PLACEHOLDER SECTION */}
        <section id="ad-spotlight" className="max-w-7xl mx-auto px-6 mb-24">
          <div className="relative bg-[#0c0e12] border border-dashed border-[#10ff60]/40 p-6 md:p-8 overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-[#10ff60]"></span>
                <span className="text-[#10ff60] font-bold">ADVERTISEMENT // PARTNER COLLABORATION</span>
              </div>
              <span>SLOT: 728×90 / LEADERBOARD RESPONSIVE</span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-black border border-[#10ff60] flex items-center justify-center shrink-0">
                  <span className="font-black text-[#10ff60] text-2xl tracking-tighter">NX9</span>
                </div>
                <div>
                  <div className="text-xs font-mono text-[#10ff60] font-bold uppercase tracking-wider">
                    CYBERGRIP™ LABS × KINETIX
                  </div>
                  <h4 className="text-xl font-bold text-white uppercase tracking-tight">
                    TITAN-9 BIOMECHANICAL CARBON ARCH ADAPTERS
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                    High-modulus carbon propulsion inserts compatible with all Batch 04 silhouettes. Maximizes kinetic energy rebound across asphalt.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="#newsletter"
                  className="px-5 py-2.5 bg-[#10ff60] hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  SPONSOR ACCESS
                </a>
                <span className="text-[10px] font-mono text-zinc-500 border border-white/10 px-2 py-1">
                  AD ID #892-ADV
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* INNOVATIONS SECTION */}
        <section id="innovations" className="py-20 bg-[#0c0e12] border-y border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="max-w-2xl mb-12">
              <div className="text-xs font-mono font-bold text-[#10ff60] uppercase tracking-widest mb-2">
                ENGINEERING SPECS
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                BUILT FOR HIGH-VELOCITY IMPACT
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#060709] p-6 border border-white/10 hover:border-white/20 transition-colors">
                <div className="font-mono text-[#10ff60] text-xl font-bold mb-3">01 // CARBON TORQUE</div>
                <h4 className="text-lg font-bold text-white mb-2">TORSIONAL RIGIDITY</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Full-length 3K aerospace-grade carbon fiber shank transfers kinetic propulsion across the stride while preventing sole twisting.
                </p>
              </div>

              <div className="bg-[#060709] p-6 border border-white/10 hover:border-white/20 transition-colors">
                <div className="font-mono text-[#10ff60] text-xl font-bold mb-3">02 // REACTIVE AIR</div>
                <h4 className="text-lg font-bold text-white mb-2">NEON DAMPENING PODS</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Pressurized nitrogen cells tuned to absorb 94% of shock forces during hard concrete heel-strike transitions.
                </p>
              </div>

              <div className="bg-[#060709] p-6 border border-white/10 hover:border-white/20 transition-colors">
                <div className="font-mono text-[#10ff60] text-xl font-bold mb-3">03 // VIBRAM ACID TREAD</div>
                <h4 className="text-lg font-bold text-white mb-2">HIGH-TRACTION SOLE</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Lug density engineered for multi-surface friction in wet city asphalt, steep ramps, and urban industrial terrain.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* NEWSLETTER SUBSCRIPTION FORM SECTION */}
        <section id="newsletter" className="py-24 px-6 border-b border-white/10 relative overflow-hidden bg-[#060709]">
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#10ff60]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0c0e12] border border-[#10ff60]/30 text-[#10ff60] font-mono text-xs uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 bg-[#10ff60] rounded-full animate-ping"></span>
              <span>SYNDICATE VIP ACCESS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight mb-4 text-balance">
              NEVER MISS A LIMITED DROP
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
              Join our unlisted dispatch list. Receive release coordinates, raffle pass codes, and private drop invitations 15 minutes before public launch.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto" noValidate>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <label htmlFor="newsletter-email-input" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email-input"
                    type="email"
                    value={newsletterEmail}
                    onChange={e => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus.type !== 'idle') {
                        setNewsletterStatus({ type: 'idle', message: '' });
                      }
                    }}
                    placeholder="ENTER EMAIL ADDRESS..."
                    className="w-full px-4 py-3.5 bg-[#0c0e12] border border-white/20 text-white placeholder-zinc-500 font-mono text-xs tracking-wider focus:outline-none focus:border-[#10ff60] focus:ring-1 focus:ring-[#10ff60] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#10ff60] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shrink-0 shadow-[0_0_15px_rgba(16,255,96,0.3)] hover:shadow-white/20"
                >
                  JOIN SYNDICATE
                </button>
              </div>

              {newsletterStatus.type === 'error' && (
                <div className="mt-3 text-xs font-mono text-red-400 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{newsletterStatus.message}</span>
                </div>
              )}

              {newsletterStatus.type === 'success' && (
                <div className="mt-3 text-xs font-mono text-[#10ff60] font-bold flex items-center justify-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>{newsletterStatus.message}</span>
                </div>
              )}

              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-mono text-zinc-500">
                <span>· Zero Spam Guarantee</span>
                <span>· Instant Confirmation</span>
                <span>· Unsubscribe Anytime</span>
              </div>
            </form>

          </div>
        </section>

      </main>

      {/* CART SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#060709] border-l border-white/10 flex flex-col justify-between shadow-2xl">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 bg-[#10ff60]"></span>
                  <h3 className="font-extrabold text-xl text-white tracking-tight">YOUR BAG</h3>
                  <span className="px-2 py-0.5 text-xs font-mono bg-[#12151b] text-[#10ff60] border border-[#10ff60]/30 tabular-nums">
                    {totals.itemCount} ITEMS
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-zinc-400 hover:text-white p-2"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 text-center">
                    <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                    <p className="text-zinc-400 uppercase text-sm font-bold mb-2">YOUR BAG IS EMPTY</p>
                    <p className="text-xs text-zinc-600 font-mono">Select a sneaker & size to reserve your pair.</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div
                      key={`${item.productId}-${item.size}`}
                      className="flex items-center gap-4 bg-[#0c0e12] border border-white/10 p-3"
                    >
                      <div className="relative w-16 h-16 bg-black border border-white/10 shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-white uppercase truncate">{item.name}</h4>
                        <div className="text-[11px] font-mono text-[#10ff60] font-semibold mt-0.5">
                          SIZE: {item.size}
                        </div>
                        <div className="text-xs font-mono text-zinc-300 mt-1 tabular-nums">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center border border-white/20">
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, -1)}
                            className="px-2 py-0.5 text-xs font-mono text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-mono text-white font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.size, 1)}
                            className="px-2 py-0.5 text-xs font-mono text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size)}
                          className="text-[10px] font-mono text-zinc-500 hover:text-red-400 transition-colors"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with Link to Checkout */}
              <div className="p-6 border-t border-white/10 bg-[#0c0e12] space-y-4">
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>SUBTOTAL</span>
                    <span className="text-white font-bold tabular-nums">${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>ESTIMATED SHIPPING</span>
                    <span className="text-[#10ff60]">
                      {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>TOTAL</span>
                    <span className="text-[#10ff60] font-mono tabular-nums">${totals.total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 bg-[#10ff60] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_-3px_rgba(16,255,96,0.4)]"
                >
                  <span>PROCEED TO SECURE CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="text-[10px] font-mono text-zinc-500 text-center">
                  256-BIT ENCRYPTION · PROMO CODES ACCEPTED IN CHECKOUT
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0c0e12] border border-[#10ff60] text-white px-5 py-3 shadow-[0_0_20px_-3px_rgba(16,255,96,0.45)] flex items-center gap-3 font-mono text-xs animate-in fade-in slide-in-from-bottom-4 duration-200">
          <span className="w-2 h-2 bg-[#10ff60]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#060709] border-t border-white/10 relative overflow-hidden">
        
        {/* RUNNING MARQUEE STREET TICKER */}
        <div className="border-b border-white/10 bg-[#0c0e12] py-3.5 overflow-hidden select-none">
          <div className="flex items-center gap-8 whitespace-nowrap text-xs font-mono font-bold tracking-widest text-zinc-400">
            <span className="text-[#10ff60]">{'///'} LIMITED DROP PROTOCOL</span>
            <span className="text-zinc-600">{'//'}</span>
            <span>WORLDWIDE EXPRESS AIR DISPATCH</span>
            <span className="text-zinc-600">{'//'}</span>
            <span className="text-[#10ff60]">NFC CRYPTOGRAPHIC AUTHENTICITY</span>
            <span className="text-zinc-600">{'//'}</span>
            <span>ZERO GRAVITY REBOUND DAMPENING</span>
            <span className="text-zinc-600">{'//'}</span>
            <span className="text-[#10ff60]">CARBON FIBER TORQUE INTEGRITY</span>
            <span className="text-zinc-600">{'//'}</span>
            <span>256-BIT ENCRYPTED VAULT CHECKOUT</span>
            <span className="text-zinc-600">{'//'}</span>
            <span className="text-[#10ff60]">BATCH 04 // PROTOCOL RUNNING</span>
          </div>
        </div>

        {/* 4 TRUST PILLARS BANNER */}
        <div className="max-w-7xl mx-auto px-6 py-12 border-b border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-start gap-4 p-4 bg-[#0c0e12] border border-white/10 hover:border-[#10ff60]/50 transition-colors">
              <div className="p-2.5 bg-black border border-white/10 text-[#10ff60] shrink-0">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                  EXPRESS DISPATCH
                </h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Worldwide priority air shipping with live satellite tracking. Free on orders over $200.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#0c0e12] border border-white/10 hover:border-[#10ff60]/50 transition-colors">
              <div className="p-2.5 bg-black border border-white/10 text-[#10ff60] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                  100% VERIFIED AUTHENTIC
                </h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Every silhouette is physically inspected, serialized, and sealed with tamper-proof tags.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#0c0e12] border border-white/10 hover:border-[#10ff60]/50 transition-colors">
              <div className="p-2.5 bg-black border border-white/10 text-[#10ff60] shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                  256-BIT ENCRYPTION
                </h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  Military-grade checkout accepting Credit Card, Apple Pay, Google Pay, and Cash on Delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-[#0c0e12] border border-white/10 hover:border-[#10ff60]/50 transition-colors">
              <div className="p-2.5 bg-black border border-white/10 text-[#10ff60] shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">
                  CARBON INTEGRITY
                </h5>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
                  30-day wear trial and structural warranty against midsole and carbon plate fracture.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* PRIMARY FOOTER GRID */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand, Manifesto & Socials (Span 2 cols on lg) */}
            <div className="lg:col-span-2 space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#10ff60] shadow-[0_0_10px_#10ff60]"></span>
                <span className="font-black text-2xl tracking-tighter text-white">
                  KINETIX<span className="text-[#10ff60] font-mono">.LAB</span>
                </span>
              </div>

              <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-sans">
                Experimental technical footwear laboratory based in Neo-Tokyo and Berlin. Engineering high-velocity silhouettes with aerospace carbon fiber and brutalist design language for modern urban subcultures.
              </p>

              <div className="p-3 bg-[#0c0e12] border border-white/10 font-mono text-[11px] space-y-1">
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="w-1.5 h-1.5 bg-[#10ff60] rounded-full animate-ping"></span>
                  <span className="text-[#10ff60] font-bold">LAB STATUS: ONLINE</span>
                </div>
                <div className="text-zinc-500">
                  TOKYO: 35.6762° N, 139.6503° E
                </div>
                <div className="text-zinc-500">
                  BERLIN: 52.5200° N, 13.4050° E
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                  COMMUNITY FREQUENCIES
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0c0e12] hover:bg-[#10ff60] hover:text-black text-zinc-300 border border-white/10 hover:border-[#10ff60] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0c0e12] hover:bg-[#10ff60] hover:text-black text-zinc-300 border border-white/10 hover:border-[#10ff60] transition-colors"
                    aria-label="Twitter X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 bg-[#0c0e12] hover:bg-[#10ff60] hover:text-black text-zinc-300 border border-white/10 hover:border-[#10ff60] transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="px-3 py-2 bg-[#0c0e12] hover:bg-[#10ff60] hover:text-black text-zinc-300 border border-white/10 hover:border-[#10ff60] font-mono text-[11px] font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>DISCORD</span>
                    <span className="text-[9px] text-[#10ff60] group-hover:text-black">● 4.2K</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: Collections & Silhouettes */}
            <div>
              <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#10ff60] pl-2">
                COLLECTIONS
              </h5>
              <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
                {CATEGORIES.slice(1).map(c => (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        setActiveCategory(c.id);
                        document.getElementById('new-arrivals')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-[#10ff60] transition-colors text-left flex items-center gap-1.5"
                    >
                      <span className="text-zinc-600">›</span>
                      <span>{c.label}</span>
                    </button>
                  </li>
                ))}
                <li>
                  <a href="#new-arrivals" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>All 8 Silhouettes</span>
                  </a>
                </li>
                <li>
                  <a href="#newsletter" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span className="text-[#10ff60]">VIP Syndicate Raffle</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Client Assistance & Gateway */}
            <div>
              <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#10ff60] pl-2">
                CLIENT SERVICES
              </h5>
              <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
                <li>
                  <Link href="/checkout" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span className="text-white font-bold">Checkout Terminal</span>
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Consignment Tracking</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Sizing & Measurement</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Authenticity Registry</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Worldwide Shipping Rates</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>30-Day Wear Guarantee</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Laboratory & Atelier */}
            <div>
              <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#10ff60] pl-2">
                THE LABORATORY
              </h5>
              <ul className="space-y-2.5 text-xs text-zinc-400 font-mono">
                <li>
                  <a href="#innovations" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Engineering Specs</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Carbon Fiber Shank R&D</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Tokyo Flagship (Shibuya)</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Berlin Atelier (Mitte)</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Press Lookbook 2026</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#10ff60] transition-colors flex items-center gap-1.5">
                    <span className="text-zinc-600">›</span>
                    <span>Join The Syndicate</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* MASSIVE STREETWEAR OUTLINED WATERMARK */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none opacity-[0.04] text-center">
          <div className="text-[120px] sm:text-[180px] lg:text-[230px] font-black uppercase tracking-tighter text-white leading-none whitespace-nowrap">
            KINETIX LABS
          </div>
        </div>

        {/* BOTTOM LEGAL & PAYMENT METHOD BAR */}
        <div className="border-t border-white/10 bg-[#08090c] py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Copyright & Legal */}
            <div className="flex flex-col sm:flex-row items-center gap-3 text-xs font-mono text-zinc-500 text-center sm:text-left">
              <span>© 2026 KINETIX FOOTWEAR LABS INC.</span>
              <span className="hidden sm:inline text-zinc-700">|</span>
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-zinc-300 transition-colors">PRIVACY</a>
                <span>·</span>
                <a href="#" className="hover:text-zinc-300 transition-colors">TERMS OF DISPATCH</a>
                <span>·</span>
                <a href="#" className="hover:text-zinc-300 transition-colors">SECURITY</a>
              </div>
            </div>

            {/* Center: Accepted Payments Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono font-bold">
              <span className="px-2 py-1 bg-[#0c0e12] border border-white/10 text-zinc-300">VISA</span>
              <span className="px-2 py-1 bg-[#0c0e12] border border-white/10 text-zinc-300">MASTERCARD</span>
              <span className="px-2 py-1 bg-[#0c0e12] border border-white/10 text-zinc-300">AMEX</span>
              <span className="px-2 py-1 bg-[#0c0e12] border border-[#10ff60]/30 text-[#10ff60]">APPLE PAY</span>
              <span className="px-2 py-1 bg-[#0c0e12] border border-white/10 text-zinc-300">GOOGLE PAY</span>
              <span className="px-2 py-1 bg-[#0c0e12] border border-white/10 text-zinc-300">PAYPAL</span>
              <span className="px-2 py-1 bg-[#0c0e12] border border-white/10 text-zinc-300">COD</span>
            </div>

            {/* Right: Region Selector & Smooth Back-To-Top Button */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0c0e12] border border-white/10 text-zinc-400 font-mono text-[11px]">
                <Globe className="w-3.5 h-3.5 text-[#10ff60]" />
                <span>GLOBAL / USD ($)</span>
              </div>

              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0c0e12] hover:bg-[#10ff60] hover:text-black border border-white/10 hover:border-[#10ff60] text-zinc-300 font-mono text-[11px] font-bold transition-all"
                aria-label="Back to top"
              >
                <span>TOP</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </footer>

      {/* Floating Back To Top Button for Mobile & Desktop */}
      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 bg-[#0c0e12]/90 hover:bg-[#10ff60] text-zinc-300 hover:text-black border border-white/20 hover:border-[#10ff60] w-10 h-10 flex items-center justify-center transition-all shadow-xl backdrop-blur-md group"
        aria-label="Scroll back to top"
        title="Back to top"
      >
        <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
      </button>

    </div>
  );
}
