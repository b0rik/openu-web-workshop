import { PatientCreateForm } from '@/components/patient-create-form/PatientCreateForm';
import { getUnits } from '@/data/units';

const PatientCreatePage = async () => {
  const units = await getUnits();

  return (
    <div className='mx-auto max-w-md md:max-w-3xl'>
      <PatientCreateForm units={units.map((unit) => unit.name)} />
    </div>
  );
};

export default PatientCreatePage;
