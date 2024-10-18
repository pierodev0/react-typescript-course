import { formatCurrency } from 'helpers';
import { Dispatch, useMemo } from 'react';
import { OrderActions } from 'reducers/order-reducer';
import { OrderItem } from 'types';

type OrderTotalProps = {
  order: OrderItem[];
  tip: number;
  dispatch: Dispatch<OrderActions>;
};

const OrdersTotal = ({ order, tip, dispatch }: OrderTotalProps) => {
  const subtotalAmount = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order],
  );

  const tipAmount = useMemo(() => subtotalAmount * tip, [tip, order]);
  const totalAmount = useMemo(() => subtotalAmount + tipAmount, [tip, order]);

  return (
    <>
      <div className='space-y-3'>
        <h2 className='font-black'>Totales y Propina</h2>
        <p>
          Subtotal a pagar: <span className='font-bold'>{formatCurrency(subtotalAmount)}</span>
        </p>
        <p>
          Propina: <span className='font-bold'>{formatCurrency(tipAmount)}</span>
        </p>
        <p>
          Total a pagar: <span className='font-bold'>{formatCurrency(totalAmount)}</span>
        </p>
      </div>
      <button
        disabled={totalAmount === 0}
        className='h-10 w-full bg-black font-bold uppercase text-white hover:opacity-70 disabled:opacity-10'
        onClick={() => dispatch({ type: 'place-order' })}
      >
        Guardar Orden
      </button>
    </>
  );
};

export default OrdersTotal;
