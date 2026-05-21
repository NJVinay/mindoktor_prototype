'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import PrimaryCTAButton from '../PrimaryCTAButton';
import './LoginForm.css';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api/v1';

interface LoginFormProps {
  selectedRole: 'PATIENT' | 'DOCTOR';
}

export default function LoginForm({ selectedRole }: LoginFormProps) {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      if (data.role !== selectedRole) {
        setError(`This account is registered as a ${data.role}. Please switch the role toggle.`);
        setLoading(false);
        return;
      }

      login(data.access_token, data.role, data.user_id, data.name);
      router.replace(data.role === 'DOCTOR' ? '/doctor/dashboard' : '/patient/dashboard');
    } catch (err) {
      // Fallback for when backend is not running (demo/Netlify)
      if (selectedRole === 'DOCTOR' && email === 'doctor@rightdoor.se' && password === 'doctor123') {
        login('demo-token-doctor', 'DOCTOR', 'demo-doctor-id', 'Dr. Vibeke Billing');
        router.replace('/doctor/dashboard');
        return;
      }
      if (selectedRole === 'PATIENT' && email === 'patient@rightdoor.se' && password === 'patient123') {
        login('demo-token-patient', 'PATIENT', 'demo-patient-id', 'Anna Lindström');
        router.replace('/patient/dashboard');
        return;
      }
      setError('Could not connect to server. Use demo credentials.');
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="login-form__field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </div>
      {error && <div className="login-form__error">{error}</div>}
      <PrimaryCTAButton type="submit" disabled={loading}>
        {loading ? 'Signing in...' : `Sign in as ${selectedRole === 'DOCTOR' ? 'Doctor' : 'Patient'}`}
      </PrimaryCTAButton>
    </form>
  );
}
