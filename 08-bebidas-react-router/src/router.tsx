import Layout from 'layouts/Layout';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexPage from 'views/IndexPage';

const FavoritesPage = lazy(() => import('views/FavoritesPage'));
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={
              <Suspense fallback='Cargando'>
                <IndexPage />
              </Suspense>
            }
            index
          />
          <Route
            path='/favorites'
            element={
              <Suspense fallback='Cargando'>
                <FavoritesPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
