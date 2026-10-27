'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
const KEY = 'rapoteque-cart-v1';

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const items = raw ? JSON.parse(raw) : [];
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    setItems(read());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable: cart lives in memory for this visit */
    }
  }, [items, ready]);

  const add = useCallback((item) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.slug === item.slug && p.color === item.color && p.size === item.size);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: Math.min(10, next[i].qty + (item.qty || 1)) };
        return next;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
    setLastAdded({ ...item, at: Date.now() });
  }, []);

  const setQty = useCallback((index, qty) => {
    setItems((prev) => {
      const next = [...prev];
      if (qty <= 0) next.splice(index, 1);
      else next[index] = { ...next[index], qty: Math.min(10, qty) };
      return next;
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return { items, ready, count, subtotal, add, setQty, clear, lastAdded };
  }, [items, ready, add, setQty, clear, lastAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
