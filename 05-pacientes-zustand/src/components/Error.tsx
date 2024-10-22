function Error({ children }: { children: React.ReactNode }) {
  return (
    <p className='bg-red-500 py-2 text-center text-sm font-medium uppercase text-white'>
      {children}
    </p>
  );
}

export default Error;
