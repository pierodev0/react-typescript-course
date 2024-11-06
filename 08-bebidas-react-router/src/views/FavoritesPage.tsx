import DrinkCard from 'components/DrinkCard';
import { useMemo } from 'react';
import { useAppStore } from 'stores/useAppStore';

function FavoritesPage() {
  const { favorites } = useAppStore();
  const hasFavorites = useMemo(() => favorites.length, [favorites]);
  return (
    <>
      <h1 className='mb-10 text-6xl font-extrabold'>Favoritos</h1>
      {hasFavorites ? (
        <section className='grid grid-cols-1 gap-10 md:grid-cols-2 2xl:grid-cols-3'>
          {favorites.map((drink) => (
            <DrinkCard
              drink={drink}
              key={drink.idDrink}
            />
          ))}
        </section>
      ) : (
        <p className='text-gray text-center text-2xl italic'>Los favoritos se mostraran aqui</p>
      )}
    </>
  );
}

export default FavoritesPage;
