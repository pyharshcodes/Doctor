export interface TrustStat {
  id: string;
  numericValue: number;
  suffix: string;
  label: string;
  detail: string;
}

export interface Specialty {
  slug: string;
  number: string;
  name: string;
  shortTagline: string;
  shortDescription: string;
  fullDescription: string;
  conditions: string[];
  diagnostics: string[];
  consultationDuration: string;
  leadDoctorSlug: string;
  iconName:
    | 'HeartPulse'
    | 'Brain'
    | 'Bone'
    | 'Sparkles'
    | 'Baby'
    | 'Flower2'
    | 'Smile'
    | 'Stethoscope';
  featured?: boolean;
  image?: string;
}

export interface Doctor {
  slug: string;
  name: string;
  role: string;
  specialtySlug: string;
  specialtyName: string;
  experience: string;
  qualifications: string;
  availability: string;
  availableDays: number[]; // 0=Sun..6=Sat
  image?: string;
  initials: string;
  showcase: boolean;
  languages: string[];
  consultationFeeDemo: string;
  consultationDuration: string;
  philosophy: string;
  bio: string;
  clinicalFocus: string[];
  timeSlots: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  architecturalNote: string;
  image: string;
  aspectClass: string;
}

export interface TestimonialItem {
  id: string;
  initials: string;
  illustrativeName: string;
  department: string;
  quote: string;
  visitContext: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Appointments' | 'Consultation' | 'Policies';
}

export const CLINIC_INFO = {
  brandName: 'AURELIA',
  fullName: 'AURELIA Medical Centre',
  tagline: 'Excellence in Multi-Specialty Care',
  addressLine1: '42 Aurelia Pavilion, Lavelle Road',
  addressLine2: 'Bengaluru, Karnataka 560001 (Illustrative Address)',
  phoneDisplay: '+91 (80) 4120-8800',
  phoneHref: 'tel:+918041208800',
  email: 'concierge@aurelia-clinic.example',
  hoursWeekday: 'Monday – Saturday · 8:00 AM – 8:00 PM',
  hoursSunday: 'Sunday · 9:30 AM – 1:30 PM (Scheduled Follow-ups)',
  emergencyNumber: '112 / 108',
  demoBannerText:
    'Showcase Demonstration Environment — Profiles, clinic metrics, and bookings are illustrative and stored locally.',
};

export const TRUST_STATS: TrustStat[] = [
  {
    id: 'experience',
    numericValue: 15,
    suffix: '+',
    label: 'Years of Experience',
    detail: 'Multidisciplinary clinical heritage',
  },
  {
    id: 'specialties',
    numericValue: 12,
    suffix: '',
    label: 'Medical Specialties',
    detail: 'Coordinated under one roof',
  },
  {
    id: 'doctors',
    numericValue: 25,
    suffix: '+',
    label: 'Expert Doctors',
    detail: 'Board-certified senior consultants',
  },
  {
    id: 'patients',
    numericValue: 10000,
    suffix: '+',
    label: 'Happy Patients',
    detail: 'Illustrative demonstration volume',
  },
];

