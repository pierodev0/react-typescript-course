import { PropsWithChildren } from 'react';

export const ErrorMessage = ({ children }: PropsWithChildren) => {
  return <p className='mb-2 rounded-sm bg-red-500 px-2 py-4 text-sm text-white'>{children}</p>;
};
