import { auth } from '@/auth';

import { PatientsList } from '@/components/patients-list/PatientsList';
import { getPatientsWithTasksByUnit } from '@/data/patients';

const PatientsListPage = async () => {
  const session = await auth();

  const allPatients = await getPatientsWithTasksByUnit(
    session?.user?.activeUnit as string
  );

  return (
    <div className=''>
      <PatientsList allPatients={allPatients} />
    </div>
  );
};

export default PatientsListPage;
