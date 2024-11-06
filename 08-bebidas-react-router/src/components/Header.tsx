import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from 'stores/useAppStore';

const initialForm = {
  ingredient: '',
  category: '',
};
function Header() {
  const [searchFilters, setSearchFilters] = useState(initialForm);
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === '/', [pathname]);
  const { fetchCategories, categories, searchRecipes, showNotification } = useAppStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    setSearchFilters({ ...searchFilters, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //TODO: Validar
    if (Object.values(searchFilters).includes('')) {
      showNotification({ text: 'Todos los campos son obligatarios', error: true });
      return;
    }

    //Consultar las recetas
    searchRecipes(searchFilters);
  }
  return (
    <header className={`${isHome ? 'bg-header bg-cover bg-center' : 'bg-slate-800'}`}>
      <div className='container mx-auto px-5 py-16'>
        <div className='flex items-center justify-between'>
          <div>
            <img
              src='/logo.svg'
              alt='Logotipo'
              className='w-32'
            />
          </div>
          <nav className='flex gap-4'>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'font-bold uppercase text-orange-500' : 'font-bold uppercase text-white'
              }
              to='/'
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'font-bold uppercase text-orange-500' : 'font-bold uppercase text-white'
              }
              to='/favorites'
            >
              Favoritos
            </NavLink>
          </nav>
        </div>
        {isHome && (
          <form
            className='my-32 space-y-6 rounded-lg bg-orange-400 p-10 shadow md:w-1/2 2xl:w-1/3'
            onSubmit={handleSubmit}
          >
            <div className='space-y-4'>
              <label
                htmlFor='ingredient'
                className='text-lg font-extrabold uppercase text-white'
              >
                Nombre o ingredientes
              </label>
              <input
                type='text'
                id='ingredient'
                name='ingredient'
                className='w-full rounded-lg p-3 focus:outline-none'
                placeholder='Nombre o Ingrediente Ej. Vodka, Tequila,Café'
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className='space-y-4'>
              <label
                htmlFor='category'
                className='text-lg font-extrabold uppercase text-white'
              >
                Categoria
              </label>
              <select
                name='category'
                id='category'
                className='w-full rounded-lg p-3'
                onChange={handleChange}
                value={searchFilters.category}
              >
                <option value=''>--Seleccione--</option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type='submit'
              value='Buscar Recetas'
              className='w-full cursor-pointer rounded-lg bg-orange-800 p-2 font-extrabold uppercase text-white hover:bg-orange-900'
            />
          </form>
        )}
      </div>
    </header>
  );
}

export default Header;
