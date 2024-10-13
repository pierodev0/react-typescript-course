import type { Dispatch, SetStateAction } from "react";

const tipOptions = [
  {
    id: 'tip-10',
    value: 0.1,
    label: '10%',
  },
  {
    id: 'tip-20',
    value: 0.2,
    label: '20%',
  },
  {
    id: 'tip-50',
    value: 0.5,
    label: '50%',
  },
];

type TipPercentageFormProps = {
  tip: number;
  setTip: Dispatch<SetStateAction<number>>;
};
const TipPercentageForm = ({ tip, setTip }: TipPercentageFormProps) => {
  return (
    <div>
      <h3 className='text-3xl font-black'>Propina</h3>
      <form action=''>
        {tipOptions.map((tipOption) => (
          <div
            className='flex gap-2'
            key={tipOption.id}
          >
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
              type='radio'
              name='tip'
              value={tipOption.value}
              onChange={e => setTip(+e.target.value)}
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default TipPercentageForm;
