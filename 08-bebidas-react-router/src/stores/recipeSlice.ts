import { getCategories, getRecipeById, getRecipes } from 'services/RecipeService';
import { FavoritesSliceType } from 'stores/favoritesSlice';
import { Categories, Drink, Drinks, Recipe, SearchFilter } from 'types';
import { StateCreator } from 'zustand';

export type RecipesSliceType = {
  categories: Categories;
  drinks: Drinks;
  selectedRecipe: Recipe;
  modal: boolean;
  fetchCategories: () => Promise<void>;
  searchRecipes: (searchFilters: SearchFilter) => Promise<void>;
  selectRecipe: (id: Drink['idDrink']) => Promise<void>;
  closeModal: () => void;
};
export const createRecipesSlice: StateCreator<
  RecipesSliceType & FavoritesSliceType,
  [],
  [],
  RecipesSliceType
> = (set) => ({
  categories: { drinks: [] },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  modal: false,
  fetchCategories: async () => {
    const categories = await getCategories();
    set({
      categories,
    });
  },
  searchRecipes: async (searchFilters) => {
    const drinks = await getRecipes(searchFilters);
    set({
      drinks,
    });
  },
  selectRecipe: async (id) => {
    const selectedRecipe = await getRecipeById(id);
    set({
      selectedRecipe,
      modal: true,
    });
  },
  closeModal: () => {
    set({
      modal: false,
    });
  },
});
