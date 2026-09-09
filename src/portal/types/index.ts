export type UserRole = 'founder' | 'admin' | 'teacher' | 'student';

export type SubscriptionPlan = 'starter' | 'professional' | 'business' | 'academy';

export type ClassStatus = 'completed' | 'student_absent' | 'teacher_absent' | 'no_class' | 'not_recorded';

export interface Organization {
  id: string;
  name: string;
  domain: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  activeMonth: string; // e.g. "2026-09"
  managerName: string;
  managerEmail: string;
  plan: SubscriptionPlan;
  subscriptionStatus: 'active' | 'trial' | 'expired';
  maxTeachers: number;
  maxStudents: number;
  createdAt?: string | undefined;
}

export interface UserProfile {
  id: string;
  orgId: string;
  role: UserRole;
  name: string;
  email: string;
  password?: string | undefined;
  phone?: string | undefined;
  avatarUrl?: string | undefined;
}

export interface Teacher {
  id: string;
  orgId: string;
  profileId: string;
  name: string;
  email: string;
  password?: string | undefined;
  phone: string;
  status: 'Active' | 'Inactive';
}

export interface Student {
  id: string;
  orgId: string;
  name: string;
  teacherId: string;
  durationMinutes: number; // e.g. 45
  startDate: string; // YYYY-MM-DD
  scheduleDays: number[]; // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  scheduleTime: string; // e.g. "5:00 PM"
  status: 'Active' | 'Inactive';
  email?: string | undefined;
  password?: string | undefined;
  phone?: string | undefined;
  meetingLink?: string | undefined; // Persistent Zoom, Google Meet, or Teams URL
  notes?: string | undefined;
}

export interface CourseItem {
  id: string;
  orgId: string;
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  price: number;
  lessonsCount: number;
  duration: string;
  thumbnailUrl?: string | undefined;
  outcomes: string[];
  status: 'Published' | 'Draft';
}

export interface HomeworkTopic {
  id: string;
  orgId: string;
  title: string;
  isCustom: boolean;
}

export interface ClassSession {
  id: string;
  orgId: string;
  studentId: string;
  teacherId: string;
  scheduledDate: string; // YYYY-MM-DD
  scheduledTime: string; // e.g. "5:00 PM"
  durationMinutes: number;
  status: ClassStatus;
  attendanceMarkedAt?: string | undefined;
  homeworkTopicId?: string | undefined;
  homeworkGiven: boolean;
  homeworkText?: string | undefined;
  notes?: string | undefined;
}

export interface TeacherPerformance {
  teacherId: string;
  teacherName: string;
  studentCount: number;
  totalClasses: number;
  completed: number;
  studentAbsence: number;
  teacherAbsence: number;
  noClass: number;
  unrecorded: number;
  completionRate: number;
}

