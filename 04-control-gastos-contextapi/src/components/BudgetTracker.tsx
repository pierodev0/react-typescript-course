import { useBudget } from 'hooks/useBudget';
import AmountDisplay from './AmountDisplay';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BudgetTracker = () => {
  const { state, dispatch, remainingBudget, totalExpenses } = useBudget();
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);
  return (
    <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
      <div className='flex justify-center'>
        <CircularProgressbar
          value={percentage}
          text={`${percentage}% Gastado`}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#dc2626' : '#3b82f6',
            textColor: percentage === 100 ? '#dc2626' : '#3b82f6',
            trailColor: '#f5f5f5',
            textSize: 8,
          })}
        />
        ;
      </div>
      <div className='flex flex-col items-center justify-center gap-8'>
        <button
          onClick={() => dispatch({ type: 'reset-app' })}
          className='w-full rounded-md bg-pink-600 p-2 font-bold uppercase text-white'
        >
          Resetear App
        </button>

        <AmountDisplay
          label='Presupuesto'
          amount={state.budget}
        />
        <AmountDisplay
          label='Disponible'
          amount={remainingBudget}
        />
        <AmountDisplay
          label='Gastado'
          amount={totalExpenses}
        />
      </div>
    </div>
  );
};

export default BudgetTracker;
