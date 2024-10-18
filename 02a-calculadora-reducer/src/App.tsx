import MenuItem from 'components/MenuItem';
import OrderContents from 'components/OrderContents';
import OrdersTotal from 'components/OrdersTotal';
import TipPercentageForm from 'components/TipPercentageForm';
import { menuItems } from 'data/db';
import { useReducer } from 'react';
import { initialState, orderReducer } from 'reducers/order-reducer';

function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <>
      <header className='bg-teal-400 py-4'>
        <h1 className='text-center text-4xl font-black'>Calculadora de propinas y Consumo</h1>
      </header>
      <main className='mx-auto grid max-w-7xl py-20 md:grid-cols-2'>
        <div className='space-y-4 p-5'>
          <h2 className='text-center text-4xl font-black'>Menu</h2>
          <div className='space-y-1'>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                dispatch={dispatch}
              />
            ))}
          </div>
        </div>
        <div className='space-y-10 rounded-lg border border-dashed border-slate-300'>
          <div className='space-y-4 p-5'>
            <h2 className='text-center text-4xl font-black'>Consumo</h2>
            {state.order.length === 0 ? (
              <p className='text-center italic text-gray-500'>La orden esta vacia</p>
            ) : (
              <>
                <OrderContents
                  order={state.order}
                  dispatch={dispatch}
                />
                <TipPercentageForm
                  dispatch={dispatch}
                  tip={state.tip}
                />
                <OrdersTotal
                  order={state.order}
                  tip={state.tip}
                  dispatch={dispatch}
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
