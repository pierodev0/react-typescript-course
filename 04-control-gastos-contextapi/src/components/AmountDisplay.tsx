import { formatCurrency } from 'helpers';

type AmountDisplayProps = {
  label?: string;
  amount: number;
};
const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  return (
    <p className='text-2xl font-bold text-blue-500'>
      {label && `${label}: `}{' '}
      <span className='font-black text-black'>{formatCurrency(amount)}</span>
    </p>
  );
};

export default AmountDisplay;
