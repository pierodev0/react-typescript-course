export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

//Utility Types (Pick,Omit)
export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
  quantity: number;
};

//INTERFACE
// export interface CartItem extends Guitar {
//   quantity: number;
// }
