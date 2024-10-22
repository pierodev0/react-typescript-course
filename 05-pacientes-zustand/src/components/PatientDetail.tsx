import { toast } from 'react-toastify';
import { usePatientStore } from 'store';
import { Patient } from 'types';

type PatientDetailProps = {
  patient: Patient;
};
function PatientDetail({ patient }: PatientDetailProps) {
  const { deletePatient, getPatientById } = usePatientStore();

  const handleClick = () => {
    deletePatient(patient.id);
    toast.error('Paciente eliminado');
  };
  return (
    <div className='mx-5 my-10 rounded-xl bg-white px-5 py-10 shadow-md'>
      <PatientDetailItem
        label='Id'
        data={patient.id}
      />
      <PatientDetailItem
        label='Nombre'
        data={patient.name}
      />
      <PatientDetailItem
        label='Propietario'
        data={patient.caretaker}
      />
      <PatientDetailItem
        label='Email'
        data={patient.email}
      />
      <PatientDetailItem
        label='Fecha Alta'
        data={patient.date.toString()}
      />
      <PatientDetailItem
        label='Sintomas'
        data={patient.symptoms}
      />

      <div className='sm: mt-10 flex flex-col justify-between gap-3 sm:flex-row'>
        <button
          className='rounded-lg bg-indigo-600 px-10 py-2 font-bold uppercase text-white hover:bg-indigo-700'
          type='button'
          onClick={() => getPatientById(patient.id)}
        >
          Editar
        </button>
        <button
          className='rounded-lg bg-red-600 px-10 py-2 font-bold uppercase text-white hover:bg-red-700'
          type='button'
          onClick={handleClick}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default PatientDetail;

type PatientDetailItemProps = {
  label: string;
  data: string;
};
function PatientDetailItem({ label, data }: PatientDetailItemProps) {
  return (
    <p className='mb-3 font-bold uppercase text-gray-700'>
      {label}: <span className='font-normal normal-case'>{data}</span>
    </p>
  );
}
