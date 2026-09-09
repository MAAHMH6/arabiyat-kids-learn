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
    description: 'An interactive journey through the 28 Arabic letters with fun phonetic games, shape recognition, and foundational sounds.',
    level: 'Beginner',
    category: 'Alphabet',
    price: 49,
    lessonsCount: 16,
    duration: '8 weeks',
    thumbnailUrl: '/assets/course-thumb-1.jpg',
    outcomes: ['Recognize all 28 letters', 'Letter forms (isolated, start, middle, end)', 'Short vowels (Fatha, Kasra, Damma)'],
    status: 'Published',
  },
  {
    id: 'course-2',
    orgId: 'org-arabic-academy',
    slug: 'conversational-arabic-kids',
    title: 'Daily Conversational Arabic for Children',
    description: 'Practical daily vocabulary and dialogues designed for English-speaking kids to speak naturally with family and friends.',
    level: 'Beginner',
    category: 'Speaking',
    price: 69,
    lessonsCount: 24,
    duration: '12 weeks',
    thumbnailUrl: '/assets/course-thumb-2.jpg',
    outcomes: ['Daily greetings and polite expressions', 'Numbers 1-100 and colors', 'Family members and everyday objects'],
    status: 'Published',
  },
  {
    id: 'course-3',
    orgId: 'org-arabic-academy',
    slug: 'quranic-arabic-basics',
    title: 'Qur\'anic Arabic Basics & Reading Fluency',
    description: 'Connect with the language of the Holy Qur\'an through step-by-step Tajweed pronunciation rules and high-frequency vocabulary.',
    level: 'Intermediate',
    category: 'Reading',
    price: 79,
    lessonsCount: 20,
    duration: '10 weeks',
    thumbnailUrl: '/assets/course-thumb-3.jpg',
    outcomes: ['Proper Makharij articulation', 'Reading short Surahs with confidence', 'Understanding foundational Qur\'anic words'],
    status: 'Published',
  },
];

export function generateSeptember2026Classes(): ClassSession[] {
  return [];
}
