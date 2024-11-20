function ErrorMessage({ children }: React.PropsWithChildren) {
  return (
    <div className='my-4 bg-red-600 p-3 text-center font-bold uppercase text-white'>{children}</div>
  );
}

export default ErrorMessage;
