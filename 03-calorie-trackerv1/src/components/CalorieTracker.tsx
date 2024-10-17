import { useMemo } from 'react';
import { ActivityType } from 'types';
import CalorieDisplay from './CalorieDisplay';

type CalorieTrackerProps = {
  activities: ActivityType[];
};

const CalorieTracker = ({ activities }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) => (activity.category === 1 ? total + activity.calories : total),
        0,
      ),
    [activities],
  );

  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) => (activity.category === 2 ? total + activity.calories : total),
        0,
      ),
    [activities],
  );

  const neCalories = useMemo(() => caloriesConsumed - caloriesBurned, [activities]);
  return (
    <>
      <h2 className='text-center text-4xl font-black text-white'>Resumen de calorias</h2>
      <div className='md: mt-10 flex flex-col items-center justify-between gap-5 md:flex-row'>
        <CalorieDisplay
          calories={caloriesConsumed}
          text='Consumidas'
        />

        <CalorieDisplay
          calories={caloriesBurned}
          text='Ejercicio'
        />

        <CalorieDisplay
          calories={neCalories}
          text='Diferencia'
        />
      </div>
    </>
  );
};

export default CalorieTracker;
