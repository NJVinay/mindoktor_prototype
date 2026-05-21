import RoleGuard from '@/app/components/auth/RoleGuard';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['PATIENT']}>
      {children}
    </RoleGuard>
  );
}
