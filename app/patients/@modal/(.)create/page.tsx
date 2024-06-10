import { Modal } from '@/components/Modal';
import { PatientCreateForm } from '@/components/patient-create-form/PatientCreateForm';
import { getUnits } from '@/data/units';

const PatientCreatePage = async () => {
  const units = await getUnits();

  return (
    <Modal>
      <PatientCreateForm units={units.map((unit) => unit.name)} />
    </Modal>
  );
};

export default PatientCreatePage;
