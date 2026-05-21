'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/app/store/authStore';
import RoleToggle from '../components/auth/RoleToggle';
import LoginForm from '../components/auth/LoginForm';
import './login.css';

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT');
  const { isAuthenticated, role, hydrate } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard');
    }
  }, [isAuthenticated, role, router]);

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1 className="login-card__title">Welcome to Min Doktor</h1>
        <p className="login-card__subtitle">Sign in to access your dashboard</p>

        <RoleToggle selected={selectedRole} onSelect={setSelectedRole} />
        <LoginForm selectedRole={selectedRole} />

        <div className="login-card__demo">
          <p className="login-card__demo-title">Demo Credentials</p>
          <div className="login-card__demo-row">
            <span className="login-card__demo-badge login-card__demo-badge--patient">Patient</span>
            <code>patient@rightdoor.se</code> · <code>patient123</code>
          </div>
          <div className="login-card__demo-row">
            <span className="login-card__demo-badge login-card__demo-badge--doctor">Doctor</span>
            <code>doctor@rightdoor.se</code> · <code>doctor123</code>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
