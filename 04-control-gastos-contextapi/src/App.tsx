import BudgetForm from 'components/BudgetForm';
import BudgetTracker from 'components/BudgetTracker';
import ExpenseList from 'components/ExpenseList';
import ExpenseModal from 'components/ExpenseModal';
import FilterByCategory from 'components/FilterByCategory';
import { useBudget } from 'hooks/useBudget';
import { useEffect } from 'react';

function App() {
  const { state } = useBudget();
  const isValidBudget = state.budget > 0;

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state]);
  return (
    <>
      <header className='max-h-72 bg-blue-500 py-8'>
        <h1 className='text-center text-4xl font-black uppercase text-white'>
          PLanificador de Gastos
        </h1>
      </header>
      <div className='mx-auto mt-10 max-w-3xl rounded-lg bg-white p-10 shadow-lg'>
        {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
      </div>
      {isValidBudget && (
        <main className='mx-auto max-w-3xl py-10'>
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
      )}
    </>
  );
}

export default App;
