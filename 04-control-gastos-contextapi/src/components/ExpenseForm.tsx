import { categories } from 'data';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DraftExpense, Value } from 'types';
import { ErrorMessage } from './ErrorMessage';
import { useBudget } from 'hooks/useBudget';

const ExpenseForm = () => {
  const initialState: DraftExpense = {
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  };
  const [expense, setExpense] = useState<DraftExpense>(initialState);
  const [error, setError] = useState('');
  const [prevAmount, setPrevAmount] = useState(0);
  const { dispatch, state, remainingBudget } = useBudget();

  useEffect(() => {
    //Mostrar form con datos actualizar
    if (state.editingId) {
      const editingExpense = state.expenses.filter((expense) => expense.id === state.editingId)[0];
      setExpense(editingExpense);
      setPrevAmount(editingExpense.amount);
    }
  }, [state.editingId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isAmountField = ['amount'].includes(name);
    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validar
    if (Object.values(expense).includes('') || expense.amount < 0) {
      setError('Todos los campos son obligatorios');
      return;
    }
    //Validar que no salga del presupuesto
    if (expense.amount - prevAmount > remainingBudget) {
      setError('El gasto se sale del presupuesto');
      return;
    }
    if (state.editingId) {
      //Agregar o editar el gasto
      dispatch({
        type: 'update-expense',
        payload: { expense: { id: state.editingId, ...expense } },
      });
    } else {
      dispatch({ type: 'add-expense', payload: { expense: expense } });
    }
    setError('');
    //Reiniciar el state
    setExpense(initialState);
    setPrevAmount(0);
  };
  return (
    <form
      className='space-y-5'
      onSubmit={handleSubmit}
    >
      <legend className='border-b-4 border-blue-500 py-2 text-center text-2xl font-black uppercase'>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {state.editingId ? 'Guardar Cambios' : 'Nuevo Gasto'}
      </legend>
      <div className='flex flex-col gap-2'>
        <label
          htmlFor='expenseName'
          className='text-xl'
        >
          Nombre Gasto:{' '}
        </label>
        <input
          type='text'
          id='expenseName'
          placeholder='Añade el nombre del gasto'
          className='bg-slate-100 p-2'
          name='expenseName'
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='amount'
          className='text-xl'
        >
          Cantidad:{' '}
        </label>
        <input
          type='number'
          id='amount'
          placeholder='Añade la cantidad del gasto: ej. 300'
          className='bg-slate-100 p-2'
          name='amount'
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='category'
          className='text-xl'
        >
          Categoria:{' '}
        </label>
        <select
          name='category'
          id='category'
          className='bg-slate-100 p-2'
          value={expense.category}
          onChange={handleChange}
        >
          <option value=''>--Seleccione--</option>
          {categories.map((category) => (
            <option
              value={category.id}
              key={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='category'
          className='text-xl'
        >
          Fecha Gasto:{' '}
        </label>
        <DatePicker
          className='bg-slate-100'
          value={expense.date}
          onChange={handleChangeDate}
        ></DatePicker>
      </div>

      <input
        type='submit'
        value={state.editingId ? 'Guardar Cambios' : 'Registrar Gasto'}
        className='w-full cursor-pointer rounded-lg bg-blue-600 p-2 font-bold uppercase text-white'
      />
    </form>
  );
};

export default ExpenseForm;
