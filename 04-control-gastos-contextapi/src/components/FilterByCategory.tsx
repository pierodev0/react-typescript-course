import { categories } from 'data';
import { useBudget } from 'hooks/useBudget';
import { ChangeEvent } from 'react';

const FilterByCategory = () => {
  const { dispatch } = useBudget();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'add-filter-category', payload: { id: e.target.value } });
  };
  return (
    <div className='rounded-lg bg-white p-10 shadow-lg'>
      <form action=''>
        <div className='flex flex-col gap-2 md:flex-row md:items-center'>
          <label htmlFor='category'>Filtrar Gastos</label>
          <select
            name=''
            id='category'
            className='flex-1 rounded bg-slate-100 p-3'
            onChange={handleChange}
          >
            <option value=''> Todas las categorias</option>
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
      </form>
    </div>
  );
};

export default FilterByCategory;
