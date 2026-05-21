'use client';

import type { MockPatient } from '@/app/doctor/dashboard/page';
import './PatientList.css';

interface PatientListProps {
  patients: MockPatient[];
  selectedId: string;
  onSelect: (patient: MockPatient) => void;
}

const STATUS_COLORS: Record<string, string> = {
  'Awaiting review': 'var(--color-primary)',
  'In progress': 'var(--color-accent-teal)',
  'Resolved': 'var(--color-success)',
};

export default function PatientList({ patients, selectedId, onSelect }: PatientListProps) {
  return (
    <div className="patient-list">
      <div className="patient-list__header">
        <h3>Assigned Patients</h3>
        <span className="patient-list__count">{patients.length}</span>
      </div>
      <div className="patient-list__items">
        {patients.map((p) => (
          <button
            key={p.id}
            className={`patient-list__item ${selectedId === p.id ? 'patient-list__item--active' : ''}`}
            onClick={() => onSelect(p)}
          >
            <div className="patient-list__avatar">{p.name.split(' ').map(n => n[0]).join('')}</div>
            <div className="patient-list__info">
              <div className="patient-list__name">{p.name}, {p.age}</div>
              <div className="patient-list__condition">{p.condition}</div>
              <div className="patient-list__meta">
                <span>{p.lastActivity}</span>
                <span className="patient-list__status" style={{ color: STATUS_COLORS[p.status] || 'inherit' }}>
                  {p.status}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
