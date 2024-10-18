import { formatCurrency } from 'helpers';
import { Dispatch } from 'react';
import { OrderActions } from 'reducers/order-reducer';
import { OrderItem } from 'types';

type OrderContentsProps = {
  order: OrderItem[];
  dispatch: Dispatch<OrderActions>;
};
const OrderContents = ({ order, dispatch }: OrderContentsProps) => {
  return (
    <div className='space-y-4'>
      <div className=''>
        {order.map((item) => (
          <article
            className='flex items-center justify-between border-t-2 py-3 outline-gray-300 last:border-b-2'
            key={item.id}
          >
            <div className=''>
              <p className='text-lg'>
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className='font-black'>
                Cantidad: {item.quantity} - {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            <button
              className='size-8 rounded-full bg-red-500 text-white transition hover:opacity-70'
              onClick={() => dispatch({ type: 'remove-item', payload: { id: item.id } })}
            >
              x
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default OrderContents;
