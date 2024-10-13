import { Guitar } from "components/Guitar";
import { Header } from "components/Header";
import { useCart } from "hooks/useCart";

function App() {
  const {
    data,
    cart,
    onDeleteCart,
    increaseCuantity,
    decreaseCuantity,
    clearCart,
    onAddCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    <>
      <Header
        cart={cart}
        onDeleteCart={onDeleteCart}
        increaseCuantity={increaseCuantity}
        decreaseCuantity={decreaseCuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
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
