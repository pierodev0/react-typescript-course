import PatientForm from 'components/PatientForm';
import PatientList from 'components/PatientList';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <div className='container mx-auto mt-20'>
        <h1 className='text-center text-5xl font-black md:mx-auto md:w-2/3'>
          Seguimiento de Pacientes <span className='text-indigo-700'>Veterinaria</span>
        </h1>

        <div className='mt-12 md:flex'>
          <PatientForm />
          <PatientList />
        </div>
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
