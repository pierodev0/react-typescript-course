import ErrorMessage from 'components/ErrorMessage';
import ProductForm from 'components/ProductForm';
import {
  ActionFunctionArgs,
  Form,
  Link,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
} from 'react-router-dom';
import { getProductById, updateProduct } from 'services/product.service';
import { Product } from 'types';
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(Number(params.id));
    if (!product) {
      return redirect('/');
    }
    return product;
  }
}
export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  let error = '';
  if (Object.values(data).includes('')) {
    error = 'Todos los campos son obligatorios';
  }
  if (error.length) return error;

  await updateProduct(data, Number(params.id));
  return redirect('/');
}
const availabilityOptions = [
  { name: 'Disponible', value: true },
  { name: 'No Disponible', value: false },
];
function EditProduct() {
  const product = useLoaderData() as Product;
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
        <ProductForm product={product} />

        <div className='mb-4'>
          <label
            className='text-gray-800'
            htmlFor='availability'
          >
            Disponibilidad:
          </label>
          <select
            id='availability'
            className='mt-2 block w-full bg-gray-50 p-3'
            name='availability'
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option
                key={option.name}
                value={option.value.toString()}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type='submit'
          className='button button-primary'
          value='Editar Producto'
        />
      </Form>
    </>
  );
}

export default EditProduct;