export const SPECIALTIES: Specialty[] = [
  {
    slug: 'cardiology',
    number: '01',
    name: 'Cardiology',
    shortTagline: 'Preventive & Interventional Heart Care',
    shortDescription:
      'Comprehensive cardiovascular diagnostics, arrhythmia management, and long-term preventive heart wellness tailored to individual risk profiles.',
    fullDescription:
      'Our Cardiology suite pairs precision non-invasive diagnostics with unhurried specialist consultations. Every assessment integrates metabolic, lifestyle, and hereditary markers to safeguard long-term vascular and cardiac resilience.',
    conditions: [
      'Hypertension & Resistant Blood Pressure',
      'Coronary Risk Screening & Lipid Disorders',
      'Arrhythmia & Palpitation Evaluation',
      'Heart Failure Continuity & Rehabilitation',
      'Preventive Executive Cardiac Assessments',
    ],
    diagnostics: [
      '12-Lead Digital Resting ECG',
      'High-Resolution 2D Echocardiography',
      'Ambulatory Holter Rhythm Monitoring',
      'Treadmill Stress Evaluation (TMT)',
    ],
    consultationDuration: '35–45 mins',
    leadDoctorSlug: 'dr-aarav-mehta',
    iconName: 'HeartPulse',
    featured: true,
    image: '/images/specialty-cardiology.jpg',
  },
  {
    slug: 'neurology',
    number: '02',
    name: 'Neurology',
    shortTagline: 'Brain, Spine & Peripheral Nerve Care',
    shortDescription:
      'Evidence-led diagnosis and management for migraine syndromes, movement disorders, neuropathies, and cognitive health with empathetic guidance.',
    fullDescription:
      'AURELIA’s Neurology department delivers structured evaluation of complex headaches, nerve conduction conditions, sleep-related neurological symptoms, and early cognitive care in a calm, acoustically serene setting.',
    conditions: [
      'Chronic Migraine & Cluster Headaches',
      'Peripheral Neuropathy & Nerve Entrapment',
      'Epilepsy & Seizure Disorder Management',
      'Memory, Cognitive & Sleep Disorders',
      'Vertigo & Balance Evaluation',
    ],
    diagnostics: [
      'Video EEG Neuro-Monitoring',
      'Nerve Conduction Velocity (NCV) Study',
      'Electromyography (EMG) Diagnostics',
      'Coordinated Neuro-Imaging Review',
    ],
    consultationDuration: '40 mins',
    leadDoctorSlug: 'dr-ananya-sharma',
    iconName: 'Brain',
    featured: true,
  },
  {
    slug: 'orthopedics',
    number: '03',
    name: 'Orthopedics',
    shortTagline: 'Joint Preservation, Spine & Sports Medicine',
    shortDescription:
      'Restoring pain-free mobility through conservative rehabilitation, targeted joint preservation, and precision musculoskeletal planning.',
    fullDescription:
      'Focused on keeping patients active without rushed surgical decisions, our Orthopedic unit aligns biomechanics, physical therapy protocols, and specialist care for sports injuries, spinal strain, and joint longevity.',
    conditions: [
      'Knee, Hip & Shoulder Osteoarthritis',
      'Ligament Sprains & Sports Injuries',
      'Cervical & Lumbar Spine Care',
      'Tendinopathy & Repetitive Strain',
      'Post-Fracture Functional Recovery',
    ],
    diagnostics: [
      'Digital Musculoskeletal X-Ray Alignment',
      'Dynamic Joint Ultrasound Assessment',
      'Gait & Posture Biomechanical Screening',
    ],
    consultationDuration: '30 mins',
    leadDoctorSlug: 'dr-rohan-kapoor',
    iconName: 'Bone',
  },
  {
    slug: 'dermatology',
    number: '04',
    name: 'Dermatology',
    shortTagline: 'Clinical Skin Health & Aesthetic Medicine',
    shortDescription:
      'Root-cause dermatological diagnosis for chronic skin conditions alongside subtle, evidence-based regenerative skin therapies.',
    fullDescription:
      'Combining clinical dermatopathology rigor with conservative aesthetic precision, our Dermatology clinic addresses eczema, acne scarring, hair vitality, pigment regulation, and full-body mole mapping.',
    conditions: [
      'Eczema, Psoriasis & Autoimmune Skin Care',
      'Adult & Hormonal Acne Protocols',
      'Alopecia & Scalp Health Restoration',
      'Pigmentation & Melasma Management',
      'Digital Dermoscopy & Mole Mapping',
    ],
    diagnostics: [
      'Polarized Digital Dermoscopy',
      'Trichoscopy Hair Follicle Analysis',
      'Targeted Allergy Patch Testing',
    ],
    consultationDuration: '30 mins',
    leadDoctorSlug: 'dr-meera-iyer',
    iconName: 'Sparkles',
  },
  {
    slug: 'pediatrics',
    number: '05',
    name: 'Pediatrics',
    shortTagline: 'Gentle Developmental & Adolescent Care',
    shortDescription:
      'Warm, reassuring consultations covering childhood milestones, immunization planning, respiratory wellness, and adolescent nutrition.',
    fullDescription:
      'Designed to remove clinical anxiety for both child and parent, our Pediatric suites combine unhurried growth assessments, preventive immunization schedules, and direct specialist access for acute childhood concerns.',
    conditions: [
      'Newborn & Infant Developmental Checks',
      'Pediatric Immunization Programs',
      'Childhood Asthma & Allergy Care',
      'Nutritional & Growth Trajectory Guidance',
    ],
    diagnostics: [
      'Pediatric Spirometry & Allergy Screening',
      'Vision & Hearing Developmental Checks',
      'Point-of-Care Rapid Diagnostics',
    ],
    consultationDuration: '30 mins',
    leadDoctorSlug: 'dr-kavya-menon',
    iconName: 'Baby',
  },
  {
    slug: 'gynecology',
    number: '06',
    name: 'Gynecology',
    shortTagline: 'Women’s Wellness Across Every Stage',
    shortDescription:
      'Private, compassionate women’s healthcare spanning hormonal balance, preventive screenings, fertility guidance, and perimenopause care.',
    fullDescription:
      'In dedicated privacy-first consultation suites, our Gynecology specialists support women through reproductive health, PCOS management, prenatal coordination, and midlife metabolic transitions with dignity and clarity.',
    conditions: [
      'PCOS & Endocrine Cycle Balance',
      'Preventive Cervical & Breast Screening',
      'Preconception & Antenatal Guidance',
      'Perimenopause & Bone Health Programs',
    ],
    diagnostics: [
      'High-Definition Pelvic Ultrasound',
      'Comprehensive Hormonal Panel Coordination',
      'Liquid-Based Cytology Screening',
    ],
    consultationDuration: '35 mins',
    leadDoctorSlug: 'dr-nandini-rao',
    iconName: 'Flower2',
  },
  {
    slug: 'dentistry',
    number: '07',
    name: 'Dentistry',
    shortTagline: 'Restorative, Preventive & Aesthetic Oral Care',
    shortDescription:
      'Minimally invasive dental artistry, digital smile planning, periodontal health, and calm anxiety-free restorative procedures.',
    fullDescription:
      'Our dental studio prioritizes enamel preservation, precision ceramic restorations, and gentle preventive hygiene using low-radiation digital scanning instead of uncomfortable traditional impressions.',
    conditions: [
      'Preventive Periodontal & Gum Care',
      'Microscopic Endodontics & Root Therapy',
      'Minimal-Prep Ceramic Veneers & Crowns',
      'Clear Aligner Bite Alignment',
    ],
    diagnostics: [
      '3D Intraoral Optical Scanning',
      'Low-Dose Digital RVG & OPG Imaging',
      'Bite Force & TMJ Assessment',
    ],
    consultationDuration: '40 mins',
    leadDoctorSlug: 'dr-siddharth-verma',
    iconName: 'Smile',
  },
  {
    slug: 'general-medicine',
    number: '08',
    name: 'General Medicine',
    shortTagline: 'Comprehensive Primary & Longevity Care',
    shortDescription:
      'Thoughtful primary physicians coordinating chronic disease prevention, metabolic health, travel medicine, and multi-specialty referrals.',
    fullDescription:
      'Serving as your medical anchor at AURELIA, our Internal & General Medicine consultants look across organ systems—translating annual labs, fatigue, metabolic shifts, and acute illnesses into clear, cohesive plans.',
    conditions: [
      'Diabetes, Thyroid & Metabolic Care',
      'Executive Annual Health Audits',
      'Acute Fever & Respiratory Infections',
      'Preventive Adult Vaccination & Travel Health',
    ],
    diagnostics: [
      'Comprehensive Blood & Biomarker Panels',
      'Resting Metabolic & Body Composition Review',
      'Coordinated Same-Day Lab Reporting',
    ],
    consultationDuration: '30 mins',
    leadDoctorSlug: 'dr-vikram-sethi',
    iconName: 'Stethoscope',
  },
];

