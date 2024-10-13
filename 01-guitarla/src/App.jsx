import { useEffect } from 'react';
import { useState } from 'react';
import { Guitar } from 'src/components/Guitar';
import { Header } from 'src/components/Header';
import { db } from 'src/data/db';

function App() {
  //Extraer datos del localStorage
  const initialCart = () => {
    const storageCart = (localStorage.getItem('cart'));
    return storageCart ? JSON.parse(storageCart) : [];
  };
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

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

  return (
    <>
      <Header
        cart={cart}
        onDeleteCart={onDeleteCart}
        increaseCuantity={increaseCuantity}
        decreaseCuantity={decreaseCuantity}
        clearCart={clearCart}
      />

      <main className='container-xl mt-5'>
        <h2 className='text-center'>Nuestra Colección</h2>

        <div className='row mt-5'>
          {data.map((item) => (
            <Guitar
              key={item.id}
              item={item}
              onAddCart={onAddCart}
            />
          ))}
        </div>
      </main>

      <footer className='bg-dark mt-5 py-5'>
        <div className='container-xl'>
          <p className='fs-4 m-md-0 mt-4 text-center text-white'>
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
