import { usePatientStore } from 'store';
import PatientDetail from './PatientDetail';

function PatientList() {
  const patients = usePatientStore((state) => state.patients);
  return (
    <div className='overflow-y-scroll md:h-screen md:w-1/2 lg:w-3/5'>
      {patients.length ? (
        <>
          <h2 className='text-center text-3xl font-black'>Listado de Pacientes</h2>
          <p className='mb-10 text-center text-xl'>
            Administra tus <span className='font-bold text-indigo-600'>Pacientes y Citas</span>
          </p>
          {patients.map((patient) => (
            <PatientDetail
              patient={patient}
              key={patient.id}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className='mb-5 text-center text-3xl italic text-gray-400'>No hay pacientes</h2>
          <p className='text-center text-xl italic text-gray-400'>
            Comienza agregando pacientes y apareceran en este lugar
          </p>
        </>
      )}
    </div>
  );
}

export default PatientList;
