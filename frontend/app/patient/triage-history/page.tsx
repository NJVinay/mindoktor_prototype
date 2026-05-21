'use client';

import { useRouter } from 'next/navigation';
import './triage-history.css';

const MOCK_HISTORY = [
  {
    id: 't-123',
    date: '2023-10-15',
    condition: 'Respiratory & Cold',
    symptoms: ['Cough', 'Fever', 'Fatigue'],
    action: 'Prescription issued by Dr. Vibeke Billing',
    status: 'Resolved'
  },
  {
    id: 't-124',
    date: '2023-12-02',
    condition: 'Skin & Body',
    symptoms: ['Rash', 'Itching'],
    action: 'Referred to specialist',
    status: 'Resolved'
  }
];

export default function TriageHistory() {
  const router = useRouter();

  return (
    <div className="triage-history">
      <div className="triage-history__header">
        <button className="triage-history__back" onClick={() => router.back()}>
          ← Back to Dashboard
        </button>
        <h1>Your Medical History</h1>
      </div>

      <div className="triage-history__list">
        {MOCK_HISTORY.map(item => (
          <div key={item.id} className="history-card">
            <div className="history-card__header">
              <span className="history-card__date">{item.date}</span>
              <span className="history-card__status">{item.status}</span>
            </div>
            <h3 className="history-card__condition">{item.condition}</h3>
            <div className="history-card__symptoms">
              {item.symptoms.map(s => (
                <span key={s} className="history-card__symptom-tag">{s}</span>
              ))}
            </div>
            <div className="history-card__action">
              <strong>Outcome:</strong> {item.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
