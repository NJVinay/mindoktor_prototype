'use client';

import type { MockPatient } from '@/app/doctor/dashboard/page';
import PrimaryCTAButton from '../PrimaryCTAButton';
import './PatientProgress.css';

export default function PatientProgress({ patient }: { patient: MockPatient }) {
  return (
    <div className="patient-progress">
      <div className="patient-progress__header">
        <h2>{patient.name}</h2>
        <div className="patient-progress__badge">{patient.condition}</div>
      </div>

      <div className="patient-progress__timeline-card">
        <h3>Consultation Timeline</h3>
        <div className="patient-progress__timeline">
          {patient.timeline.map((item, i) => (
            <div key={i} className={`patient-progress__step ${item.done ? 'done' : ''}`}>
              <div className="patient-progress__step-indicator"></div>
              <div className="patient-progress__step-content">
                <span className="patient-progress__step-label">{item.label}</span>
                {item.time && <span className="patient-progress__step-time">{item.time}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="patient-progress__actions">
        <h3>Quick Actions</h3>
        <div className="patient-progress__action-grid">
          <button className="patient-progress__action-btn">
            <span className="icon">📄</span> View Triage Report
          </button>
          <button className="patient-progress__action-btn">
            <span className="icon">💊</span> Prescribe Medication
          </button>
          <button className="patient-progress__action-btn">
            <span className="icon">📅</span> Schedule Video Call
          </button>
          <button className="patient-progress__action-btn">
            <span className="icon">✓</span> Mark as Resolved
          </button>
        </div>
      </div>

      <div className="patient-progress__footer">
        <PrimaryCTAButton type="button">Draft Care Plan</PrimaryCTAButton>
      </div>
    </div>
  );
}
