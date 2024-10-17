import { ActivityType } from 'types';

export type ActivityActions =
  | {
      type: 'save-activity';
      payload: { newActivity: ActivityType };
    }
  | {
      type: 'set-activeId';
      payload: { id: ActivityType['id'] };
    }
  | {
      type: 'delete-activity';
      payload: { id: ActivityType['id'] };
    }
  | {
      type: 'restart-app';
    };
export type ActivityState = {
  activities: ActivityType[];
  activeId: ActivityType['id'];
};

//Local Storage
const localStorageActivities: () => ActivityType[] = () => {
  const activities = localStorage.getItem('activities');
  return activities ? JSON.parse(activities) : [];
};
export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: '',
};

export const activityReducer = (state: ActivityState = initialState, actions: ActivityActions) => {
  if (actions.type === 'save-activity') {
    //Este codigo maneja la lógica para actualizar el sstate
    let updatedActivities: ActivityType[] = [];
    if (state.activeId) {
      updatedActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? actions.payload.newActivity : activity,
      );
    } else {
      updatedActivities = [...state.activities, actions.payload.newActivity];
    }
    return {
      ...state,
      activities: updatedActivities,
      activeId: '', //Reiniciar para que no sobrescriba al iniciar una nueva actividad
    };
  }

  if (actions.type === 'set-activeId') {
    return {
      ...state,
      activeId: actions.payload.id,
    };
  }

  if (actions.type === 'delete-activity') {
    return {
      ...state,
      activities: state.activities.filter((activity) => activity.id !== actions.payload.id),
    };
  }

  if (actions.type === 'restart-app') {
    return {
      activities: [],
      activeId: '',
    };
  }
};
