import RoleGuard from '@/app/components/auth/RoleGuard';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGuard allowedRoles={['DOCTOR']}>
      {children}
    </RoleGuard>
  );
}
