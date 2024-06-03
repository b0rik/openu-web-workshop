import { PatientsList } from '@/components/patients-list/PatientsList';
import { getPatientsWithTasksByUnit } from '@/data/patients';
import {auth} from '@/auth';

const PatientsListPage = async () => {
  const session = await auth();
  const patientsWithTasksByUnit = await getPatientsWithTasksByUnit(session?.user?.activeUnit!);

  return (
    <div>
      <PatientsList data={patientsWithTasksByUnit} />
    </div>
  );
};

export default PatientsListPage;