export const DOCTORS: Doctor[] = [
  {
    slug: 'dr-aarav-mehta',
    name: 'Dr. Aarav Mehta',
    role: 'Senior Cardiologist',
    specialtySlug: 'cardiology',
    specialtyName: 'Cardiology',
    experience: '18 Years Experience',
    qualifications: 'MD, DM (Cardiology), FACC',
    availability: 'Mon – Fri · 9:00 AM – 2:00 PM',
    availableDays: [1, 2, 3, 4, 5],
    image: '/images/doctor-aarav.jpg',
    initials: 'AM',
    showcase: true,
    languages: ['English', 'Hindi', 'Gujarati'],
    consultationFeeDemo: '₹1,800 (Illustrative)',
    consultationDuration: '40 mins',
    philosophy:
      'Preventive cardiology succeeds when patients understand the story behind their numbers—never through hurried five-minute prescriptions.',
    bio: 'Dr. Aarav Mehta leads AURELIA’s Cardiovascular Wellness practice with nearly two decades of clinical leadership in non-invasive imaging, resistant hypertension, and personalized lipid management. Known for calm, unhurried consultations, he works closely with patients to prevent cardiac events years before symptoms arise.',
    clinicalFocus: [
      'Preventive Cardiology & Risk Stratification',
      'Complex Hypertension Management',
      'Echocardiography & Heart Failure Care',
      'Executive Cardiovascular Longevity',
    ],
    timeSlots: {
      morning: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM'],
      afternoon: ['12:00 PM', '12:45 PM', '01:30 PM'],
      evening: [],
    },
  },
  {
    slug: 'dr-ananya-sharma',
    name: 'Dr. Ananya Sharma',
    role: 'Neurologist',
    specialtySlug: 'neurology',
    specialtyName: 'Neurology',
    experience: '14 Years Experience',
    qualifications: 'MD, DM (Neurology), Clinical Neurophysiology Fellow',
    availability: 'Mon – Sat · 10:30 AM – 4:00 PM',
    availableDays: [1, 2, 3, 4, 5, 6],
    image: '/images/doctor-ananya.jpg',
    initials: 'AS',
    showcase: true,
    languages: ['English', 'Hindi', 'Kannada'],
    consultationFeeDemo: '₹1,600 (Illustrative)',
    consultationDuration: '40 mins',
    philosophy:
      'Neurological symptoms touch daily confidence deeply. Careful listening is often the single most powerful diagnostic tool we hold.',
    bio: 'Trained at premier national institutes with advanced fellowship experience in electrophysiology, Dr. Ananya Sharma specializes in refractory migraine care, peripheral neuropathies, and sleep-neurological health. Her practice prioritizes root-cause diagnostic clarity and sustainable non-sedating care.',
    clinicalFocus: [
      'Refractory Migraine & Headache Syndromes',
      'Peripheral Neuropathy & EMG/NCV Diagnostics',
      'Memory & Early Cognitive Evaluation',
      'Vestibular & Balance Disorders',
    ],
    timeSlots: {
      morning: ['10:30 AM', '11:15 AM'],
      afternoon: ['12:15 PM', '02:00 PM', '02:45 PM', '03:30 PM'],
      evening: [],
    },
  },
  {
    slug: 'dr-rohan-kapoor',
    name: 'Dr. Rohan Kapoor',
    role: 'Orthopedic Specialist',
    specialtySlug: 'orthopedics',
    specialtyName: 'Orthopedics',
    experience: '16 Years Experience',
    qualifications: 'MS (Orthopedics), DNB, Fellowship in Joint Preservation',
    availability: 'Tue – Sat · 11:00 AM – 5:30 PM',
    availableDays: [2, 3, 4, 5, 6],
    image: '/images/doctor-rohan.jpg',
    initials: 'RK',
    showcase: true,
    languages: ['English', 'Hindi', 'Punjabi'],
    consultationFeeDemo: '₹1,500 (Illustrative)',
    consultationDuration: '30 mins',
    philosophy:
      'Movement is independence. Whenever biology permits, we preserve the native joint first and reserve surgery strictly for when it truly adds years of quality.',
    bio: 'Dr. Rohan Kapoor directs Joint Preservation & Sports Musculoskeletal Care at AURELIA. With over 16 years treating athletes and active adults, he pairs precision diagnostic ultrasound with structured physiotherapy pathways to accelerate recovery without unnecessary interventions.',
    clinicalFocus: [
      'Knee & Hip Joint Preservation',
      'Ligament & Sports Injury Recovery',
      'Spine Posture & Sciatica Care',
      'Targeted Orthobiologic Guidance',
    ],
    timeSlots: {
      morning: ['11:00 AM', '11:30 AM'],
      afternoon: ['12:30 PM', '02:30 PM', '03:15 PM', '04:00 PM'],
      evening: ['04:45 PM', '05:15 PM'],
    },
  },
  {
    slug: 'dr-meera-iyer',
    name: 'Dr. Meera Iyer',
    role: 'Dermatologist',
    specialtySlug: 'dermatology',
    specialtyName: 'Dermatology',
    experience: '12 Years Experience',
    qualifications: 'MD (Dermatology, Venereology & Leprology)',
    availability: 'Mon – Fri · 10:00 AM – 4:30 PM',
    availableDays: [1, 2, 3, 4, 5],
    image: '/images/doctor-meera.jpg',
    initials: 'MI',
    showcase: true,
    languages: ['English', 'Tamil', 'Hindi'],
    consultationFeeDemo: '₹1,400 (Illustrative)',
    consultationDuration: '30 mins',
    philosophy:
      'Healthy skin reflects internal balance and barrier respect—never aggressive over-treatment or fleeting trends.',
    bio: 'Dr. Meera Iyer combines evidence-based clinical dermatology with subtle regenerative skin restoration. She works closely with patients experiencing chronic inflammatory dermatoses, hair thinning, and pigment sensitivity to craft calm, sustainable regimens.',
    clinicalFocus: [
      'Chronic Eczema & Psoriasis Care',
      'Hair Follicle & Scalp Diagnostics',
      'Hormonal Acne & Barrier Repair',
      'Digital Dermoscopy & Skin Cancer Screening',
    ],
    timeSlots: {
      morning: ['10:00 AM', '10:40 AM', '11:20 AM'],
      afternoon: ['12:30 PM', '02:15 PM', '03:00 PM', '03:45 PM'],
      evening: ['04:15 PM'],
    },
  },
  // Attending Department Consultants (Illustrative — enables booking across all 8 specialties)
  {
    slug: 'dr-kavya-menon',
    name: 'Dr. Kavya Menon',
    role: 'Consultant Pediatrician (Department Lead)',
    specialtySlug: 'pediatrics',
    specialtyName: 'Pediatrics',
    experience: '11 Years Experience',
    qualifications: 'MD (Pediatrics), Fellowship in Developmental Care',
    availability: 'Mon – Sat · 9:30 AM – 3:30 PM',
    availableDays: [1, 2, 3, 4, 5, 6],
    initials: 'KM',
    showcase: false,
    languages: ['English', 'Malayalam', 'Hindi'],
    consultationFeeDemo: '₹1,200 (Illustrative)',
    consultationDuration: '30 mins',
    philosophy:
      'Calm parents raise confident children; every pediatric visit begins with reassuring clarity and zero rush.',
    bio: 'Illustrative department consultant leading pediatric developmental wellness, preventive immunization, and childhood respiratory care within the AURELIA booking showcase.',
    clinicalFocus: [
      'Infant & Adolescent Growth Wellness',
      'Childhood Allergy & Asthma Management',
      'Tailored Immunization Schedules',
    ],
    timeSlots: {
      morning: ['09:30 AM', '10:15 AM', '11:00 AM'],
      afternoon: ['12:30 PM', '02:00 PM', '02:45 PM'],
      evening: [],
    },
  },
  {
    slug: 'dr-nandini-rao',
    name: 'Dr. Nandini Rao',
    role: 'Consultant Gynecologist (Department Lead)',
    specialtySlug: 'gynecology',
    specialtyName: 'Gynecology',
    experience: '15 Years Experience',
    qualifications: 'MD (OBG), DNB, FMAS',
    availability: 'Mon – Fri · 10:00 AM – 5:00 PM',
    availableDays: [1, 2, 3, 4, 5],
    initials: 'NR',
    showcase: false,
    languages: ['English', 'Kannada', 'Telugu'],
    consultationFeeDemo: '₹1,500 (Illustrative)',
    consultationDuration: '35 mins',
    philosophy:
      'Every stage of a woman’s health deserves privacy, evidence, and deeply respectful dialogue.',
    bio: 'Illustrative department consultant overseeing endocrine gynecology, preventive screening, and holistic midlife transition care at AURELIA.',
    clinicalFocus: [
      'PCOS & Hormonal Balance',
      'Preventive Women’s Screenings',
      'Perimenopause Wellness Programs',
    ],
    timeSlots: {
      morning: ['10:00 AM', '10:45 AM', '11:30 AM'],
      afternoon: ['02:00 PM', '02:45 PM', '03:30 PM'],
      evening: ['04:30 PM'],
    },
  },
  {
    slug: 'dr-siddharth-verma',
    name: 'Dr. Siddharth Verma',
    role: 'Restorative & Aesthetic Dentist (Department Lead)',
    specialtySlug: 'dentistry',
    specialtyName: 'Dentistry',
    experience: '13 Years Experience',
    qualifications: 'MDS (Prosthodontics & Implantology)',
    availability: 'Tue – Sat · 10:00 AM – 6:30 PM',
    availableDays: [2, 3, 4, 5, 6],
    initials: 'SV',
    showcase: false,
    languages: ['English', 'Hindi'],
    consultationFeeDemo: '₹1,100 (Illustrative)',
    consultationDuration: '40 mins',
    philosophy:
      'Precision dentistry feels effortless when digital diagnostics replace guesswork and comfort leads every procedure.',
    bio: 'Illustrative department lead focused on minimally invasive ceramic restorations, digital bite alignment, and anxiety-free preventive oral healthcare.',
    clinicalFocus: [
      'Digital Smile Rehabilitation',
      'Minimally Invasive Restorative Care',
      'Preventive Periodontal Maintenance',
    ],
    timeSlots: {
      morning: ['10:00 AM', '11:00 AM'],
      afternoon: ['12:30 PM', '03:00 PM', '04:00 PM'],
      evening: ['05:00 PM', '06:00 PM'],
    },
  },
  {
    slug: 'dr-vikram-sethi',
    name: 'Dr. Vikram Sethi',
    role: 'Senior Physician — General Medicine',
    specialtySlug: 'general-medicine',
    specialtyName: 'General Medicine',
    experience: '19 Years Experience',
    qualifications: 'MD (Internal Medicine), MRCP',
    availability: 'Mon – Sat · 8:30 AM – 6:00 PM',
    availableDays: [1, 2, 3, 4, 5, 6],
    initials: 'VS',
    showcase: false,
    languages: ['English', 'Hindi'],
    consultationFeeDemo: '₹1,200 (Illustrative)',
    consultationDuration: '30 mins',
    philosophy:
      'Great internal medicine connects every symptom and lab marker into one coherent story for your future vitality.',
    bio: 'Illustrative senior internal medicine consultant coordinating primary care, metabolic optimization, and multi-specialty preventive evaluations.',
    clinicalFocus: [
      'Metabolic & Diabetes Care',
      'Annual Preventive Health Audits',
      'Acute Internal Medicine Consultations',
    ],
    timeSlots: {
      morning: ['08:30 AM', '09:15 AM', '10:00 AM', '11:15 AM'],
      afternoon: ['02:00 PM', '03:00 PM'],
      evening: ['05:00 PM', '05:30 PM'],
    },
  },
];

