import { ActionFunctionArgs, Link, useLoaderData } from 'react-router-dom';
import { getProducts, updateAvailability } from 'services/product.service';
import { Product } from 'types';
import ProductDetail from 'views/ProductDetail';
export async function loader() {
  const products = await getProducts();
  return products;
}
export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  await updateAvailability(+data.id);

  return {};
}
function Products() {
  const products = useLoaderData() as Product[];
  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-2xl font-black text-slate-500'>Productos</h2>
        <Link
          className='button button-primary'
          to='producto/nuevo'
        >
          Agregar Producto
        </Link>
      </div>
      <div className='p-2'>
        <table className='mt-5 w-full table-auto'>
          <thead className='bg-slate-800 text-white'>
            <tr>
              <th className='p-2'>Producto</th>
              <th className='p-2'>Precio</th>
              <th className='p-2'>Disponibilidad</th>
              <th className='p-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductDetail
                product={product}
                key={product.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
