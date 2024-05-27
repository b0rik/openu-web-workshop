import { PatientCreateFormSkeleton } from '@/components/patient-create-form/PatientCreateFormSkeleton';

const loading = () => {
  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <PatientCreateFormSkeleton />
    </div>
  );
};
export default loading;
