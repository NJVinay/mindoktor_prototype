import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Enable pg_trgm extension for fuzzy search
  await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS pg_trgm;`);

  // Clean existing data
  await prisma.searchIndex.deleteMany();
  await prisma.triageSession.deleteMany();
  await prisma.condition.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.category.deleteMany();

  // ─── CATEGORIES ───────────────────────────────────────────────
  console.log('📁 Creating categories...');

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        key: 'respiratory-cold',
        name_sv: 'Luftvägar & Förkylning',
        name_en: 'Respiratory & Cold',
        icon_name: '🌬️',
        color_token: 'blue-400',
        sort_order: 1,
        is_misc: false,
      },
    }),
    prisma.category.create({
      data: {
        key: 'skin-body',
        name_sv: 'Hud & Kropp',
        name_en: 'Skin & Body',
        icon_name: '🩺',
        color_token: 'amber-400',
        sort_order: 2,
        is_misc: false,
      },
    }),
    prisma.category.create({
      data: {
        key: 'womens-sexual',
        name_sv: 'Kvinnohälsa & Sexuell hälsa',
        name_en: "Women's & Sexual Health",
        icon_name: '👩',
        color_token: 'pink-400',
        sort_order: 3,
        is_misc: false,
      },
    }),
    prisma.category.create({
      data: {
        key: 'mental-lifestyle',
        name_sv: 'Psykisk hälsa & Livsstil',
        name_en: 'Mental & Lifestyle',
        icon_name: '🧠',
        color_token: 'purple-400',
        sort_order: 4,
        is_misc: false,
      },
    }),
    prisma.category.create({
      data: {
        key: 'chronic-internal',
        name_sv: 'Kroniska & Inre besvär',
        name_en: 'Chronic & Internal',
        icon_name: '🏥',
        color_token: 'green-400',
        sort_order: 5,
        is_misc: false,
      },
    }),
    prisma.category.create({
      data: {
        key: 'childrens-health',
        name_sv: 'Barnhälsa',
        name_en: "Children's Health",
        icon_name: '👶',
        color_token: 'orange-400',
        sort_order: 6,
        is_misc: false,
      },
    }),
    prisma.category.create({
      data: {
        key: 'misc',
        name_sv: 'Inte säker? Låt oss guida dig.',
        name_en: 'Not sure? Let us guide you.',
        icon_name: '🔀',
        color_token: 'gray-400',
        sort_order: 7,
        is_misc: true,
      },
    }),
  ]);

  const catMap = Object.fromEntries(categories.map((c) => [c.key, c]));

  // ─── CONDITIONS ───────────────────────────────────────────────
  console.log('🩺 Creating conditions...');

  const conditionsData = [
    // HEAD
    { slug: 'migran', name_sv: 'Migrän', name_en: 'Migraine', category_key: 'chronic-internal', body_zones: ['head'], layers: ['nerve'], specialist_type: 'Neurologist', tags: ['Headache', 'Neurological'], questions: ['hur_lange', 'intensitet', 'symptom_extra'], severity_min: 2, severity_max: 8, typical_duration: 'varies' },
    { slug: 'sinuit', name_sv: 'Bihåleinflammation', name_en: 'Sinusitis', category_key: 'respiratory-cold', body_zones: ['head'], layers: ['organ'], specialist_type: 'ENT Specialist', tags: ['Infection', 'ENT'], questions: ['hur_lange', 'feber', 'snuva'], severity_min: 2, severity_max: 5, typical_duration: '1-3 weeks' },
    { slug: 'konjunktivit', name_sv: 'Ögonkatarr', name_en: 'Conjunctivitis', category_key: 'skin-body', body_zones: ['head'], layers: ['skin', 'organ'], specialist_type: 'Ophthalmologist', tags: ['Eyes', 'Infection'], questions: ['hur_lange', 'spridning'], severity_min: 1, severity_max: 4, typical_duration: '3-7 days' },
    { slug: 'otit', name_sv: 'Öroninflammation', name_en: 'Ear Infection', category_key: 'respiratory-cold', body_zones: ['head', 'neck'], layers: ['organ'], specialist_type: 'ENT Specialist', tags: ['Ears', 'Infection'], questions: ['hur_lange', 'feber', 'smärta'], severity_min: 1, severity_max: 5, typical_duration: '3-7 days' },
    { slug: 'ansiktseksem', name_sv: 'Eksem (ansikte)', name_en: 'Face Eczema', category_key: 'skin-body', body_zones: ['head'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Chronic'], questions: ['hur_lange', 'klada', 'spridning'], severity_min: 1, severity_max: 5, typical_duration: 'chronic' },
    { slug: 'herpes_labialis', name_sv: 'Munsår', name_en: 'Cold Sore', category_key: 'skin-body', body_zones: ['head'], layers: ['skin'], specialist_type: 'General Practitioner', tags: ['Skin', 'Viral'], questions: ['hur_lange', 'upprepat'], severity_min: 1, severity_max: 3, typical_duration: '1-2 weeks' },
    { slug: 'acne', name_sv: 'Akne', name_en: 'Acne', category_key: 'skin-body', body_zones: ['head', 'chest'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Hormonal'], questions: ['hur_lange', 'svaret', 'hormonell'], severity_min: 1, severity_max: 6, typical_duration: 'chronic' },
    { slug: 'yrsel', name_sv: 'Yrsel', name_en: 'Dizziness', category_key: 'chronic-internal', body_zones: ['head'], layers: ['nerve'], specialist_type: 'Neurologist', tags: ['Neurological'], questions: ['hur_lange', 'intensitet', 'utlosare'], severity_min: 2, severity_max: 7, typical_duration: 'varies' },

    // NECK
    { slug: 'halsfluss', name_sv: 'Halsfluss', name_en: 'Tonsillitis', category_key: 'respiratory-cold', body_zones: ['neck'], layers: ['organ'], specialist_type: 'ENT Specialist', tags: ['Infection', 'ENT'], questions: ['hur_lange', 'feber', 'svaljer'], severity_min: 2, severity_max: 6, typical_duration: '1-2 weeks' },
    { slug: 'laryngit', name_sv: 'Stämbandskatarr', name_en: 'Laryngitis', category_key: 'respiratory-cold', body_zones: ['neck'], layers: ['organ'], specialist_type: 'ENT Specialist', tags: ['Voice', 'Infection'], questions: ['hur_lange', 'rosta', 'feber'], severity_min: 1, severity_max: 4, typical_duration: '1-2 weeks' },
    { slug: 'whiplash', name_sv: 'Whiplash', name_en: 'Whiplash', category_key: 'chronic-internal', body_zones: ['neck'], layers: ['muscle', 'bone'], specialist_type: 'Orthopedist', tags: ['Injury', 'Musculoskeletal'], questions: ['hur_lange', 'trauma', 'rorrelsehinder'], severity_min: 3, severity_max: 8, typical_duration: 'chronic' },

    // CHEST
    { slug: 'astma', name_sv: 'Astma', name_en: 'Asthma', category_key: 'respiratory-cold', body_zones: ['chest'], layers: ['organ'], specialist_type: 'Pulmonologist', tags: ['Respiratory', 'Chronic'], questions: ['hur_lange', 'utlosare', 'natt'], severity_min: 2, severity_max: 7, typical_duration: 'chronic' },
    { slug: 'bronkit', name_sv: 'Bronkit', name_en: 'Bronchitis', category_key: 'respiratory-cold', body_zones: ['chest'], layers: ['organ'], specialist_type: 'General Practitioner', tags: ['Respiratory', 'Infection'], questions: ['hur_lange', 'feber', 'hosta'], severity_min: 2, severity_max: 5, typical_duration: '2-3 weeks' },
    { slug: 'hypertoni', name_sv: 'Högt blodtryck', name_en: 'High Blood Pressure', category_key: 'chronic-internal', body_zones: ['chest'], layers: ['organ'], specialist_type: 'Internal Medicine', tags: ['Heart', 'Chronic'], questions: ['hur_lange', 'symtom', 'medicin'], severity_min: 2, severity_max: 8, typical_duration: 'chronic' },
    { slug: 'angina', name_sv: 'Kärlkramp', name_en: 'Angina', category_key: 'chronic-internal', body_zones: ['chest'], layers: ['organ'], specialist_type: 'Cardiologist', tags: ['Heart', 'Acute'], questions: ['hur_lange', 'utstrålning', 'anstrangning'], severity_min: 5, severity_max: 9, typical_duration: 'acute' },
    { slug: 'brost_eksem', name_sv: 'Brösteksem', name_en: 'Chest Eczema', category_key: 'skin-body', body_zones: ['chest'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin'], questions: ['hur_lange', 'klada', 'spridning'], severity_min: 1, severity_max: 4, typical_duration: 'chronic' },
    { slug: 'muskelspanning_brost', name_sv: 'Muskelspänning', name_en: 'Muscle Tension', category_key: 'chronic-internal', body_zones: ['chest'], layers: ['muscle'], specialist_type: 'Physiotherapist', tags: ['Musculoskeletal'], questions: ['hur_lange', 'trauma', 'rorrelsehinder'], severity_min: 1, severity_max: 4, typical_duration: '1-4 weeks' },

    // ABDOMEN
    { slug: 'ibs', name_sv: 'IBS', name_en: 'IBS', category_key: 'chronic-internal', body_zones: ['abdomen'], layers: ['organ'], specialist_type: 'Gastroenterologist', tags: ['Gastrointestinal', 'Chronic'], questions: ['hur_lange', 'utlosare', 'avforing'], severity_min: 2, severity_max: 6, typical_duration: 'chronic' },
    { slug: 'uvi', name_sv: 'Urinvägsinfektion', name_en: 'UTI', category_key: 'womens-sexual', body_zones: ['abdomen', 'pelvis'], layers: ['organ'], specialist_type: 'General Practitioner', tags: ['Infection', 'Urinary'], questions: ['hur_lange', 'sveda', 'feber'], severity_min: 2, severity_max: 6, typical_duration: '3-7 days' },
    { slug: 'gastrit', name_sv: 'Gastrit', name_en: 'Gastritis', category_key: 'chronic-internal', body_zones: ['abdomen'], layers: ['organ'], specialist_type: 'Gastroenterologist', tags: ['Gastrointestinal'], questions: ['hur_lange', 'smärta', 'ater'], severity_min: 2, severity_max: 6, typical_duration: '1-4 weeks' },
    { slug: 'appendicit', name_sv: 'Blindtarmsinflammation', name_en: 'Appendicitis', category_key: 'chronic-internal', body_zones: ['abdomen'], layers: ['organ'], specialist_type: 'Surgeon', tags: ['Acute', 'Gastrointestinal'], questions: ['hur_lange', 'smärta', 'feber'], severity_min: 6, severity_max: 9, typical_duration: 'acute' },
    { slug: 'diabetes', name_sv: 'Diabetes typ 2', name_en: 'Type 2 Diabetes', category_key: 'chronic-internal', body_zones: ['abdomen'], layers: ['organ'], specialist_type: 'Internal Medicine', tags: ['Metabolic', 'Chronic'], questions: ['hur_lange', 'symtom', 'arf'], severity_min: 2, severity_max: 7, typical_duration: 'chronic' },
    { slug: 'gallsten', name_sv: 'Gallsten', name_en: 'Gallstones', category_key: 'chronic-internal', body_zones: ['abdomen'], layers: ['organ'], specialist_type: 'Surgeon', tags: ['Gastrointestinal', 'Fatty-foods'], questions: ['hur_lange', 'smärta', 'mat'], severity_min: 4, severity_max: 8, typical_duration: 'varies' },

    // PELVIS
    { slug: 'sti', name_sv: 'Könssjukdom', name_en: 'STI', category_key: 'womens-sexual', body_zones: ['pelvis'], layers: ['skin', 'organ'], specialist_type: 'Venereologist', tags: ['Sexual Health', 'Infection'], questions: ['hur_lange', 'partner', 'symptom_extra'], severity_min: 1, severity_max: 4, typical_duration: '1-4 weeks' },
    { slug: 'endometrios', name_sv: 'Endometrios', name_en: 'Endometriosis', category_key: 'womens-sexual', body_zones: ['pelvis'], layers: ['organ'], specialist_type: 'Gynecologist', tags: ['Chronic', 'Gynecology'], questions: ['hur_lange', 'mens', 'smärta'], severity_min: 3, severity_max: 8, typical_duration: 'chronic' },
    { slug: 'pcos', name_sv: 'PCOS', name_en: 'PCOS', category_key: 'womens-sexual', body_zones: ['pelvis'], layers: ['organ'], specialist_type: 'Gynecologist', tags: ['Hormonal', 'Gynecology'], questions: ['hur_lange', 'mens', 'hormonell'], severity_min: 2, severity_max: 5, typical_duration: 'chronic' },
    { slug: 'hemorrojder', name_sv: 'Hemorrojder', name_en: 'Hemorrhoids', category_key: 'chronic-internal', body_zones: ['pelvis'], layers: ['skin', 'organ'], specialist_type: 'Surgeon', tags: ['Gastrointestinal'], questions: ['hur_lange', 'blod', 'smärta'], severity_min: 1, severity_max: 5, typical_duration: '1-4 weeks' },

    // ARMS
    { slug: 'karpaltunnel', name_sv: 'Karpaltunnelsyndrom', name_en: 'Carpal Tunnel Syndrome', category_key: 'chronic-internal', body_zones: ['left-arm', 'right-arm'], layers: ['nerve'], specialist_type: 'Neurologist', tags: ['Neurological', 'Musculoskeletal'], questions: ['hur_lange', 'natt', 'domning'], severity_min: 2, severity_max: 6, typical_duration: 'chronic' },
    { slug: 'tennisarmbage', name_sv: 'Tennisarmbåge', name_en: 'Tennis Elbow', category_key: 'chronic-internal', body_zones: ['left-arm', 'right-arm'], layers: ['muscle', 'bone'], specialist_type: 'Orthopedist', tags: ['Musculoskeletal'], questions: ['hur_lange', 'belastning', 'rorrelsehinder'], severity_min: 2, severity_max: 6, typical_duration: 'chronic' },
    { slug: 'eksem_hand', name_sv: 'Handeksem', name_en: 'Hand Eczema', category_key: 'skin-body', body_zones: ['left-arm', 'right-arm'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Chronic'], questions: ['hur_lange', 'klada', 'yrke'], severity_min: 1, severity_max: 5, typical_duration: 'chronic' },
    { slug: 'fraktur_arm', name_sv: 'Fraktur (arm)', name_en: 'Arm Fracture', category_key: 'chronic-internal', body_zones: ['left-arm', 'right-arm'], layers: ['bone'], specialist_type: 'Orthopedist', tags: ['Injury', 'Acute'], questions: ['trauma', 'smärta', 'svullnad'], severity_min: 5, severity_max: 9, typical_duration: 'acute' },
    { slug: 'psoriasis_arm', name_sv: 'Psoriasis (arm)', name_en: 'Arm Psoriasis', category_key: 'skin-body', body_zones: ['left-arm', 'right-arm'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Chronic'], questions: ['hur_lange', 'klada', 'arf'], severity_min: 1, severity_max: 5, typical_duration: 'chronic' },
    { slug: 'axeltendinit', name_sv: 'Axeltendinit', name_en: 'Shoulder Tendinitis', category_key: 'chronic-internal', body_zones: ['left-arm', 'right-arm'], layers: ['muscle'], specialist_type: 'Orthopedist', tags: ['Musculoskeletal'], questions: ['hur_lange', 'rorrelsehinder', 'natt'], severity_min: 2, severity_max: 6, typical_duration: 'chronic' },

    // LEGS
    { slug: 'knaartros', name_sv: 'Knäartros', name_en: 'Knee Osteoarthritis', category_key: 'chronic-internal', body_zones: ['left-leg', 'right-leg'], layers: ['bone'], specialist_type: 'Orthopedist', tags: ['Musculoskeletal', 'Chronic'], questions: ['hur_lange', 'rorrelsehinder', 'svullnad'], severity_min: 2, severity_max: 7, typical_duration: 'chronic' },
    { slug: 'plantar_fasciit', name_sv: 'Hälsporre', name_en: 'Plantar Fasciitis', category_key: 'chronic-internal', body_zones: ['left-leg', 'right-leg'], layers: ['muscle', 'bone'], specialist_type: 'Orthopedist', tags: ['Musculoskeletal'], questions: ['hur_lange', 'belastning', 'smärta'], severity_min: 2, severity_max: 6, typical_duration: 'chronic' },
    { slug: 'bensar', name_sv: 'Bensår', name_en: 'Leg Ulcers', category_key: 'skin-body', body_zones: ['left-leg', 'right-leg'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Vascular'], questions: ['hur_lange', 'diabetes', 'svullnad'], severity_min: 2, severity_max: 6, typical_duration: 'chronic' },
    { slug: 'djup_ventrombos', name_sv: 'DVT', name_en: 'Blood Clot', category_key: 'chronic-internal', body_zones: ['left-leg', 'right-leg'], layers: ['organ'], specialist_type: 'Vascular Surgeon', tags: ['Vascular', 'Acute'], questions: ['hur_lange', 'svullnad', 'smärta'], severity_min: 5, severity_max: 9, typical_duration: 'acute' },
    { slug: 'fotsvamp', name_sv: 'Fotsvamp', name_en: 'Athlete\'s Foot', category_key: 'skin-body', body_zones: ['left-leg', 'right-leg'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Fungal'], questions: ['hur_lange', 'spridning', 'upprepat'], severity_min: 1, severity_max: 3, typical_duration: '1-4 weeks' },
    { slug: 'ischiassmarta', name_sv: 'Ischias', name_en: 'Sciatica', category_key: 'chronic-internal', body_zones: ['left-leg', 'right-leg', 'abdomen'], layers: ['nerve', 'muscle'], specialist_type: 'Neurologist', tags: ['Neurological', 'Musculoskeletal'], questions: ['hur_lange', 'utstrålning', 'rorrelsehinder'], severity_min: 3, severity_max: 8, typical_duration: 'varies' },
    { slug: 'atopisk_dermatit', name_sv: 'Atopisk dermatit', name_en: 'Atopic Dermatitis', category_key: 'skin-body', body_zones: ['left-leg', 'right-leg', 'left-arm', 'right-arm'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Chronic'], questions: ['hur_lange', 'klada', 'arf'], severity_min: 1, severity_max: 6, typical_duration: 'chronic' },

    // SYSTEMIC
    { slug: 'psoriasis', name_sv: 'Psoriasis', name_en: 'Psoriasis', category_key: 'skin-body', body_zones: ['head', 'chest', 'left-arm', 'right-arm', 'left-leg', 'right-leg'], layers: ['skin'], specialist_type: 'Dermatologist', tags: ['Skin', 'Chronic', 'Autoimmune'], questions: ['hur_lange', 'klada', 'arf'], severity_min: 1, severity_max: 6, typical_duration: 'chronic' },
    { slug: 'utmattning', name_sv: 'Utmattningssyndrom', name_en: 'Burnout', category_key: 'mental-lifestyle', body_zones: ['head', 'chest'], layers: ['nerve', 'organ'], specialist_type: 'Psychiatrist', tags: ['Mental Health', 'Chronic'], questions: ['hur_lange', 'stress', 'jobb'], severity_min: 4, severity_max: 8, typical_duration: 'chronic' },
    { slug: 'depression', name_sv: 'Depression', name_en: 'Depression', category_key: 'mental-lifestyle', body_zones: ['head'], layers: ['nerve'], specialist_type: 'Psychiatrist', tags: ['Mental Health'], questions: ['hur_lange', 'stämning', 'sömn'], severity_min: 3, severity_max: 8, typical_duration: 'varies' },
    { slug: 'angest', name_sv: 'Ångest', name_en: 'Anxiety', category_key: 'mental-lifestyle', body_zones: ['head', 'chest'], layers: ['nerve'], specialist_type: 'Psychiatrist', tags: ['Mental Health'], questions: ['hur_lange', 'utlosare', 'panik'], severity_min: 3, severity_max: 8, typical_duration: 'varies' },
  ];

  const conditions = [];
  for (const c of conditionsData) {
    const cat = catMap[c.category_key];
    if (!cat) {
      console.error(`  ❌ Category ${c.category_key} not found for condition ${c.slug}`);
      continue;
    }
    const created = await prisma.condition.create({
      data: {
        slug: c.slug,
        name_sv: c.name_sv,
        name_en: c.name_en,
        category_id: cat.id,
        body_zones: c.body_zones,
        layers: c.layers || [],
        questions: c.questions || [],
        specialist_type: c.specialist_type || null,
        severity_min: c.severity_min,
        severity_max: c.severity_max,
        typical_duration: c.typical_duration,
        min_age: (c as any).min_age ?? 0,
        tags: c.tags,
        audit_url: (c as any).audit_url || null,
      },
    });
    conditions.push(created);
  }
  console.log(`  ✅ Created ${conditions.length} conditions`);

  // ─── DOCTORS ──────────────────────────────────────────────────
  console.log('👨‍⚕️ Creating doctors...');

  await prisma.doctor.createMany({
    data: [
      {
        name: 'Dr. Vibeke Billing',
        specialty: 'General Practitioner - Respiratory',
        condition_tags: ['respiratory', 'cough', 'sinus', 'infection', 'eye'],
        body_zones: ['chest', 'lungs', 'throat', 'head', 'nose', 'eyes'],
        avg_rating: 4.9,
        response_time_hours: 1.5,
        avatar_url: '/avatars/vibeke.jpg',
        is_available: true,
        languages: ['sv', 'en', 'da'],
      },
      {
        name: 'Dr. Erik Lindqvist',
        specialty: 'Dermatologist',
        condition_tags: ['skin', 'acne', 'eczema', 'rash', 'fungus', 'mole', 'insect', 'sting', 'warts'],
        body_zones: ['skin', 'face', 'back', 'hands', 'arms', 'feet', 'nails', 'full-body'],
        avg_rating: 4.8,
        response_time_hours: 2.0,
        avatar_url: '/avatars/erik.jpg',
        is_available: true,
        languages: ['sv', 'en'],
      },
      {
        name: 'Dr. Anna Svensson',
        specialty: 'Gynecologist',
        condition_tags: ['womens-health', 'pregnancy', 'menstruation', 'sexual-health', 'sti', 'contraception', 'menopause', 'uti'],
        body_zones: ['reproductive', 'genitals', 'urinary', 'lower-abdomen', 'full-body', 'mouth'],
        avg_rating: 4.9,
        response_time_hours: 1.0,
        avatar_url: '/avatars/anna.jpg',
        is_available: true,
        languages: ['sv', 'en', 'no'],
      },
      {
        name: 'Dr. Lars Johansson',
        specialty: 'Psychiatrist',
        condition_tags: ['mental-health', 'sleep', 'stress', 'anxiety', 'depression', 'burnout', 'lifestyle', 'addiction'],
        body_zones: ['head', 'full-body', 'chest'],
        avg_rating: 4.7,
        response_time_hours: 2.5,
        avatar_url: '/avatars/lars.jpg',
        is_available: true,
        languages: ['sv', 'en'],
      },
      {
        name: 'Dr. Maria Ek',
        specialty: 'Internal Medicine',
        condition_tags: ['chronic', 'pain', 'joints', 'arthritis', 'internal', 'stomach', 'digestive', 'thyroid', 'hormones', 'hemorrhoids'],
        body_zones: ['back', 'spine', 'joints', 'knees', 'hips', 'head', 'abdomen', 'stomach', 'throat', 'lower-abdomen', 'rectum', 'full-body'],
        avg_rating: 4.8,
        response_time_hours: 2.0,
        avatar_url: '/avatars/maria.jpg',
        is_available: true,
        languages: ['sv', 'en', 'fi'],
      },
      {
        name: 'Dr. Sofia Bergström',
        specialty: 'Pediatrician',
        condition_tags: ['children', 'respiratory', 'skin', 'infection', 'stomach', 'pain', 'allergy', 'emergency'],
        body_zones: ['chest', 'throat', 'skin', 'eyes', 'head', 'full-body', 'abdomen', 'stomach', 'feet', 'hands', 'nails', 'urinary', 'lower-abdomen'],
        avg_rating: 4.9,
        response_time_hours: 1.5,
        avatar_url: '/avatars/sofia.jpg',
        is_available: true,
        languages: ['sv', 'en'],
      },
    ],
  });
  console.log('  ✅ Created 6 doctors');

  // ─── SEARCH INDEX ─────────────────────────────────────────────
  console.log('🔍 Building search index...');

  const searchEntries: {
    term: string;
    condition_id: string;
    weight: number;
    lang: string;
  }[] = [];

  for (const cond of conditions) {
    // Swedish terms
    searchEntries.push({ term: cond.name_sv.toLowerCase(), condition_id: cond.id, weight: 1.0, lang: 'sv' });
    // Also add slug as searchable term (Swedish)
    searchEntries.push({ term: cond.slug.replace(/-/g, ' '), condition_id: cond.id, weight: 0.8, lang: 'sv' });

    // English terms
    searchEntries.push({ term: cond.name_en.toLowerCase(), condition_id: cond.id, weight: 1.0, lang: 'en' });

    // Add tags as search terms (both languages)
    for (const tag of cond.tags) {
      searchEntries.push({ term: tag.toLowerCase(), condition_id: cond.id, weight: 0.6, lang: 'sv' });
      searchEntries.push({ term: tag.toLowerCase(), condition_id: cond.id, weight: 0.6, lang: 'en' });
    }
  }

  await prisma.searchIndex.createMany({ data: searchEntries });
  console.log(`  ✅ Created ${searchEntries.length} search index entries`);

  // Create trigram index on search_index.term for faster fuzzy search
  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS idx_search_index_term_trgm
    ON search_index USING gin (term gin_trgm_ops);
  `);
  console.log('  ✅ Created trigram index');

  console.log('\n🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
