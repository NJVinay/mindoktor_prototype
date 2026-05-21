'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import PatientList from '@/app/components/doctor/PatientList';
import PatientProgress from '@/app/components/doctor/PatientProgress';
import MessageQueue from '@/app/components/doctor/MessageQueue';
import { useAuthStore } from '@/app/store/authStore';
import './doctor-dashboard.css';

export interface MockPatient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastActivity: string;
  status: 'Awaiting review' | 'In progress' | 'Resolved';
  timeline: { label: string; time: string; done: boolean }[];
  messages: { sender: 'doctor' | 'patient'; text: string; time: string }[];
}

const MOCK_PATIENTS: MockPatient[] = [
  {
    id: '1',
    name: 'Anna Lindström',
    age: 34,
    condition: 'Respiratory & Cold',
    lastActivity: '2h ago',
    status: 'Awaiting review',
    timeline: [
      { label: 'Triage completed', time: '2h ago', done: true },
      { label: 'Consultation started', time: '', done: false },
      { label: 'Follow-up sent', time: '', done: false },
      { label: 'Resolved', time: '', done: false },
    ],
    messages: [
      { sender: 'doctor', text: 'How are you feeling today?', time: '2h ago' },
      { sender: 'patient', text: 'Better, the cough is less frequent now.', time: '1h ago' },
      { sender: 'doctor', text: 'Good progress. Continue fluids and rest.', time: '30m ago' },
    ],
  },
  {
    id: '2',
    name: 'Erik Johansson',
    age: 28,
    condition: 'Skin & Body',
    lastActivity: '1d ago',
    status: 'In progress',
    timeline: [
      { label: 'Triage completed', time: '3d ago', done: true },
      { label: 'Consultation started', time: '1d ago', done: true },
      { label: 'Follow-up sent', time: '', done: false },
      { label: 'Resolved', time: '', done: false },
    ],
    messages: [
      { sender: 'patient', text: 'The rash is spreading slightly.', time: '1d ago' },
      { sender: 'doctor', text: 'Can you send a photo of the affected area?', time: '1d ago' },
    ],
  },
  {
    id: '3',
    name: 'Sara Nilsson',
    age: 45,
    condition: 'Mental & Lifestyle',
    lastActivity: '3d ago',
    status: 'Resolved',
    timeline: [
      { label: 'Triage completed', time: '1w ago', done: true },
      { label: 'Consultation started', time: '5d ago', done: true },
      { label: 'Follow-up sent', time: '3d ago', done: true },
      { label: 'Resolved', time: '3d ago', done: true },
    ],
    messages: [
      { sender: 'doctor', text: 'Continue the breathing exercises.', time: '3d ago' },
      { sender: 'patient', text: 'Thank you, I feel much better.', time: '3d ago' },
    ],
  },
  {
    id: '4',
    name: 'Mikael Berg',
    age: 61,
    condition: 'Chronic & Internal',
    lastActivity: '5h ago',
    status: 'Awaiting review',
    timeline: [
      { label: 'Triage completed', time: '5h ago', done: true },
      { label: 'Consultation started', time: '', done: false },
      { label: 'Follow-up sent', time: '', done: false },
      { label: 'Resolved', time: '', done: false },
    ],
    messages: [
      { sender: 'patient', text: 'My blood pressure has been high lately.', time: '5h ago' },
    ],
  },
];

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<MockPatient>(MOCK_PATIENTS[0]);
  const authName = useAuthStore((s) => s.name);

  return (
    <div className="doctor-dashboard">
      <div className="doctor-dashboard__header">
        <h1>Doctor Dashboard</h1>
        <p>Welcome back, {authName || 'Doctor'}</p>
      </div>
      <div className="doctor-dashboard__panels">
        <motion.div
          className="doctor-dashboard__panel doctor-dashboard__panel--left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PatientList
            patients={MOCK_PATIENTS}
            selectedId={selectedPatient.id}
            onSelect={(p) => setSelectedPatient(p)}
          />
        </motion.div>
        <motion.div
          className="doctor-dashboard__panel doctor-dashboard__panel--center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <PatientProgress patient={selectedPatient} />
        </motion.div>
        <motion.div
          className="doctor-dashboard__panel doctor-dashboard__panel--right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <MessageQueue patient={selectedPatient} />
        </motion.div>
      </div>
    </div>
  );
}
