import { Dispatch } from 'react';
import { OrderActions } from 'reducers/order-reducer';
import type { MenuItem } from 'types';

type MenuItemProps = {
  item: MenuItem;
  dispatch: Dispatch<OrderActions>;
};

const MenuItem = ({ item, dispatch }: MenuItemProps) => {
  return (
    <button
      className='flex w-full justify-between rounded-sm border-2 border-teal-400 p-3 hover:bg-teal-200'
      onClick={() => dispatch({ type: 'add-item', payload: { item: item } })}
    >
      <p className='font-black'>{item.name}</p>
      <p>${item.price}</p>
    </button>
  );
};

export default MenuItem;
