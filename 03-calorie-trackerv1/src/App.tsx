import ActivityList from 'components/ActivityList';
import CalorieTracker from 'components/CalorieTracker';
import Form from 'components/Form';
import { useEffect, useMemo, useReducer } from 'react';
import { activityReducer, initialState } from 'reducers/activity-reducers';

function App() {
  const [state = initialState, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestartApp = useMemo(() => state.activities.length, [state.activities]);
  return (
    <>
      <header className='bg-lime-600 py-1'>
        <div className='wrapper flex items-center justify-between'>
          <h1 className='w-full text-center text-lg font-bold uppercase text-white'>
            Contador de calorias
          </h1>

          <button
            className='h-12 rounded-lg bg-gray-800 px-12 font-bold uppercase text-white disabled:opacity-10'
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className='bg-lime-500 px-5 py-20'>
        <div className='wrapper'>
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>
      <section className='bg-gray-800 py-10'>
        <div className='wrapper'>
          <CalorieTracker activities={state.activities} />
        </div>
      </section>
      <section className='max-w-4-xl mx-auto p-10'>
        <div className='wrapper'>
          <ActivityList
            activities={state.activities}
            dispatch={dispatch}
          />
        </div>
      </section>
    </>
  );
}

export default App;
