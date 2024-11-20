import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from 'react-router-dom';
import { deleteProduct } from 'services/product.service';
import { Product } from 'types';
import { formatCurrency } from 'utils';
export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect('/');
  }
}
function ProductDetail({ product }: { product: Product }) {
  const fetcher = useFetcher();
  const navigate = useNavigate();
  return (
    <tr className='border-b'>
      <td className='p-3 text-lg text-gray-800'>{product.name}</td>
      <td className='p-3 text-lg text-gray-800'>{formatCurrency(product.price)}</td>
      <td className='p-3 text-lg text-gray-800'>
        <fetcher.Form method='POST'>
          <button
            type='submit'
            name='id'
            value={product.id}
            className={`${product.availability ? 'text-black' : 'text-red-600'} button border-black-100 w-full border`}
          >
            {product.availability ? 'Disponible' : 'No disponible'}
          </button>
        </fetcher.Form>
      </td>
      <td className='p-3 text-lg text-gray-800'>
        <div className='flex items-center gap-2'>
          <button
            className='button button-primary w-full'
            onClick={() => navigate(`producto/${product.id}/editar`)}
          >
            Editar
          </button>
          <Form
            className='w-full'
            method='POST'
            action={`producto/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm('¿Eliminar?')) {
                e.preventDefault();
              }
            }}
          >
            <input
              type='submit'
              value='Eliminar'
              className='button button-delete w-full'
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}

export default ProductDetail;
