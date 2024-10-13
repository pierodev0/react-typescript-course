import type { MenuItem } from 'types';

type MenuItemProps = {
  item: MenuItem;
  addItem: (item: MenuItem) => void
};

const MenuItem = ({ item, addItem }: MenuItemProps) => {
function handleClick() {
  addItem(item)
}
  return (
    <button className='flex w-full justify-between rounded-sm border-2 border-teal-400 p-3 hover:bg-teal-200' onClick={handleClick}>
      <p className='font-black'>{item.name}</p>
      <p>${item.price}</p>
    </button>
  );
};

export default MenuItem;
