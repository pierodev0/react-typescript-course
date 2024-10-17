import { categories } from 'data/categories';
import { Dispatch, useMemo } from 'react';
import { ActivityType } from 'types';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { ActivityActions } from 'reducers/activity-reducers';

type ActivityListProps = {
  activities: ActivityType[];
  dispatch: Dispatch<ActivityActions>;
};
const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const categoryName = useMemo(
    () => (category: ActivityType['category']) => {
      return categories.map((cat) => (cat.id === category ? cat.name : ''));
    },
    [activities],
  );
  return (
    <>
      <h2 className='text-center text-4xl font-bold text-slate-600'>Comida y actividades</h2>
      {activities.length === 0 && (
        <p className='my-5 text-center text-xl italic text-gray-400'>No hay actividades aun</p>
      )}
      {activities.map((activity) => (
        <article
          key={activity.id}
          className='mt-5 flex justify-between bg-white px-5 py-10'
        >
          <div className='relative space-y-2'>
            <p
              className={`absolute -left-8 -top-8 px-10 py-2 font-bold text-white ${activity.category === 1 ? 'bg-orange-500' : 'bg-lime-500'}`}
            >
              {categoryName(activity.category)}
            </p>
            <p className='pt-5 text-2xl font-bold'>{activity.name}</p>
            <p
              className={`text-4xl font-black ${activity.category === 1 ? 'text-orange-500' : 'text-lime-500'}`}
            >
              {activity.calories} Calorias
            </p>
          </div>
          <div className='flex items-center gap-5'>
            <button
              onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
            >
              <PencilSquareIcon className='size-8 text-gray-800' />
            </button>

            <button
              onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
            >
              <XCircleIcon className='size-8 text-red-500' />
            </button>
          </div>
        </article>
      ))}
    </>
  );
};

export default ActivityList;
