type CalorieDisplayProps = {
  calories: number;
  text: string;
};

const CalorieDisplay = ({ calories, text }: CalorieDisplayProps) => {
  enum Colors {
    Consumidas = 'text-orange-500',
    Ejercicio = 'text-lime-500',
    Diferencia = 'text-blue-500',
  }
  return (
    <p className='grid grid-cols-1 rounded-full text-center font-bold text-white'>
      <span className={`text-6xl font-black ${Colors[text]}`}>{calories}</span>
      {text}
    </p>
  );
};

export default CalorieDisplay;
