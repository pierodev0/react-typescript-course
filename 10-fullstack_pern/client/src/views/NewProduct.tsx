import ErrorMessage from 'components/ErrorMessage';
import ProductForm from 'components/ProductForm';
import { ActionFunctionArgs, Form, Link, redirect, useActionData } from 'react-router-dom';
import { addProduct } from 'services/product.service';

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = '';
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if (error.length) return error;
  await addProduct(data);
  return redirect('/');
}

function NewProduct() {
  const error = useActionData() as string;
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-black text-slate-500'>Agregar Producto</h2>
        <Link
          className='button'
          to='/'
        >
          Volver a Productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form
        className='mt-10'
        method='post'
      >
        <ProductForm />
        <input
          type='submit'
          className='button button-primary'
          value='Registrar Producto'
        />
      </Form>
    </>
  );
}

export default NewProduct;
