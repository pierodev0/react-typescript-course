import { useForm } from 'react-hook-form';
import Error from 'components/Error';
import { DraftPatient } from 'types';
import { usePatientStore } from 'store';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

function PatientForm() {
  const addPatient = usePatientStore((state) => state.addPatient);
  const activeId = usePatientStore((state) => state.activeId);
  const patients = usePatientStore((state) => state.patients);
  const updatePatient = usePatientStore((state) => state.updatePatient);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<DraftPatient>();
  useEffect(() => {
    if (activeId) {
      const activePatient = patients.filter((patient) => patient.id === activeId)[0];
      setValue('name', activePatient.name);
      setValue('caretaker', activePatient.caretaker);
      setValue('date', activePatient.date);
      setValue('email', activePatient.email);
      setValue('symptoms', activePatient.symptoms);
    }
  }, [activeId]);

  function registerPatient(data: DraftPatient) {
    if (activeId) {
      updatePatient(data);
      toast.success('Paciente actualizado correctamente');
    } else {
      addPatient(data);
      toast.success('Paciente registrado correctamente');
    }
    reset();
  }

  return (
    <div className='mx-5 md:w-1/2 lg:w-2/5'>
      <h2 className='text-center text-3xl font-black'>Seguimiento Pacientes</h2>

      <p className='mb-10 mt-5 text-center text-lg'>
        Añade Pacientes y {''}
        <span className='font-bold text-indigo-600'>Administralos</span>
      </p>

      <form
        className='mb-10 rounded-lg bg-white px-5 py-10 shadow-md'
        noValidate
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='text-sm font-bold uppercase'
          >
            Paciente
          </label>
          <input
            id='name'
            className='w-full border border-gray-100 p-3'
            type='text'
            placeholder='Nombre del Paciente'
            {...register('name', {
              required: 'El  nombre del paciente es obligatorio',
            })}
          />
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='caretaker'
            className='text-sm font-bold uppercase'
          >
            Propietario
          </label>
          <input
            id='caretaker'
            className='w-full border border-gray-100 p-3'
            type='text'
            placeholder='Nombre del Propietario'
            {...register('caretaker', {
              required: 'El  Propietario es obligatorio',
              validate: (value) =>
                !!value.trim() || 'El campo no puede contener solo espacios vacíos',
            })}
          />
          {errors.caretaker && <Error>{errors.caretaker?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='email'
            className='text-sm font-bold uppercase'
          >
            Email
          </label>
          <input
            id='email'
            className='w-full border border-gray-100 p-3'
            type='email'
            placeholder='Email de Registro'
            {...register('email', {
              required: 'El Email es Obligatorio',
              validate: (value) =>
                !!value.trim() || 'El campo no puede contener solo espacios vacíos',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email No Válido',
              },
            })}
          />
          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='date'
            className='text-sm font-bold uppercase'
          >
            Fecha Alta
          </label>
          <input
            id='date'
            className='w-full border border-gray-100 p-3'
            type='date'
            placeholder='Nombre del Propietario'
            {...register('date', {
              required: 'La fecha de alta es obligatoria',
            })}
          />
          {errors.date && <Error>{errors.date?.message}</Error>}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='symptoms'
            className='text-sm font-bold uppercase'
          >
            Síntomas
          </label>
          <textarea
            id='symptoms'
            className='w-full border border-gray-100 p-3'
            placeholder='Síntomas del paciente'
            {...register('symptoms', {
              required: 'Los sintomas son obligatorios',
              validate: (value) =>
                !!value.trim() || 'El campo no puede contener solo espacios vacíos',
            })}
          />
          {errors.symptoms && <Error>{errors.symptoms?.message}</Error>}
        </div>

        <input
          type='submit'
          className='w-full cursor-pointer bg-indigo-600 p-3 font-bold uppercase text-white transition-colors hover:bg-indigo-700'
          value='Guardar Paciente'
        />
      </form>
    </div>
  );
}

export default PatientForm;
