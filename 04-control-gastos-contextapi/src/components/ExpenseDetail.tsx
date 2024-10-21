import { useMemo } from 'react';
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from 'helpers';
import { Expense } from 'types';
import AmountDisplay from './AmountDisplay';
import { categories } from 'data';
import { useBudget } from 'hooks/useBudget';

type ExpenseDetailProps = {
  expense: Expense;
};
export const ExpenseDetail = ({ expense }: ExpenseDetailProps) => {
  const { dispatch } = useBudget();
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense],
  );
  const leadingActions = () => {
    return (
      <LeadingActions>
        <SwipeAction
          onClick={() => dispatch({ type: 'get-expense-by-id', payload: { id: expense.id } })}
        >
          Actualizar
        </SwipeAction>
      </LeadingActions>
    );
  };

  const trailingActions = () => {
    return (
      <TrailingActions>
        <SwipeAction
          onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense.id } })}
          destructive={true}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    );
  };
  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={1}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='flex w-full items-center gap-5 border-b border-gray-200 bg-white p-10 shadow-lg'>
          <div>
            <img
              src={`/images/icono_${categoryInfo.icon}.svg`}
              alt='Icono gasto'
              className='w-20'
            />
          </div>
          <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'>{categoryInfo.name}</p>
            <p className='font-bold'>{expense.expenseName}</p>
            <p className='text-slate600 text-sm'>{formatDate(expense.date!.toString())}</p>
          </div>

          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};
