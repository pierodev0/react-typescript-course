import { DraftPatient, Patient } from 'types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
type State = {
  patients: Patient[];
  activeId: Patient['id'];
};
type Actions = {
  addPatient: (data: DraftPatient) => void;
  deletePatient: (id: Patient['id']) => void;
  getPatientById: (id: Patient['id']) => void;
  updatePatient: (data: DraftPatient) => void;
};
const createPatient = (patient: DraftPatient): Patient => {
  return { ...patient, id: crypto.randomUUID() };
};
export const usePatientStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: '',

        addPatient: (data) => {
          const newPatient = createPatient(data);
          set((state) => ({
            patients: [...state.patients, newPatient],
          }));
        },
        deletePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id),
          }));
        },

        getPatientById: (id) => {
          set(() => ({
            activeId: id,
          }));
        },

        updatePatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId ? { id: state.activeId, ...data } : patient,
            ),
            activeId: '',
          }));
        },
      }),
      {
        name: 'patient-storage',
      },
    ),
  ),
);
