import { db } from 'data/db';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import type { CartItem, Guitar } from 'types';

export const useCart = () => {
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  //Extraer datos del localStorage
  const initialCart = (): CartItem[] => {
    const storageCart = localStorage.getItem('cart');
    return storageCart ? JSON.parse(storageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  //Escribir en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const onAddCart = (item: Guitar) => {
    const itemExists = cart.findIndex((obj) => obj.id === item.id);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const newCart = [...cart];
      newCart[itemExists].quantity += 1;
      setCart(newCart);
    } else {
      //Castear
      const newItem: CartItem = { ...item, quantity: 1 };
      setCart([...cart, newItem]);
    }
  };

  const onDeleteCart = (id: Guitar['id']) => {
    setCart(cart.filter((obj) => obj.id !== id));
  };

  const increaseCuantity = (id: Guitar['id']) => {
    const updatedCar = cart.map((item) => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCart(updatedCar);
  };

  const decreaseCuantity = (id : Guitar['id']) => {
    const updatedCar = cart.map((item) => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCart(updatedCar);
  };

  const clearCart = () => {
    setCart([]);
  };

  //State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((prev, item) => prev + item.quantity * item.price, 0),
    [cart],
  );

  return {
    data,
    cart,
    onAddCart,
    onDeleteCart,
    increaseCuantity,
    decreaseCuantity,
    clearCart,
    isEmpty,
    cartTotal,
  };
};
