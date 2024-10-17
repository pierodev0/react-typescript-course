import { categories } from 'data/categories';
import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from 'react';
import { ActivityActions, ActivityState } from 'reducers/activity-reducers';
import { ActivityType } from 'types';
type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};
const Form = ({ dispatch, state }: FormProps) => {
  const initialState: ActivityType = {
    id: crypto.randomUUID(),
    category: 1,
    name: '',
    calories: 0,
  };
  const [activity, setActivity] = useState(initialState);
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId,
      )[0];

      setActivity(selectedActivity);
    }
  }, [state.activeId]);
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const isNumberField = ['category', 'calories'].includes(id);
    setActivity({
      ...activity,
      [id]: isNumberField ? +value : value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    setActivity({ ...initialState, id: crypto.randomUUID() });
  };
  return (
    <form
      className='space-y-5 rounded-lg bg-white p-10 shadow'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='category'
          className='font-bold'
        >
          Categoria
        </label>
        <select
          id='category'
          className='w-full rounded-lg border border-slate-300 bg-white p-2'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='name'
          className='font-bold'
        >
          Actividad:
        </label>
        <input
          id='name'
          type='text'
          className='w-full rounded-lg border border-slate-300 bg-white p-2'
          placeholder='Ej. Comida, Jugo de Naranaja, Ensalada, Ejercicio, Pesas, Bicicleta'
          value={activity.name}
          onChange={handleChange}
        ></input>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label
          htmlFor='calories'
          className='font-bold'
        >
          Calorias:
        </label>
        <input
          id='calories'
          type='number'
          className='w-full rounded-lg border border-slate-300 bg-white p-2'
          placeholder='Ej. ej. 300 0 500'
          value={activity.calories}
          onChange={handleChange}
        ></input>
      </div>

      <input
        type='submit'
        className='h-10 w-full cursor-pointer rounded-sm bg-black font-bold uppercase text-white transition hover:bg-black/70 disabled:cursor-not-allowed disabled:opacity-20'
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;
