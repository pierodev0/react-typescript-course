export const Guitar = ({ item, onAddCart }) => {
  const { name, image, description, price } = item;

  return (
    <div className='col-md-6 col-lg-4 row align-items-center my-4'>
      <div className='col-4'>
        <img
          className='img-fluid'
          src={`/img/${image}.jpg`}
          alt='imagen guitarra'
        />
      </div>
      <div className='col-8'>
        <h3 className='fs-4 fw-bold text-uppercase text-black'>{name}</h3>
        <p>{description}</p>
        <p className='fw-black text-primary fs-3'>${price}</p>
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
