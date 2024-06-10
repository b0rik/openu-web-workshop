import { Modal } from '@/components/Modal';
import { PatientCreateFormSkeleton } from '@/components/patient-create-form/PatientCreateFormSkeleton';

const loading = () => {
  return (
    <Modal>
      <PatientCreateFormSkeleton />
    </Modal>
  );
};
export default loading;
