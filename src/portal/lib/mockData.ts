import { Organization, Teacher, Student, HomeworkTopic, ClassSession, UserProfile } from '../types';

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

export function generateSeptember2026Classes(): ClassSession[] {
  return [];
}