export const ABOUT_PILLARS = [
  {
    number: '01',
    title: 'Patient-First Philosophy',
    description:
      'Consultations scheduled at 30 to 45 minutes allow space to ask every question and leave with a clear, written care roadmap.',
  },
  {
    number: '02',
    title: 'Experienced Medical Professionals',
    description:
      'Senior specialists collaborate across departments internally so complex symptoms never fall between fragmented referrals.',
  },
  {
    number: '03',
    title: 'Modern Facilities',
    description:
      'Acoustic suites, daylight architecture, and integrated same-floor diagnostics replace chaotic waiting rooms with calm precision.',
  },
  {
    number: '04',
    title: 'Personalized Treatment',
    description:
      'Every clinical recommendation weighs your biomarkers, occupation, family history, and personal comfort goals.',
  },
  {
    number: '05',
    title: 'Compassionate Healthcare',
    description:
      'From valet arrival to post-visit coordinator follow-ups, warmth and clinical rigor walk side by side.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    initials: 'R. N.',
    illustrativeName: 'R. Nair (Illustrative Patient Profile)',
    department: 'Cardiology Consultation',
    visitContext: 'Preventive Cardiac Evaluation',
    quote:
      'For the first time in my life, a cardiologist spent forty minutes explaining every echocardiogram measure in plain language. Walking into AURELIA felt like entering a quiet sanctuary rather than a rushed hospital corridor.',
  },
  {
    id: 't2',
    initials: 'S. K.',
    illustrativeName: 'S. Kulkarni (Illustrative Patient Profile)',
    department: 'Neurology & Diagnostics',
    visitContext: 'Chronic Migraine Pathway',
    quote:
      'From booking my slot online to receiving my diagnostic results the same afternoon, every handoff was seamless. Dr. Sharma listened without interrupting once—that calm clarity alone relieved half my anxiety.',
  },
  {
    id: 't3',
    initials: 'A. D.',
    illustrativeName: 'A. Deshmukh (Illustrative Patient Profile)',
    department: 'Orthopedics & Rehabilitation',
    visitContext: 'Knee Joint Preservation',
    quote:
      'I expected to be pushed straight toward surgery. Instead, Dr. Kapoor laid out a clear conservative preservation plan backed by dynamic imaging. Six months later, I am back to morning walks completely pain-free.',
  },
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'reception',
    title: 'Reception',
    category: 'Arrival & Concierge',
    caption:
      'Honed limestone and warm walnut welcome guests with discreet check-in and minimal wait times.',
    architecturalNote: 'Ground Pavilion · Private Check-in Concierge',
    image: '/images/facility-reception.jpg',
    aspectClass: 'md:col-span-7 aspect-[16/10]',
  },
  {
    id: 'consultation',
    title: 'Consultation Rooms',
    category: 'Private Suites',
    caption:
      'Sound-insulated daylight suites arranged around conversation rather than clinical barriers.',
    architecturalNote: 'Acoustic Privacy · Natural Daylight',
    image: '/images/facility-consultation.jpg',
    aspectClass: 'md:col-span-5 aspect-[4/3] md:aspect-auto',
  },
  {
    id: 'diagnostics',
    title: 'Diagnostic Facilities',
    category: 'Imaging & Cardio-Lab',
    caption:
      'High-definition imaging, digital ECG, and ultrasound integrated steps from your specialist.',
    architecturalNote: 'Same-Floor Precision Diagnostics',
    image: '/images/facility-diagnostics.jpg',
    aspectClass: 'md:col-span-4 aspect-[4/3]',
  },
  {
    id: 'lounge',
    title: 'Waiting Lounge',
    category: 'Quiet Sanctuary',
    caption:
      'Spacious seating, herbal infusions, and acoustic calm thoughtfully spaced for comfort and privacy.',
    architecturalNote: 'Artisan Seating · Complimentary Refreshments',
    image: '/images/facility-lounge.jpg',
    aspectClass: 'md:col-span-4 aspect-[4/3]',
  },
  {
    id: 'equipment',
    title: 'Medical Equipment',
    category: 'Clinical Precision',
    caption:
      'Hospital-grade sterilization and calibrated digital diagnostic instruments maintained to international standards.',
    architecturalNote: 'Calibrated Digital Instrumentation',
    image: '/images/facility-equipment.jpg',
    aspectClass: 'md:col-span-4 aspect-[4/3]',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-book',
    question: 'How can I book an appointment?',
    answer:
      'You can schedule directly through our 7-step online booking experience in under two minutes—selecting your specialty, preferred doctor, date, and real-time time slot. In this showcase demo, confirmed bookings are saved locally in your browser so you can review, reschedule, or test availability immediately.',
    category: 'Appointments',
  },
  {
    id: 'faq-doctor',
    question: 'Can I choose my preferred doctor?',
    answer:
      'Yes. During Step 2 of the appointment journey—or directly from any physician’s profile page—you may select your preferred senior specialist or choose the earliest available consultant within that medical department.',
    category: 'Appointments',
  },
  {
    id: 'faq-bring',
    question: 'What should I bring to my consultation?',
    answer:
      'Please carry a valid government photo ID, any recent laboratory reports or imaging scans from the past six months, and a current list of prescription medications or supplements. Arriving 10 minutes ahead of your slot ensures a calm, unhurried check-in.',
    category: 'Consultation',
  },
  {
    id: 'faq-walkin',
    question: 'Do you accept walk-in patients?',
    answer:
      'While pre-scheduled appointments allow us to guarantee unhurried 30–45 minute consultations with zero crowding, AURELIA reserves dedicated daily buffers for same-day urgent general medicine and pediatric walk-in evaluations depending on consultant availability.',
    category: 'Policies',
  },
  {
    id: 'faq-reschedule',
    question: 'How can I reschedule my appointment?',
    answer:
      'In a live clinical deployment, patients receive an SMS and email link to modify their time up to 4 hours beforehand. In this interactive demonstration, open "Saved Demo Bookings" from the booking header to reschedule or cancel your saved demonstration visit instantly.',
    category: 'Appointments',
  },
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return DOCTORS.find((doc) => doc.slug === slug);
}

export function getSpecialtyBySlug(slug: string): Specialty | undefined {
  return SPECIALTIES.find((spec) => spec.slug === slug);
}

export function getDoctorsForSpecialty(specialtySlug: string): Doctor[] {
  return DOCTORS.filter((doc) => doc.specialtySlug === specialtySlug);
}

