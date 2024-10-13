import MenuItem from 'components/MenuItem';
import OrderContents from 'components/OrderContents';
import OrdersTotal from 'components/OrdersTotal';
import TipPercentageForm from 'components/TipPercentageForm';
import { menuItems } from 'data/db';
import { useOrder } from 'hooks/useOrder';

function App() {
  const { addItem, order, removeItem, tip, setTip, placeOrder } = useOrder();
  return (
    <>
      <header className='bg-teal-400 py-4'>
        <h1 className='text-center text-4xl font-black'>
          Calculadora de propinas y Consumo
        </h1>
      </header>
      <main className='mx-auto grid max-w-7xl py-20 md:grid-cols-2'>
        <div className='space-y-4 p-5'>
          <h2 className='text-4xl font-black text-center'>Menu</h2>
          <div className='space-y-1'>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                addItem={addItem}
              />
            ))}
          </div>
        </div>
        <div className='space-y-10 rounded-lg border border-dashed border-slate-300'>
          <div className='space-y-4 p-5'>
            <h2 className='text-4xl font-black text-center'>Consumo</h2>
            {order.length === 0 ? (
              <p className='text-center italic text-gray-500'>La orden esta vacia</p>
            ) : (
              <>
                <OrderContents
                  order={order}
                  removeItem={removeItem}
                />
                <TipPercentageForm
                  setTip={setTip}
                  tip={tip}
                />
                <OrdersTotal
                  order={order}
                  tip={tip}
                  placeOrder={placeOrder}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
