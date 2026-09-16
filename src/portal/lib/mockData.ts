import { Organization, Teacher, Student, HomeworkTopic, ClassSession, UserProfile, CourseItem } from '../types';

export const initialOrganizations: Organization[] = [
  {
    id: 'org-arabic-academy',
    name: 'ArabiyatLearn — Arabic Made Simple for Kids',
    domain: 'arabiyatlearn.com',
    logoUrl: '/arabiyat-logo.png',
    primaryColor: '#0C3E35',
    accentColor: '#C8707E',
    activeMonth: '2026-09',
    managerName: 'Academy Director',
    managerEmail: 'admin@arabiyatlearn.com',
    plan: 'academy',
    subscriptionStatus: 'active',
    maxTeachers: 999,
    maxStudents: 9999,
    createdAt: '2026-09-01',
  }
];

export const initialProfiles: UserProfile[] = [
  {
    id: 'usr-director',
    orgId: 'org-arabic-academy',
    role: 'admin',
    name: 'Academy Director',
    email: 'admin@arabiyatlearn.com',
    password: 'admin123',
    phone: '',
  }
];

export const initialTeachers: Teacher[] = [];

export const initialStudents: Student[] = [];

export const initialHomeworkTopics: HomeworkTopic[] = [
  { id: 'top-1', orgId: 'org-arabic-academy', title: 'Fruits', isCustom: false },
  { id: 'top-2', orgId: 'org-arabic-academy', title: 'Numbers', isCustom: false },
  { id: 'top-3', orgId: 'org-arabic-academy', title: 'Shapes', isCustom: false },
  { id: 'top-4', orgId: 'org-arabic-academy', title: 'Colors', isCustom: false },
  { id: 'top-5', orgId: 'org-arabic-academy', title: 'Alphabet', isCustom: false },
  { id: 'top-6', orgId: 'org-arabic-academy', title: 'Animals', isCustom: false },
  { id: 'top-7', orgId: 'org-arabic-academy', title: 'Family', isCustom: false },
  { id: 'top-8', orgId: 'org-arabic-academy', title: 'Greetings', isCustom: false },
  { id: 'top-9', orgId: 'org-arabic-academy', title: 'Vocabulary', isCustom: false },
  { id: 'top-10', orgId: 'org-arabic-academy', title: 'Speaking', isCustom: false },
  { id: 'top-11', orgId: 'org-arabic-academy', title: 'Reading', isCustom: false },
  { id: 'top-12', orgId: 'org-arabic-academy', title: 'Revision', isCustom: false },
];

export const initialCourses: CourseItem[] = [
  {
    id: 'course-1',
    orgId: 'org-arabic-academy',
    slug: 'arabic-alphabet-phonics',
    title: 'Arabic Alphabet & Phonics Playground',
    description: 'An interactive journey through the 28 Arabic letters with fun phonetic games, shape recognition, and foundational sounds. Perfect for children with zero prior Arabic knowledge.',
    level: 'Beginner',
    category: 'Alphabet',
    price: 49,
    lessonsCount: 16,
    duration: '8 weeks',
    thumbnailUrl: '/assets/course-thumb-1.jpg',
    outcomes: [
      'Recognize all 28 Arabic letters',
      'Letter forms (isolated, start, middle, end)',
      'Short vowels (Fatha, Kasra, Damma)',
      'Basic letter joining and word formation',
    ],
    status: 'Published',
  },
  {
    id: 'course-2',
    orgId: 'org-arabic-academy',
    slug: 'saudi-spoken-arabic',
    title: 'Saudi Spoken Arabic',
    description: 'Learn to speak Arabic naturally for everyday communication in Saudi Arabia. This course focuses on real spoken conversations, practical vocabulary, and the Saudi dialect used daily.',
    level: 'Beginner',
    category: 'Speaking',
    price: 69,
    lessonsCount: 24,
    duration: '12 weeks',
    thumbnailUrl: '/assets/course-thumb-2.jpg',
    outcomes: [
      'Hold natural conversations in Saudi Arabic',
      'Essential everyday vocabulary and phrases',
      'Greetings, shopping, directions and social situations',
      'Understanding native Saudi speakers',
      'Confidence speaking with family and community',
    ],
    status: 'Published',
  },
  {
    id: 'course-3',
    orgId: 'org-arabic-academy',
    slug: 'quran-reading-hifz-kids',
    title: 'Quran Reading & Hifz for Kids',
    description: 'Build a strong connection with the Quran through guided reading and memorization. Children learn to read with proper Tajweed and memorise key Surahs in a nurturing, encouraging environment.',
    level: 'Beginner',
    category: 'Quran',
    price: 79,
    lessonsCount: 20,
    duration: '10 weeks',
    thumbnailUrl: '/assets/course-thumb-3.jpg',
    outcomes: [
      'Read the Quran with correct Tajweed',
      'Memorise selected Surahs from Juz Amma',
      'Understand the meaning of memorised Surahs',
      'Develop a lifelong love for the Quran',
      'Confident recitation in daily Salah',
    ],
    status: 'Published',
  },
];

export function generateSeptember2026Classes(): ClassSession[] {
  return [];
}
