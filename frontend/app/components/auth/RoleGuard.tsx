'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';

interface RoleGuardProps {
  allowedRoles: ('DOCTOR' | 'PATIENT')[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { role, isAuthenticated, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (role && !allowedRoles.includes(role)) {
      router.replace(role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard');
    }
  }, [isAuthenticated, role, allowedRoles, router]);

  if (!isAuthenticated || !role || !allowedRoles.includes(role)) {
    return null;
  }

  return <>{children}</>;
}
