import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import Button from 'components/ui/Button';
import { Fragment } from 'react';
import { useAppStore } from 'stores/useAppStore';
import { Recipe } from 'types';

export default function Modal() {
  const { modal, closeModal, selectedRecipe, handleClickFavorite, favoriteExists } = useAppStore();
  const renderIngredients = () => {
    const ingredients: JSX.Element[] = [];
    for (let i = 0; i < 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        ingredients.push(
          <li
            key={i}
            className='text-lg font-normal'
          >
            {ingredient} - {measure}
          </li>,
        );
      }
    }

    return ingredients;
  };

  const isFavorite = favoriteExists(selectedRecipe.idDrink);
  return (
    <>
      <Transition
        appear
        show={modal}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-10'
          onClose={closeModal}
        >
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-70' />
          </TransitionChild>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6'>
                  <DialogTitle
                    as='h3'
                    className='my-5 text-center text-4xl font-extrabold text-gray-900'
                  >
                    {selectedRecipe.strDrink}
                  </DialogTitle>
                  <img
                    src={selectedRecipe.strDrinkThumb}
                    alt={`Imagen de${selectedRecipe.strDrink}`}
                    className='mx-auto w-96'
                  />
                  <DialogTitle
                    as='h3'
                    className='my-5 text-2xl font-extrabold text-gray-900'
                  >
                    Ingredientes y Cantidades
                  </DialogTitle>
                  {renderIngredients()}
                  <DialogTitle
                    as='h3'
                    className='my-5 text-2xl font-extrabold text-gray-900'
                  >
                    Instrucciones
                  </DialogTitle>
                  <p>{selectedRecipe.strInstructions}</p>
                  <div className='my-5 flex justify-between gap-4'>
                    <Button
                      variant='secondary'
                      className='w-full'
                      onClick={closeModal}
                    >
                      Cerrar
                    </Button>
                    <Button
                      variant={`${isFavorite ? 'destructive' : 'primary'}`}
                      className='w-full'
                      onClick={() => handleClickFavorite(selectedRecipe)}
                    >
                      {isFavorite ? ' Eliminar de Favoritos' : 'Agregar a Favoritos'}
                    </Button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
