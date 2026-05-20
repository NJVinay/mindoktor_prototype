export const questionBank: Record<string, { text: string; answers: string[] }> = {
  hur_lange: {
    text: 'How long have you had these symptoms?',
    answers: ['A few hours / today', '1–7 days', '1–4 weeks', 'More than a month', 'Several months or more']
  },
  feber: {
    text: 'Have you or have you had a fever?',
    answers: ['No, no fever', 'Low-grade (< 38.5°C)', 'High fever (≥ 38.5°C)', "Don't know"]
  },
  smärta: {
    text: 'How intense is the pain?',
    answers: ['Mild — barely noticeable', 'Moderate — clearly noticeable', 'Severe — hard to ignore', 'Very severe — debilitating']
  },
  intensitet: {
    text: 'How severe are your symptoms right now?',
    answers: ['Mild', 'Moderate', 'Severe', 'Extreme / unbearable']
  },
  klada: {
    text: 'Do you have itching in the affected area?',
    answers: ['No itching', 'Mild itching', 'Intense itching', 'Itching prevents sleep']
  },
  spridning: {
    text: 'Have the symptoms spread to more places?',
    answers: ['No, localized', 'Slightly, but limited', 'Yes, clearly spread', 'Hard to say']
  },
  upprepat: {
    text: 'Have you had similar symptoms before?',
    answers: ['No, first time', 'Yes, occasionally', 'Yes, recurring', 'Have it often / chronic']
  },
  rorrelsehinder: {
    text: 'Is your mobility affected?',
    answers: ['No, moving normally', 'Slightly limited', 'Noticeably limited', 'Almost impossible to move']
  },
  svullnad: {
    text: 'Is there visible swelling?',
    answers: ['No swelling', 'Slightly swollen', 'Clearly swollen', 'Severe swelling']
  },
  trauma: {
    text: 'Did an accident or injury precede the symptoms?',
    answers: ['No, started spontaneously', 'Maybe — slightly unexpected', 'Yes, clear event', 'Yes, severe accident/fall']
  },
  domning: {
    text: 'Do you feel numbness, tingling, or weakness?',
    answers: ['No', 'Sometimes slight tingling', 'Yes, numbness/tingling often', 'Yes, plus muscle weakness']
  },
  natt: {
    text: 'Are the symptoms worse at night or early in the morning?',
    answers: ['No, no difference', 'Slightly worse at night', 'Clearly worse at night', 'Wake up from symptoms']
  },
  utlosare: {
    text: 'Do you notice what triggers or worsens the symptoms?',
    answers: ['No, no clear triggers', 'Stress', 'Physical exertion', 'Food / allergens', 'Weather / cold']
  },
  belastning: {
    text: 'Do the symptoms occur during exertion/movement?',
    answers: ['No, symptoms at rest', 'Yes, during movement', 'Yes, during heavy exertion', 'Always, regardless']
  },
  stress: {
    text: 'Do you experience high stress in daily life?',
    answers: ['No, low stress', 'Moderate stress', 'High stress', 'Extreme stress / burnout']
  },
  sömn: {
    text: 'How is your sleep?',
    answers: ['Good sleep', 'Slightly disturbed sleep', 'Regular sleep problems', 'Sleep very poorly']
  },
  arf: {
    text: 'Is this hereditary in your family?',
    answers: ["Don't know", 'No', 'Possibly', 'Yes, in close family']
  },
  hormonell: {
    text: 'Do you have hormonal changes (menstruation, pregnancy, menopause)?',
    answers: ['No / not relevant', 'Possibly', 'Yes, likely linked', 'Yes, clear correlation']
  },
  mens: {
    text: 'Are the symptoms linked to the menstrual cycle?',
    answers: ['No', 'Slightly', 'Clear correlation', "Don't know"]
  },
  avforing: {
    text: 'Do you have changes in your stool?',
    answers: ['No, normal', 'Loose stool', 'Constipation', 'Alternating / irregular']
  },
  hosta: {
    text: 'Character of the cough?',
    answers: ['Dry cough', 'Wet cough with mucus', 'Bloody cough', 'Night cough']
  },
  snuva: {
    text: 'Do you have a runny or stuffy nose?',
    answers: ['No', 'Slight runny nose', 'Heavy runny nose', 'Stuffy nose without runny nose']
  },
  svaljer: {
    text: 'How much does it hurt to swallow?',
    answers: ['Swallow normally', 'Slight discomfort', 'Painful', 'Almost impossible to swallow']
  },
  rosta: {
    text: 'Do you have hoarseness or have you lost your voice?',
    answers: ['No', 'Slightly hoarse', 'Clearly hoarse', 'Have lost voice']
  },
  sveda: {
    text: 'Do you have burning when urinating?',
    answers: ['No', 'Slightly', 'Yes, clear burning', 'Yes, severe burning']
  },
  partner: {
    text: 'Has your partner had similar symptoms?',
    answers: ["No / don't know", 'Possibly', 'Yes', "Don't have a partner"]
  },
  symptom_extra: {
    text: 'Do you have other symptoms besides the most common ones?',
    answers: ['No', 'Nausea', 'Sensitivity to light/sound', 'Visual disturbances', 'Several of these']
  },
  mat: {
    text: 'Are symptoms worsened after fatty foods?',
    answers: ['No', 'Sometimes', 'Yes, clearly', "Don't know"]
  },
  diabetes: {
    text: 'Do you have diabetes or vascular disease?',
    answers: ['No', 'Possibly', 'Yes, diabetes', 'Yes, vascular disease']
  },
  blod: {
    text: 'Have you seen blood?',
    answers: ['No', 'Slightly, occasionally', 'Yes, every time', 'Heavy bleeding']
  },
  ater: {
    text: 'Does pain decrease after eating?',
    answers: ['No', 'Sometimes', 'Yes, clearly', 'Worsened by food']
  },
  anstrangning: {
    text: 'Are symptoms triggered by exertion?',
    answers: ['No', 'Sometimes', 'Yes, with light exertion', 'Yes, with all exertion']
  },
  utstrålning: {
    text: 'Does pain radiate to another part of the body?',
    answers: ['No, local', 'Slightly', 'Yes, clearly', 'Yes, down the arm/leg']
  },
  panik: {
    text: 'Do you have sudden panic attacks?',
    answers: ['No', 'Sometimes anxiety', 'Yes, panic attacks', 'Yes, frequent and intense']
  },
  jobb: {
    text: 'Do symptoms affect your ability to work?',
    answers: ['No', 'Slightly', 'Noticeably', 'Cannot work']
  },
  stämning: {
    text: 'How is your mood in general?',
    answers: ['Good', 'Slightly down', 'Depressed / sad', 'Dark thoughts']
  },
  yrke: {
    text: 'Are you exposed to chemicals or allergens at work?',
    answers: ['No', 'Possibly', 'Yes, chemicals', 'Yes, biological substances']
  },
  natt_cough: {
    text: 'Do you wake up from coughing at night?',
    answers: ['No', 'Sometimes', 'Yes, often', 'Yes, every night']
  },
  svaret: {
    text: 'Is the skin inflamed (red, warm, tender)?',
    answers: ['No, just pimples', 'Slightly red', 'Clearly inflamed', 'Yes, with nodules/cysts']
  },
  medicin: {
    text: 'Do you take regular medication?',
    answers: ['No', 'Occasional medication', 'Yes, for this condition', 'Yes, multiple medications']
  },
};
