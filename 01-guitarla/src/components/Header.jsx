import { useMemo } from 'react';

export const Header = ({
  cart,
  onDeleteCart,
  increaseCuantity,
  decreaseCuantity,
  clearCart,
}) => {
  //State derivado
  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((prev, item) => prev + item.quantity * item.price, 0),
    [cart],
  );
  return (
    <header className='header py-5'>
      <div className='container-xl'>
        <div className='row justify-content-center justify-content-md-between'>
          <div className='col-8 col-md-3'>
            <a href='index.html'>
              <img
                className='img-fluid'
                src='/img/logo.svg'
                alt='imagen logo'
              />
            </a>
          </div>
          <nav className='col-md-6 a d-flex align-items-start justify-content-end mt-5'>
            <div className='carrito'>
              <img
                className='img-fluid'
                src='/img/carrito.png'
                alt='imagen carrito'
              />

              <div
                id='carrito'
                className='bg-white p-3'
              >
                {isEmpty ? (
                  <p className='text-center'>El carrito esta vacio</p>
                ) : (
                  <>
                    <table className='w-100 table'>
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                className='img-fluid'
                                src='/img/guitarra_02.jpg'
                                alt='imagen guitarra'
                              />
                            </td>
                            <td>{item.name}</td>
                            <td className='fw-bold'>${item.price}</td>
                            <td className='align-items-start flex gap-4'>
                              <button
                                type='button'
                                className='btn btn-dark'
                                onClick={() => decreaseCuantity(item.id)}
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                type='button'
                                className='btn btn-dark'
                                onClick={() => increaseCuantity(item.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className='btn btn-danger'
                                type='button'
                                onClick={() => onDeleteCart(item.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className='text-end'>
                      Total pagar: <span className='fw-bold'>${cartTotal}</span>
                    </p>
                  </>
                )}

                <button
                  className='btn btn-dark w-100 mt-3 p-2'
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
