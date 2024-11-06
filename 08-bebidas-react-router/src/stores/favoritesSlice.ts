import { createNotificationSlice, NotificationSliceType } from 'stores/notifactionSlice';
import { createRecipesSlice, RecipesSliceType } from 'stores/recipeSlice';
import { Recipe } from 'types';
import { StateCreator } from 'zustand';

export type FavoritesSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe['idDrink']) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    const existRecipe = get().favoriteExists(recipe.idDrink);
    if (existRecipe) {
      //Eliminar de favoritos
      set({
        favorites: get().favorites.filter((favorite) => favorite.idDrink !== recipe.idDrink),
      });
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se elimino de favoritos',
        error: false,
      });
    } else {
      //Añadir a favoritos
      set({
        favorites: [...get().favorites, recipe],
      });
      createNotificationSlice(set, get, api).showNotification({
        text: 'Se agrego a favoritos',
        error: false,
      });
    }

    createRecipesSlice(set, get, api).closeModal();
    localStorage.setItem('favorites', JSON.stringify(get().favorites));
  },
  favoriteExists: (id) => {
    const favoriteExists = get().favorites.some((favorite) => favorite.idDrink === id);
    return favoriteExists;
  },

  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
});
