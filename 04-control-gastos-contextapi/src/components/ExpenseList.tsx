import { useBudget } from 'hooks/useBudget';
import { ExpenseDetail } from './ExpenseDetail';

const ExpenseList = () => {
  const { state } = useBudget();

  const filteredExpenses = state.currentCategory
    ? state.expenses.filter((expense) => expense.category === state.currentCategory)
    : state.expenses;
  const isEmpty = filteredExpenses.length === 0;
  return (
    <>
      <div className='mt-10'>
        {isEmpty ? (
          <p className='text-2xl font-bold text-gray-600'>No hay gastos</p>
        ) : (
          <>
            <p className='my-5 text-2xl font-bold text-gray-600'>Listado de gastos</p>
            {filteredExpenses.map((expense) => (
              <ExpenseDetail
                key={expense.id}
                expense={expense}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default ExpenseList;
