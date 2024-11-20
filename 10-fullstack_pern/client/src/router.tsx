import Layout from 'layouts/Layout';

import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { action as createProductAction } from 'views/NewProduct';
import NewProduct from 'views/NewProduct';
import Products, {
  action as updateAvailabilityAction,
  loader as productsLoader,
} from 'views/Products';
import EditProduct, {
  loader as editProductLoader,
  action as editProductAction,
} from 'views/EditProduct';
import { action as deleteActionProduct } from 'views/ProductDetail';
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateAvailabilityAction,
      },
      {
        path: 'producto/nuevo',
        element: <NewProduct />,
        action: createProductAction,
      },
      {
        path: 'producto/:id/editar', //RDA Pattern
        element: <EditProduct />,
        loader: editProductLoader,
        action: editProductAction,
      },
      {
        path: 'producto/:id/eliminar', //RDA Pattern
        action: deleteActionProduct,
      },
    ],
  },
];
export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
