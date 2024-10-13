import { formatCurrency } from 'helpers';
import { OrderItem } from 'types';

type OrderContentsProps = {
  order: OrderItem[];
  removeItem: (id: OrderItem['id']) => void
};
const OrderContents = ({ order,removeItem }: OrderContentsProps) => {
  return (
    <div className='space-y-4 '>
          <div className=''>
        {order.map((item) => (
          <article className='flex justify-between py-3 outline-gray-300 border-t-2 last:border-b-2 items-center' key={item.id}>
            <div className=''>
              <p className='text-lg'>
                {item.name} - {formatCurrency(item.price)}
              </p>
              <p className='font-black'>
                Cantidad: {item.quantity} -{' '}
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
            <button className='size-8 rounded-full bg-red-500 text-white hover:opacity-70 transition' onClick={()=>removeItem(item.id)}>
              x
            </button>
          </article>
        ))}
      </div>
    </div>
  );
};

export default OrderContents;
