function Alert({ children }: { children: React.ReactNode }) {
  return (
    <p className='bg-red-400 px-4 py-2 text-center text-sm font-bold uppercase text-white'>
      {children}
    </p>
  );
}

export default Alert;
