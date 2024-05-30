import { PatientsList } from '@/components/patients-list/PatientsList';
import { getPatientsWithTasks } from '@/data/patients';

const PatientsListPage = async () => {
  const allPatients = await getPatientsWithTasks();

  return (
    <div className=''>
      <PatientsList allPatients={allPatients} />
    </div>
  );
};

export default PatientsListPage;
