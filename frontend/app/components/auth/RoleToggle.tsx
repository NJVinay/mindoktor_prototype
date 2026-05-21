'use client';

import './RoleToggle.css';

interface RoleToggleProps {
  selected: 'PATIENT' | 'DOCTOR';
  onSelect: (role: 'PATIENT' | 'DOCTOR') => void;
}

export default function RoleToggle({ selected, onSelect }: RoleToggleProps) {
  return (
    <div className="role-toggle">
      <button
        className={`role-toggle__btn ${selected === 'PATIENT' ? 'role-toggle__btn--active' : ''}`}
        onClick={() => onSelect('PATIENT')}
      >
        Patient
      </button>
      <button
        className={`role-toggle__btn ${selected === 'DOCTOR' ? 'role-toggle__btn--active' : ''}`}
        onClick={() => onSelect('DOCTOR')}
      >
        Doctor
      </button>
    </div>
  );
}
