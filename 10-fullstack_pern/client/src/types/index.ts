import * as v from 'valibot';
export const DraftProductSchema = v.object({
  name: v.string(),
  price: v.number(),
});

export const ProductSchema = v.object({
  id: v.number(),
  name: v.string(),
  price: v.number(),
  availability: v.boolean(),
});
export const ProductsSchema = v.array(ProductSchema);

export type Product = v.InferInput<typeof ProductSchema>;
