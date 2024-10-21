import { useBudget } from 'hooks/useBudget';
import { ChangeEvent, FormEvent, useMemo, useState } from 'react';

const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBudget(+e.target.value);
  };
  const isValid = useMemo(() => isNaN(budget) || budget <= 0, [budget]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'add-budget', payload: { budget: budget } });
    setBudget(0);
  };

  return (
    <form
      className='space-y-5'
      onSubmit={handleSubmit}
    >
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-bl500 text-center text-4xl font-bold'
        >
          Definir presupuesto
        </label>

        <input
          type='number'
          className='w-full border border-gray-200 bg-white p-2'
          placeholder='Define tu presupuesto'
          id='budget'
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type='submit'
        value='Definir presupuesto'
        className='w-full cursor-pointer bg-blue-500 p-2 font-black uppercase text-white transition hover:opacity-70 disabled:opacity-40'
        disabled={isValid}
      />
    </form>
  );
};

export default BudgetForm;
