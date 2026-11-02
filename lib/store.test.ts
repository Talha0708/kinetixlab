import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateEmail,
  validateCoupon,
  calculateCartTotals,
  filterProductsByCategory,
  validateCheckoutForm,
  addToCart,
  PRODUCTS,
  type CartItem,
  type CheckoutFormData,
} from './store';

test('filterProductsByCategory returns correct filtered items', () => {
  assert.equal(filterProductsByCategory(PRODUCTS, 'all').length, 8);
  assert.equal(filterProductsByCategory(PRODUCTS, 'high-tops').length, 2);
  assert.equal(filterProductsByCategory(PRODUCTS, 'runners').length, 3);
  assert.equal(filterProductsByCategory(PRODUCTS, 'trail').length, 2);
  assert.equal(filterProductsByCategory(PRODUCTS, 'minimalist').length, 1);
});

test('validateCoupon applies 20% discount or fixed $30 credit', () => {
  const c1 = validateCoupon('NEON20', 200);
  assert.equal(c1.isValid, true);
  assert.equal(c1.discount, 40);

  const c2 = validateCoupon('SYNDICATE', 260);
  assert.equal(c2.isValid, true);
  assert.equal(c2.discount, 30);

  const c3 = validateCoupon('FAKE99', 200);
  assert.equal(c3.isValid, false);
});

test('calculateCartTotals incorporates shipping methods and discounts', () => {
  const items: CartItem[] = [
    {
      productId: 'volt-strike',
      name: 'VOLT STRIKE HI-TOP',
      size: 'US 10',
      price: 260,
      image: '/images/sneaker1-main.jpg',
      quantity: 1,
    },
  ];

  // Standard shipping free over 200
  const totals1 = calculateCartTotals(items, { shippingMethod: 'standard', discount: 40 });
  assert.equal(totals1.subtotal, 260);
  assert.equal(totals1.discount, 40);
  assert.equal(totals1.shipping, 0);
  assert.equal(totals1.total, 220);

  // Express overnight is $15
  const totals2 = calculateCartTotals(items, { shippingMethod: 'express', discount: 0 });
  assert.equal(totals2.shipping, 15);
  assert.equal(totals2.total, 275);
});

test('validateCheckoutForm enforces required fields for cards', () => {
  const incompleteForm: CheckoutFormData = {
    fullName: '',
    email: 'bad-email',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'USA',
    shippingMethod: 'standard',
    paymentMethod: 'card',
  };

  const result = validateCheckoutForm(incompleteForm);
  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.address);
  assert.ok(result.errors.cardNumber);

  const completeForm: CheckoutFormData = {
    fullName: 'Takeshi Kovacs',
    email: 'takeshi@cybernetix.io',
    phone: '+1 415 555 0199',
    address: '88 Cyberpunk Way, Sector 4',
    city: 'Neo-Tokyo',
    postalCode: '100-0001',
    country: 'Japan',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '4242 4242 4242 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
  };

  const validResult = validateCheckoutForm(completeForm);
  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});
