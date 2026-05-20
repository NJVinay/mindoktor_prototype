export interface Category {
  key: string;
  name: string;
  icon: string;
  conditionCount?: number;
  isMisc?: boolean;
  conditions?: string[];
}

export interface Doctor {
  name: string;
  specialty: string;
  rating: number;
  responseTime: string;
  avatar: string;
}

export const categories: Category[] = [
  {
    key: 'respiratory-cold',
    name: 'Respiratory & Cold',
    icon: '🌬️',
    conditionCount: 5,
    conditions: ['Common cold', 'Sore throat', 'Cough', 'Sinusitis', 'Influenza'],
  },
  {
    key: 'skin-body',
    name: 'Skin & Body',
    icon: '🩺',
    conditionCount: 9,
    conditions: ['Acne', 'Eczema', 'Rash', 'Fungal infection', 'Moles', 'Psoriasis', 'Hives', 'Warts', 'Insect bites'],
  },
  {
    key: 'womens-sexual',
    name: "Women's & Sexual Health",
    icon: '👩',
    conditionCount: 9,
    conditions: ['UTI', 'Contraception', 'STI screening', 'Menstrual issues', 'Pregnancy', 'PCOS', 'Menopause', 'Vaginal infection', 'Fertility'],
  },
  {
    key: 'mental-lifestyle',
    name: 'Mental & Lifestyle',
    icon: '🧠',
    conditionCount: 8,
    conditions: ['Anxiety', 'Depression', 'Stress', 'Sleep issues', 'ADHD', 'Burnout', 'Grief', 'Addiction'],
  },
  {
    key: 'chronic-internal',
    name: 'Chronic & Internal',
    icon: '🏥',
    conditionCount: 9,
    conditions: ['Diabetes', 'Hypertension', 'Thyroid', 'IBS', 'Migraine', 'Asthma', 'Arthritis', 'Cholesterol', 'GERD'],
  },
  {
    key: 'childrens-health',
    name: "Children's Health",
    icon: '👶',
    conditionCount: 14,
    conditions: ['Fever', 'Ear infection', 'Rash', 'Cough', 'Stomach pain', 'Allergies', 'Growth concerns', 'Vaccination', 'ADHD', 'Bedwetting', 'Asthma', 'Eczema', 'Headache', 'Behavioral issues'],
  },
  {
    key: 'misc',
    name: 'Not sure? Let us guide you.',
    icon: '🔀',
    isMisc: true,
  },
];

export const doctorMap: Record<string, Doctor> = {
  'head/face/throat': {
    name: 'Dr. Vibeke Billing',
    specialty: 'Respiratory & ENT',
    rating: 4.8,
    responseTime: 'Usually responds in ~2 hours',
    avatar: 'VB',
  },
  'chest/breathing': {
    name: 'Dr. Vibeke Billing',
    specialty: 'Respiratory & ENT',
    rating: 4.8,
    responseTime: 'Usually responds in ~2 hours',
    avatar: 'VB',
  },
  'stomach/digestion': {
    name: 'Dr. Maria Ek',
    specialty: 'Internal Medicine',
    rating: 4.9,
    responseTime: 'Usually responds in ~1 hour',
    avatar: 'ME',
  },
  'skin/visible': {
    name: 'Dr. Erik Lindqvist',
    specialty: 'Dermatology',
    rating: 4.7,
    responseTime: 'Usually responds in ~3 hours',
    avatar: 'EL',
  },
  'mental/mood': {
    name: 'Dr. Lars Johansson',
    specialty: 'Psychiatry & Lifestyle',
    rating: 4.9,
    responseTime: 'Usually responds in ~1 hour',
    avatar: 'LJ',
  },
  'muscles/joints': {
    name: 'Dr. Maria Ek',
    specialty: 'Internal Medicine',
    rating: 4.9,
    responseTime: 'Usually responds in ~1 hour',
    avatar: 'ME',
  },
  'private/sexual': {
    name: 'Dr. Anna Svensson',
    specialty: "Women's Health",
    rating: 4.8,
    responseTime: 'Usually responds in ~2 hours',
    avatar: 'AS',
  },
  'not sure': {
    name: 'Dr. Lars Johansson',
    specialty: 'General Practice',
    rating: 4.9,
    responseTime: 'Usually responds in ~1 hour',
    avatar: 'LJ',
  },
};

export const triageQuestions = [
  {
    id: 'q1',
    title: 'How long have you been feeling this way?',
    options: [
      { value: 'just-started', label: 'Just started (today)' },
      { value: 'few-days', label: 'A few days (2–7 days)' },
      { value: 'more-than-week', label: 'More than a week' },
      { value: 'ongoing', label: 'Ongoing / recurring' },
    ],
  },
  {
    id: 'q2',
    title: 'Where do you feel it most?',
    options: [
      { value: 'head/face/throat', label: 'Head, face or throat' },
      { value: 'chest/breathing', label: 'Chest or breathing' },
      { value: 'stomach/digestion', label: 'Stomach or digestion' },
      { value: 'skin/visible', label: 'Skin or a visible change' },
      { value: 'mental/mood', label: 'Mental health or mood' },
      { value: 'muscles/joints', label: 'Muscles, joints or back' },
      { value: 'private/sexual', label: 'Private parts or sexual health' },
      { value: 'not sure', label: "I'm not sure / General" },
    ],
  },
  {
    id: 'q3',
    title: 'How much is it affecting your daily life?',
    options: [
      { value: 'mild', label: 'Mild — noticeable but manageable' },
      { value: 'moderate', label: 'Moderate — affecting my routine' },
      { value: 'severe', label: 'Severe — hard to function' },
      { value: 'emergency', label: 'Emergency — I need urgent help' },
    ],
  },
  {
    id: 'q4',
    title: 'Have you had this before?',
    options: [
      { value: 'first-time', label: 'First time' },
      { value: 'recurring', label: 'Recurring issue' },
      { value: 'diagnosed', label: 'I have a diagnosed condition' },
      { value: 'medicated', label: 'I take regular medication for this' },
    ],
  },
];

export const conditionMap: Record<string, string> = {
  'head/face/throat': 'Upper Respiratory Concern',
  'chest/breathing': 'Chest & Breathing Issue',
  'stomach/digestion': 'Digestive Health Concern',
  'skin/visible': 'Skin & Dermatology Concern',
  'mental/mood': 'Mental Health & Wellbeing',
  'muscles/joints': 'Musculoskeletal Issue',
  'private/sexual': 'Sexual & Reproductive Health',
  'not sure': 'General Health Consultation',
};

export const zoneToCategory: Record<string, string> = {
  head: 'head/face/throat',
  chest: 'chest/breathing',
  abdomen: 'stomach/digestion',
  leftArm: 'muscles/joints',
  rightArm: 'muscles/joints',
  leftLeg: 'muscles/joints',
  rightLeg: 'muscles/joints',
};
