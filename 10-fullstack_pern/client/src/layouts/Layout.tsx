import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header className='mb-10 bg-slate-800'>
        <div className='mx-auto max-w-6xl py-10'>
          <h1 className='text-4xl font-extrabold text-white'>Administrador de productos</h1>
        </div>
      </header>
      <main className='mx-auto max-w-6xl bg-white p-10 shadow-lg'>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
