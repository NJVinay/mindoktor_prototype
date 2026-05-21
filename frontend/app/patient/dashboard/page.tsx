'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/authStore';
import PrimaryCTAButton from '@/app/components/PrimaryCTAButton';
import './patient-dashboard.css';

export default function PatientDashboard() {
  const router = useRouter();
  const authName = useAuthStore((s) => s.name);

  return (
    <div className="patient-dashboard">
      <div className="patient-dashboard__hero">
        <h1>Welcome, {authName || 'Patient'}</h1>
        <p>How can we help you today?</p>
      </div>

      <div className="patient-dashboard__grid">
        <div className="patient-card">
          <div className="patient-card__icon">🩺</div>
          <h3>Start a new assessment</h3>
          <p>Answer a few questions about your symptoms and get directed to the right care.</p>
          <PrimaryCTAButton onClick={() => router.push('/')}>
            Start Triage
          </PrimaryCTAButton>
        </div>

        <div className="patient-card">
          <div className="patient-card__icon">📋</div>
          <h3>Your medical history</h3>
          <p>View past assessments, prescriptions, and doctor messages.</p>
          <PrimaryCTAButton onClick={() => router.push('/patient/triage-history')}>
            View History
          </PrimaryCTAButton>
        </div>

        <div className="patient-card">
          <div className="patient-card__icon">📅</div>
          <h3>Upcoming appointments</h3>
          <p>You have no upcoming video calls scheduled.</p>
          <button className="patient-card__link">Book an appointment</button>
        </div>
      </div>
    </div>
  );
}
