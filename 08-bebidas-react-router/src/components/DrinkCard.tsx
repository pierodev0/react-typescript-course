import Button from 'components/ui/Button';
import { useAppStore } from 'stores/useAppStore';
import { Drink } from 'types';

type DrinkCardProps = {
  drink: Drink;
};
function DrinkCard({ drink }: DrinkCardProps) {
  const { selectRecipe } = useAppStore();
  return (
    <article className='border shadow-lg'>
      <div className='overflow-hidden'>
        <img
          src={drink.strDrinkThumb}
          alt={`Imagen de ${drink.strDrink}`}
          className='transition hover:rotate-2 hover:scale-110'
        />
      </div>
      <div className='space-y-5 p-5'>
        <h2 className='truncate text-2xl font-black'>{drink.strDrink}</h2>
        <Button
          variant='primary'
          className='w-full'
          onClick={() => selectRecipe(drink.idDrink)}
        >
          Ver Recetas
        </Button>
      </div>
    </article>
  );
}

export default DrinkCard;
