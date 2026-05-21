'use client';

import { useState } from 'react';
import type { MockPatient } from '@/app/doctor/dashboard/page';
import PrimaryCTAButton from '../PrimaryCTAButton';
import './MessageQueue.css';

export default function MessageQueue({ patient }: { patient: MockPatient }) {
  const [draft, setDraft] = useState('');

  return (
    <div className="message-queue">
      <div className="message-queue__header">
        <h3>Messages with {patient.name.split(' ')[0]}</h3>
      </div>
      
      <div className="message-queue__list">
        {patient.messages.map((msg, i) => (
          <div key={i} className={`message-bubble message-bubble--${msg.sender}`}>
            <div className="message-bubble__text">{msg.text}</div>
            <div className="message-bubble__time">{msg.time}</div>
          </div>
        ))}
      </div>

      <div className="message-queue__input">
        <textarea 
          placeholder="Type a message..." 
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={3}
        />
        <PrimaryCTAButton type="button">Send</PrimaryCTAButton>
      </div>
    </div>
  );
}
