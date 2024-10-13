import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { db } from 'src/data/db';

export const useCart = () => {
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  //Extraer datos del localStorage
  const initialCart = () => {
    const storageCart = localStorage.getItem('cart');
    return storageCart ? JSON.parse(storageCart) : [];
  };

  const [data] = useState(db);
  const [cart, setCart] = useState(initialCart);

  //Escribir en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const onAddCart = (item) => {
    const itemExists = cart.findIndex((obj) => obj.id === item.id);

    if (itemExists >= 0) {
      if (cart[itemExists].quantity >= MAX_ITEMS) return;
      const newCart = [...cart];
      newCart[itemExists].quantity += 1;
      setCart(newCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  };

  const onDeleteCart = (id) => {
    setCart(cart.filter((obj) => obj.id !== id));
  };

  const increaseCuantity = (id) => {
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

  const decreaseCuantity = (id) => {
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
    // localStorage.setItem("cart","");
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
    cartTotal
  };
};
