import { PatientsList } from '@/components/patients-list/PatientsList';
import { getAllPatients } from '@/data/patients';

const PatientsListPage = async () => {
  const allPatients = await getAllPatients();

  return (
    <div>
      <PatientsList allPatients={allPatients} />
    </div>
  );
};

export default PatientsListPage;
