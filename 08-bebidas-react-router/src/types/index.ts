import {
  CategoriesApiResponseSchema,
  DrinkApiResponseSchema,
  DrinksApiResponseSchema,
  RecipeAPIResponseSchema,
  SearchFilterSchema,
} from 'schemas/recipes-schema';
import { z } from 'zod';

export type Categories = z.infer<typeof CategoriesApiResponseSchema>;
export type SearchFilter = z.infer<typeof SearchFilterSchema>;
export type Drinks = z.infer<typeof DrinksApiResponseSchema>;
export type Drink = z.infer<typeof DrinkApiResponseSchema>;
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>;
