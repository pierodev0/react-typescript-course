import type { Guitar } from 'types';

type GuitarProps = {
  item: Guitar;
  onAddCart: (item: Guitar) => void;
};

const Guitar = ({ item, onAddCart }: GuitarProps) => {
  return (
    <div className='col-md-6 col-lg-4 row align-items-center my-4'>
      <div className='col-4'>
        <img
          className='img-fluid'
          src={`/img/${item.image}.jpg`}
          alt='imagen guitarra'
        />
      </div>
      <div className='col-8'>
        <h3 className='fs-4 fw-bold text-uppercase text-black'>{}</h3>
        <p>{item.description}</p>
        <p className='fw-black text-primary fs-3'>${item.price}</p>
        <button
          type='button'
          className='btn btn-dark w-100'
          onClick={() => onAddCart(item)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export { Guitar };
