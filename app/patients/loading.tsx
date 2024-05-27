import { PatientsListSkeleton } from '@/components/patients-list/PatientsListSkeleton';

const loading = () => {
  return (
    <div>
      <PatientsListSkeleton />
    </div>
  );
};
export default loading;
