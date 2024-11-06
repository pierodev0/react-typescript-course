import DrinkCard from 'components/DrinkCard';
import { useMemo } from 'react';
import { useAppStore } from 'stores/useAppStore';

function IndexPage() {
  const { drinks } = useAppStore();

  const hasDrinks = useMemo(() => drinks.drinks.length > 0, [drinks]);
  return (
    <>
      <h1 className='mb-10 text-6xl font-extrabold'>Recetas</h1>
      {hasDrinks ? (
        <>
          <section className='grid grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3'>
            {drinks.drinks.map((drink) => (
              <DrinkCard
                key={drink.idDrink}
                drink={drink}
              />
            ))}
          </section>
        </>
      ) : (
        <p className='my-10 text-center text-2xl'>No hay resultados aun</p>
      )}
    </>
  );
}

export default IndexPage;
