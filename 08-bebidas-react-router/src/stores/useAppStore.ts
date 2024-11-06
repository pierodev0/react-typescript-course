import { createFavoritesSlice, FavoritesSliceType } from 'stores/favoritesSlice';
import { createNotificationSlice, NotificationSliceType } from 'stores/notifactionSlice';
import { createRecipesSlice, RecipesSliceType } from 'stores/recipeSlice';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useAppStore = create<RecipesSliceType & FavoritesSliceType & NotificationSliceType>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a),
  })),
);
