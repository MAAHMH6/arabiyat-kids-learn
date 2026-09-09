import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Organization,
  UserProfile,
  Teacher,
  Student,
  HomeworkTopic,
  ClassSession,
  ClassStatus,
  TeacherPerformance,
  CourseItem,
} from '../types';
import {
  initialOrganizations,
  initialProfiles,
  initialTeachers,
  initialStudents,
  initialHomeworkTopics,
  initialCourses,
  generateSeptember2026Classes,
} from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AppContextType {
  currentUser: UserProfile | null;
  currentOrg: Organization;
  organizations: Organization[];
  teachers: Teacher[];
  students: Student[];
  homeworkTopics: HomeworkTopic[];
  courses: CourseItem[];
  sessions: ClassSession[];
  activeMonth: string;
  isSupabaseActive: boolean;
  setActiveMonth: (month: string) => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
  signupManager: (data: { name: string; orgName: string; email: string; password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateOrganization: (orgId: string, updates: Partial<Organization>) => void;
  addOrganization: (org: Organization) => void;
  switchUserRole: (role: 'admin' | 'teacher', teacherId?: string) => void;
  switchOrganization: (orgId: string) => void;
  markAttendance: (
    sessionId: string,
    status: ClassStatus,
    data?: {
      homeworkTopicId?: string;
      homeworkGiven?: boolean;
      homeworkText?: string;
      notes?: string;
    }
  ) => void;
  addStudent: (data: {
    name: string;
    teacherId: string;
    durationMinutes: number;
    startDate: string;
    scheduleDays: number[];
    scheduleTime: string;
    courseId?: string | undefined;
    courseTitle?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    phone?: string | undefined;
    meetingLink?: string | undefined;
    notes?: string | undefined;
  }) => void;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  reassignStudentTeacher: (studentId: string, newTeacherId: string) => void;
  addTeacher: (data: { name: string; email: string; password?: string; phone: string; status: 'Active' | 'Inactive' }) => void;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  updateTeacherProfile: (teacherId: string, updates: Partial<Teacher> & { password?: string }) => void;
  deleteTeacher: (id: string) => void;
  addHomeworkTopic: (title: string) => void;
  deleteHomeworkTopic: (id: string) => void;
  addCourse: (data: Omit<CourseItem, 'id' | 'orgId'>) => void;
  updateCourse: (id: string, updates: Partial<CourseItem>) => void;
  deleteCourse: (id: string) => void;
  syncStudentClassesForMonth: (monthStr: string) => void;
  // Computed stats
  monthlyStats: {
    teachersCount: number;
    studentsCount: number;
    totalClasses: number;
    completed: number;
    studentAbsences: number;
    teacherAbsences: number;
    noClass: number;
    unrecorded: number;
  };
  teacherPerformance: TeacherPerformance[];
  todayClasses: ClassSession[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Fresh personal storage key for Arabiyat Learn app
const STORAGE_KEY = 'arabiyat_v2';

const getStorageItem = (key: string): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch (_) {
    return null;
  }
};

const setStorageItem = (key: string, value: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch (_) {}
};

const removeStorageItem = (key: string): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (_) {}
};

// Clear out legacy mock cache keys
if (typeof window !== 'undefined') {
  try {
    ['tsoal_personal_v1', 'school_arabic_real_v1', 'school_arabic_mock', 'school_arabic_v1', 'school_arabic_real', 'tsoal_prod_v1', 'tsoal_prod_v2', 'tsoal_prod_v3', 'tsoal_prod_v4'].forEach((legacyKey) => {
      ['profiles', 'teachers', 'students', 'topics', 'sessions', 'orgs', 'currentUser'].forEach((sub) => {
        removeStorageItem(`${legacyKey}_${sub}`);
      });
    });
  } catch (_) {}
}

const fallbackOrg: Organization = {
  id: 'org-arabic-academy',
  name: 'Arabiyat Learn — Arabic Made Simple for Kids',
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
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_orgs`);
    return saved ? JSON.parse(saved) : initialOrganizations;
  });
  const [currentOrgId, setCurrentOrgId] = useState<string>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_currentOrgId`);
    return saved || (initialOrganizations[0]?.id || 'org-arabic-academy');
  });
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_currentUser`);
    return saved ? JSON.parse(saved) : null;
  });
  const [activeMonth, setActiveMonth] = useState<string>('2026-09');

  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_profiles`);
    return saved ? JSON.parse(saved) : initialProfiles;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_teachers`);
    return saved ? JSON.parse(saved) : initialTeachers;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_students`);
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [homeworkTopics, setHomeworkTopics] = useState<HomeworkTopic[]>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_topics`);
    return saved ? JSON.parse(saved) : initialHomeworkTopics;
  });

  const [courses, setCourses] = useState<CourseItem[]>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_courses`);
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [sessions, setSessions] = useState<ClassSession[]>(() => {
    const saved = getStorageItem(`${STORAGE_KEY}_sessions`);
    if (saved) {
      try {
        const parsed: ClassSession[] = JSON.parse(saved);
        // Deduplicate any accidental duplicate sessions with same studentId + scheduledDate + scheduledTime
        const uniqueMap = new Map<string, ClassSession>();
        for (const s of parsed) {
          const key = `${s.studentId}_${s.scheduledDate}_${s.scheduledTime}`;
          if (!uniqueMap.has(key)) {
            uniqueMap.set(key, s);
          } else {
            const existing = uniqueMap.get(key)!;
            if (existing.status === 'not_recorded' && s.status !== 'not_recorded') {
              uniqueMap.set(key, s);
            }
          }
        }
        return Array.from(uniqueMap.values());
      } catch (_) {
        return generateSeptember2026Classes();
      }
    }
    return generateSeptember2026Classes();
  });

  // Supabase real data sync on mount
  useEffect(() => {
    async function fetchSupabaseData() {
      if (!supabase) return;
      try {
        const { data: orgData } = await supabase.from('organizations').select('*');
        if (orgData && orgData.length > 0) {
          setOrganizations(
            orgData.map((o: any) => ({
              id: o.id,
              name: o.name,
              domain: o.domain || 'arabiyatlearn.com',
              logoUrl: o.logo_url || '/arabiyat-logo.png',
              primaryColor: o.primary_color || '#0C3E35',
              accentColor: o.accent_color || '#C8707E',
              activeMonth: o.active_month || '2026-09',
              managerName: o.manager_name || 'Academy Director',
              managerEmail: o.manager_email || 'admin@arabiyatlearn.com',
              plan: (o.plan as any) || 'academy',
              subscriptionStatus: (o.subscription_status as any) || 'active',
              maxTeachers: o.max_teachers || 999,
              maxStudents: o.max_students || 9999,
            }))
          );
        }

        const { data: teachersData } = await supabase.from('teachers').select('*');
        if (teachersData) {
          setTeachers(
            teachersData.map((t: any) => ({
              id: t.id,
              orgId: t.org_id,
              profileId: t.profile_id,
              name: t.name,
              email: t.email,
              phone: t.phone || '',
              status: t.status || 'Active',
            }))
          );
        }

        const { data: studentsData } = await supabase.from('students').select('*');
        if (studentsData) {
          setStudents(
            studentsData.map((s: any) => ({
              id: s.id,
              orgId: s.org_id,
              name: s.name,
              teacherId: s.teacher_id,
              durationMinutes: s.duration_minutes || 45,
              startDate: s.start_date,
              scheduleDays: s.schedule_days || [1, 3, 5],
              scheduleTime: s.schedule_time || '5:00 PM',
              status: s.status || 'Active',
            }))
          );
        }

        const { data: topicsData } = await supabase.from('homework_topics').select('*');
        if (topicsData && topicsData.length > 0) {
          setHomeworkTopics(
            topicsData.map((top: any) => ({
              id: top.id,
              orgId: top.org_id,
              title: top.title,
              isCustom: top.is_custom || false,
            }))
          );
        }

        const { data: sessionsData } = await supabase.from('class_sessions').select('*');
        if (sessionsData) {
          setSessions(
            sessionsData.map((sess: any) => ({
              id: sess.id,
              orgId: sess.org_id,
              studentId: sess.student_id,
              teacherId: sess.teacher_id,
              scheduledDate: sess.scheduled_date,
              scheduledTime: sess.scheduled_time,
              durationMinutes: sess.duration_minutes,
              status: sess.status,
              attendanceMarkedAt: sess.attendance_marked_at,
              homeworkTopicId: sess.homework_topic_id,
              homeworkGiven: sess.homework_given,
              homeworkText: sess.homework_text,
              notes: sess.notes,
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching Supabase data:', err);
      }
    }

    fetchSupabaseData();
  }, []);

  // Save to localStorage for instant local reactivity
  useEffect(() => {
    setStorageItem(`${STORAGE_KEY}_orgs`, JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    setStorageItem(`${STORAGE_KEY}_teachers`, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    setStorageItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    setStorageItem(`${STORAGE_KEY}_topics`, JSON.stringify(homeworkTopics));
  }, [homeworkTopics]);

  useEffect(() => {
    setStorageItem(`${STORAGE_KEY}_courses`, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    setStorageItem(`${STORAGE_KEY}_sessions`, JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    setStorageItem(`${STORAGE_KEY}_profiles`, JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (currentUser) {
      setStorageItem(`${STORAGE_KEY}_currentUser`, JSON.stringify(currentUser));
    } else {
      removeStorageItem(`${STORAGE_KEY}_currentUser`);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentOrgId) {
      setStorageItem(`${STORAGE_KEY}_currentOrgId`, currentOrgId);
    }
  }, [currentOrgId]);

  const currentOrg = useMemo(() => {
    return organizations.find((o) => o.id === currentOrgId) || organizations[0] || fallbackOrg;
  }, [organizations, currentOrgId]);

  useEffect(() => {
    if (currentOrg && typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary', currentOrg.primaryColor || '#0C3E35');
      document.documentElement.style.setProperty('--accent', currentOrg.accentColor || '#C8707E');
      document.documentElement.style.setProperty('--coral', currentOrg.accentColor || '#C8707E');
    }
  }, [currentOrg]);

  // Login handler with proper credential checking
  const login = async (email: string, password?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password?.trim() || '';

    // If Supabase Auth is connected
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (authData?.user) {
          const { data: prof } = await supabase.from('profiles').select('*').eq('email', cleanEmail).single();
          if (prof) {
            const userProf: UserProfile = {
              id: prof.id,
              orgId: prof.org_id,
              role: prof.role,
              name: prof.name,
              email: prof.email,
              phone: prof.phone,
            };
            setCurrentUser(userProf);
            setCurrentOrgId(prof.org_id);
            return { success: true };
          }
        }
      } catch (e) {
        console.warn('Supabase auth check bypassed, checking local store:', e);
      }
    }

    // 1. Check Profiles (Founder & Managers)
    const foundProfile = profiles.find((p) => p.email.toLowerCase() === cleanEmail);
    if (foundProfile) {
      if (foundProfile.password && foundProfile.password !== cleanPassword) {
        return { success: false, message: 'Invalid password. Please check your password.' };
      }
      setCurrentUser(foundProfile);
      setCurrentOrgId(foundProfile.orgId);
      return { success: true };
    }

    // 2. Check Teacher accounts added by Manager
    const foundTeacher = teachers.find((t) => t.email.toLowerCase() === cleanEmail);
    if (foundTeacher) {
      if (foundTeacher.password && foundTeacher.password !== cleanPassword) {
        return { success: false, message: 'Invalid teacher password. Please ask your academy manager.' };
      }
      const teacherProfile: UserProfile = {
        id: foundTeacher.profileId || `usr-${foundTeacher.id}`,
        orgId: foundTeacher.orgId,
        role: 'teacher',
        name: foundTeacher.name,
        email: foundTeacher.email,
        phone: foundTeacher.phone,
      };
      setCurrentUser(teacherProfile);
      setCurrentOrgId(foundTeacher.orgId);
      return { success: true };
    }

    // 3. Check Student accounts
    const foundStudent = students.find((s) => s.email && s.email.toLowerCase() === cleanEmail);
    if (foundStudent) {
      if (foundStudent.password && foundStudent.password !== cleanPassword) {
        return { success: false, message: 'Invalid student password. Please verify with your teacher or academy manager.' };
      }
      const studentProfile: UserProfile = {
        id: `usr-${foundStudent.id}`,
        orgId: foundStudent.orgId,
        role: 'student',
        name: foundStudent.name,
        email: foundStudent.email!,
        phone: foundStudent.phone,
      };
      setCurrentUser(studentProfile);
      setCurrentOrgId(foundStudent.orgId);
      return { success: true };
    }

    return {
      success: false,
      message: 'No registered account found with this email. Please check your credentials.',
    };
  };

  // Sign up for new Academy Organizers / Managers
  const signupManager = async (data: { name: string; orgName: string; email: string; password: string }) => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPassword = data.password.trim();

    if (profiles.some((p) => p.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const orgId = `org-${Date.now()}`;
    const newOrg: Organization = {
      id: orgId,
      name: data.orgName.trim(),
      domain: `${data.orgName.toLowerCase().replace(/\s+/g, '')}.com`,
      logoUrl: '/logo.jpg',
      primaryColor: '#143D2B',
      accentColor: '#C69328',
      activeMonth: '2026-09',
      managerName: data.name.trim(),
      managerEmail: cleanEmail,
      plan: 'starter',
      subscriptionStatus: 'trial',
      maxTeachers: 3,
      maxStudents: 30,
      createdAt: new Date().toISOString().split('T')[0] || '',
    };

    const newProfile: UserProfile = {
      id: `usr-${Date.now()}`,
      orgId,
      role: 'admin',
      name: data.name.trim(),
      email: cleanEmail,
      password: cleanPassword,
    };

    setOrganizations((prev) => [...prev, newOrg]);
    setProfiles((prev) => [...prev, newProfile]);
    setCurrentOrgId(orgId);
    setCurrentUser(newProfile);

    // Persist to Supabase if connected
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
        });

        await supabase.from('organizations').insert({
          id: orgId,
          name: newOrg.name,
          domain: newOrg.domain,
          manager_name: newOrg.managerName,
          manager_email: newOrg.managerEmail,
          plan: 'starter',
          subscription_status: 'trial',
          max_teachers: 3,
          max_students: 30,
        });

        await supabase.from('profiles').insert({
          id: newProfile.id,
          org_id: orgId,
          role: 'admin',
          name: newProfile.name,
          email: newProfile.email,
          password_hash: cleanPassword,
        });
      } catch (e) {
        console.error('Supabase signup sync error:', e);
      }
    }

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(`${STORAGE_KEY}_currentUser`);
  };

  const switchUserRole = (role: 'admin' | 'teacher', teacherId?: string) => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'usr-admin',
        orgId: currentOrgId,
        role: 'admin',
        name: currentOrg.managerName || 'Academy Director',
        email: 'admin@arabiyatlearn.com',
      });
    } else {
      const teacher = teachers.find((t) => t.id === teacherId) || teachers[0];
      if (teacher) {
        setCurrentUser({
          id: teacher.profileId || `usr-${teacher.id}`,
          orgId: currentOrgId,
          role: 'teacher',
          name: teacher.name,
          email: teacher.email,
          phone: teacher.phone,
        });
      } else {
        setCurrentUser({
          id: 'usr-teacher-default',
          orgId: currentOrgId,
          role: 'teacher',
          name: 'Teacher',
          email: 'teacher@arabiyatlearn.com',
        });
      }
    }
  };

  const switchOrganization = (orgId: string) => {
    setCurrentOrgId(orgId);
  };

  // Mark attendance & record class
  const markAttendance = async (
    sessionId: string,
    status: ClassStatus,
    data?: {
      homeworkTopicId?: string;
      homeworkGiven?: boolean;
      homeworkText?: string;
      notes?: string;
    }
  ) => {
    const timestamp = new Date().toISOString();

    setSessions((prev) =>
      prev.map((s) => {
        if (s.id !== sessionId) return s;
        return {
          ...s,
          status,
          attendanceMarkedAt: timestamp,
          homeworkTopicId: data?.homeworkTopicId !== undefined ? data.homeworkTopicId : s.homeworkTopicId,
          homeworkGiven: data?.homeworkGiven !== undefined ? data.homeworkGiven : s.homeworkGiven,
          homeworkText: data?.homeworkText !== undefined ? data.homeworkText : s.homeworkText,
          notes: data?.notes !== undefined ? data.notes : s.notes,
        } as ClassSession;
      })
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from('class_sessions')
          .update({
            status,
            attendance_marked_at: timestamp,
            homework_topic_id: data?.homeworkTopicId || null,
            homework_given: data?.homeworkGiven ?? false,
            homework_text: data?.homeworkText || null,
            notes: data?.notes || null,
          })
          .eq('id', sessionId);
      } catch (err) {
        console.error('Error updating session in Supabase:', err);
      }
    }
  };

  // Add student and auto-generate classes
  const addStudent = async (data: {
    name: string;
    teacherId: string;
    durationMinutes: number;
    startDate: string;
    scheduleDays: number[];
    scheduleTime: string;
    courseId?: string | undefined;
    courseTitle?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    phone?: string | undefined;
    meetingLink?: string | undefined;
    notes?: string | undefined;
  }) => {
    const studentId = `stu-${Date.now()}`;
    const cleanEmail = data.email?.trim() || undefined;
    const cleanPassword = data.password?.trim() || undefined;
    const cleanPhone = data.phone?.trim() || undefined;
    const cleanMeetingLink = data.meetingLink?.trim() || undefined;
    const cleanNotes = data.notes?.trim() || undefined;
    const cleanCourseId = data.courseId?.trim() || undefined;
    const cleanCourseTitle = data.courseTitle?.trim() || undefined;

    const newStudent: Student = {
      id: studentId,
      orgId: currentOrgId,
      name: data.name.trim(),
      teacherId: data.teacherId,
      durationMinutes: data.durationMinutes,
      startDate: data.startDate,
      scheduleDays: data.scheduleDays,
      scheduleTime: data.scheduleTime,
      status: 'Active',
      courseId: cleanCourseId,
      courseTitle: cleanCourseTitle,
      email: cleanEmail,
      password: cleanPassword,
      phone: cleanPhone,
      meetingLink: cleanMeetingLink,
      notes: cleanNotes,
    };

    setStudents((prev) => [...prev, newStudent]);

    // Also register a UserProfile with role 'student' for instant login
    if (cleanEmail && cleanPassword) {
      const studentProfile: UserProfile = {
        id: `usr-${studentId}`,
        orgId: currentOrgId,
        role: 'student',
        name: data.name.trim(),
        email: cleanEmail.toLowerCase(),
        password: cleanPassword,
        phone: cleanPhone || '',
      };
      setProfiles((prev) => [
        ...prev.filter((p) => p.email.toLowerCase() !== cleanEmail.toLowerCase()),
        studentProfile,
      ]);
    }

    // Generate recurring class dates for active month
    const [yearStr = '2026', monthStr = '09'] = activeMonth.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const newSessions: ClassSession[] = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      const dayOfWeek = dateObj.getDay();
      const dateStr = `${yearStr}-${monthStr}-${String(d).padStart(2, '0')}`;

      if (dateStr >= data.startDate && data.scheduleDays.includes(dayOfWeek)) {
        newSessions.push({
          id: `sess-${Date.now()}-${d}`,
          orgId: currentOrgId,
          studentId,
          teacherId: data.teacherId,
          scheduledDate: dateStr,
          scheduledTime: data.scheduleTime,
          durationMinutes: data.durationMinutes,
          status: 'not_recorded',
          homeworkGiven: false,
        });
      }
    }

    if (newSessions.length > 0) {
      setSessions((prev) => [...prev, ...newSessions]);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('students').insert({
          id: studentId,
          org_id: currentOrgId,
          name: data.name,
          teacher_id: data.teacherId,
          duration_minutes: data.durationMinutes,
          start_date: data.startDate,
          schedule_days: data.scheduleDays,
          schedule_time: data.scheduleTime,
          status: 'Active',
        });

        if (newSessions.length > 0) {
          await supabase.from('class_sessions').insert(
            newSessions.map((sess) => ({
              id: sess.id,
              org_id: sess.orgId,
              student_id: sess.studentId,
              teacher_id: sess.teacherId,
              scheduled_date: sess.scheduledDate,
              scheduled_time: sess.scheduledTime,
              duration_minutes: sess.durationMinutes,
              status: 'not_recorded',
              homework_given: false,
            }))
          );
        }
      } catch (e) {
        console.error('Supabase student insert error:', e);
      }
    }
  };

  const updateStudent = async (id: string, updates: Partial<Student>) => {
    const targetStudent = students.find((s) => s.id === id);
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));

    // Update associated profile if email, password, name, or phone was updated
    if (targetStudent) {
      const updatedEmail = (updates.email ?? targetStudent.email)?.trim().toLowerCase();
      const updatedPassword = updates.password ?? targetStudent.password;
      const updatedName = (updates.name ?? targetStudent.name)?.trim();
      const updatedPhone = updates.phone ?? targetStudent.phone;

      if (updatedEmail) {
        setProfiles((prev) => {
          const oldEmail = targetStudent.email?.toLowerCase();
          const existing = prev.find((p) => (oldEmail && p.email.toLowerCase() === oldEmail) || p.id === `usr-${id}`);
          if (existing) {
            return prev.map((p) =>
              p.id === existing.id
                ? {
                    ...p,
                    email: updatedEmail,
                    name: updatedName || p.name,
                    password: updatedPassword || p.password,
                    phone: updatedPhone || p.phone,
                  }
                : p
            );
          } else if (updatedPassword) {
            return [
              ...prev,
              {
                id: `usr-${id}`,
                orgId: targetStudent.orgId,
                role: 'student',
                name: updatedName || 'Student',
                email: updatedEmail,
                password: updatedPassword,
                phone: updatedPhone || '',
              },
            ];
          }
          return prev;
        });
      }

      // Schedule sync: if scheduleDays, scheduleTime, or startDate changes, regenerate unrecorded classes
      if (updates.scheduleDays || updates.scheduleTime || updates.startDate || updates.durationMinutes || updates.teacherId) {
        const [yearStr = '2026', monthStr = '09'] = activeMonth.split('-');
        const year = parseInt(yearStr, 10);
        const month = parseInt(monthStr, 10) - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const activeDays = updates.scheduleDays ?? targetStudent.scheduleDays ?? [1, 3, 5];
        const activeTime = updates.scheduleTime ?? targetStudent.scheduleTime ?? '5:00 PM';
        const activeDuration = updates.durationMinutes ?? targetStudent.durationMinutes ?? 45;
        const activeTeacherId = updates.teacherId ?? targetStudent.teacherId;
        const activeStart = updates.startDate ?? targetStudent.startDate ?? `${yearStr}-${monthStr}-01`;

        setSessions((prev) => {
          // Keep completed or recorded sessions
          const recorded = prev.filter((sess) => sess.studentId !== id || sess.status !== 'not_recorded');
          const generated: ClassSession[] = [];

          for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(year, month, d);
            const dayOfWeek = dateObj.getDay();
            const dateStr = `${yearStr}-${monthStr}-${String(d).padStart(2, '0')}`;

            if (dateStr >= activeStart && activeDays.includes(dayOfWeek)) {
              if (!recorded.some((s) => s.studentId === id && s.scheduledDate === dateStr)) {
                generated.push({
                  id: `sess-${id}-${dateStr}`,
                  orgId: currentOrgId,
                  studentId: id,
                  teacherId: activeTeacherId,
                  scheduledDate: dateStr,
                  scheduledTime: activeTime,
                  durationMinutes: activeDuration,
                  status: 'not_recorded',
                  homeworkGiven: false,
                });
              }
            }
          }
          return [...recorded, ...generated];
        });
      }
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('students').update(updates).eq('id', id);
      } catch (e) {
        console.error('Supabase update student error:', e);
      }
    }
  };

  // Synchronize student classes for a specified month
  const syncStudentClassesForMonth = (monthStr: string) => {
    const parts = monthStr.split('-');
    const yearStr = parts[0] ?? '2026';
    const mStr = parts[1] ?? '09';
    const year = parseInt(yearStr, 10);
    const month = parseInt(mStr, 10) - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    setSessions((prev) => {
      const newGenerated: ClassSession[] = [];
      for (const student of students) {
        if (student.status !== 'Active') continue;
        const studentDays = student.scheduleDays || [1, 3, 5];
        const studentStart = student.startDate || `${yearStr}-${mStr}-01`;

        for (let d = 1; d <= daysInMonth; d++) {
          const dateObj = new Date(year, month, d);
          const dayOfWeek = dateObj.getDay();
          const dateStr = `${yearStr}-${mStr}-${String(d).padStart(2, '0')}`;

          if (dateStr >= studentStart && studentDays.includes(dayOfWeek)) {
            const alreadyExists = prev.some((s) => s.studentId === student.id && s.scheduledDate === dateStr);
            if (!alreadyExists) {
              newGenerated.push({
                id: `sess-${student.id}-${dateStr}`,
                orgId: currentOrgId,
                studentId: student.id,
                teacherId: student.teacherId,
                scheduledDate: dateStr,
                scheduledTime: student.scheduleTime || '5:00 PM',
                durationMinutes: student.durationMinutes || 45,
                status: 'not_recorded',
                homeworkGiven: false,
              });
            }
          }
        }
      }
      return newGenerated.length > 0 ? [...prev, ...newGenerated] : prev;
    });
  };

  // Courses Management
  const addCourse = (data: Omit<CourseItem, 'id' | 'orgId'>) => {
    const newCourse: CourseItem = {
      ...data,
      id: `course-${Date.now()}`,
      orgId: currentOrgId,
    };
    setCourses((prev) => [newCourse, ...prev]);
  };

  const updateCourse = (id: string, updates: Partial<CourseItem>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteStudent = async (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setSessions((prev) => prev.filter((s) => s.studentId !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('students').delete().eq('id', id);
        await supabase.from('class_sessions').delete().eq('student_id', id);
      } catch (e) {
        console.error('Supabase delete student error:', e);
      }
    }
  };

  const reassignStudentTeacher = async (studentId: string, newTeacherId: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === studentId ? { ...s, teacherId: newTeacherId } : s))
    );

    const todayStr = new Date().toISOString().split('T')[0] || '';
    setSessions((prev) =>
      prev.map((sess) => {
        if (sess.studentId === studentId) {
          if (sess.status === 'not_recorded' || sess.scheduledDate >= todayStr) {
            return { ...sess, teacherId: newTeacherId };
          }
        }
        return sess;
      })
    );

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('students').update({ teacher_id: newTeacherId }).eq('id', studentId);
        await supabase
          .from('class_sessions')
          .update({ teacher_id: newTeacherId })
          .eq('student_id', studentId)
          .eq('status', 'not_recorded');
      } catch (e) {
        console.error('Supabase reassign teacher error:', e);
      }
    }
  };

  const updateOrganization = async (orgId: string, updates: Partial<Organization>) => {
    setOrganizations((prev) => prev.map((o) => (o.id === orgId ? { ...o, ...updates } : o)));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('organizations').update(updates).eq('id', orgId);
      } catch (e) {
        console.error('Supabase update organization error:', e);
      }
    }
  };

  const addOrganization = async (newOrg: Organization) => {
    setOrganizations((prev) => [...prev, newOrg]);
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('organizations').insert({
          id: newOrg.id,
          name: newOrg.name,
          domain: newOrg.domain,
          manager_name: newOrg.managerName,
          manager_email: newOrg.managerEmail,
          plan: newOrg.plan,
          subscription_status: newOrg.subscriptionStatus,
          max_teachers: newOrg.maxTeachers,
          max_students: newOrg.maxStudents,
        });
      } catch (e) {
        console.error('Supabase add organization error:', e);
      }
    }
  };

  const addTeacher = async (data: { name: string; email: string; password?: string; phone: string; status: 'Active' | 'Inactive' }) => {
    const id = `t-${Date.now()}`;
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanPassword = data.password?.trim() || 'teacher123';

    const newTeacher: Teacher = {
      id,
      orgId: currentOrgId,
      profileId: `usr-${id}`,
      name: data.name.trim(),
      email: cleanEmail,
      password: cleanPassword,
      phone: data.phone.trim(),
      status: data.status,
    };

    const newProfile: UserProfile = {
      id: `usr-${id}`,
      orgId: currentOrgId,
      role: 'teacher',
      name: data.name.trim(),
      email: cleanEmail,
      password: cleanPassword,
      phone: data.phone.trim(),
    };

    setTeachers((prev) => [...prev, newTeacher]);
    setProfiles((prev) => [...prev, newProfile]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('teachers').insert({
          id,
          org_id: currentOrgId,
          profile_id: `usr-${id}`,
          name: data.name.trim(),
          email: cleanEmail,
          password_hash: cleanPassword,
          phone: data.phone.trim(),
          status: data.status,
        });

        await supabase.from('profiles').insert({
          id: `usr-${id}`,
          org_id: currentOrgId,
          role: 'teacher',
          name: data.name.trim(),
          email: cleanEmail,
          password_hash: cleanPassword,
          phone: data.phone.trim(),
        });

        // Also register in Supabase Auth if possible
        await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
        }).catch(() => {});
      } catch (e) {
        console.error('Supabase add teacher error:', e);
      }
    }
  };

  const updateTeacher = async (id: string, updates: Partial<Teacher>) => {
    const targetTeacher = teachers.find((t) => t.id === id);
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));

    // Update associated profile so login credentials and names stay in sync
    const updatedEmail = (updates.email ?? targetTeacher?.email)?.trim().toLowerCase();
    const updatedName = (updates.name ?? targetTeacher?.name)?.trim();
    const updatedPhone = updates.phone ?? targetTeacher?.phone;
    const updatedPassword = updates.password ?? targetTeacher?.password;

    setProfiles((prev) => {
      const oldEmail = targetTeacher?.email?.toLowerCase();
      const existing = prev.find(
        (p) => (oldEmail && p.email.toLowerCase() === oldEmail) || p.id === `usr-${id}` || p.id === id
      );
      if (existing) {
        return prev.map((p) =>
          p.id === existing.id
            ? {
                ...p,
                name: updatedName || p.name,
                email: updatedEmail || p.email,
                phone: updatedPhone !== undefined ? updatedPhone : p.phone,
                password: updatedPassword || p.password,
              }
            : p
        );
      } else if (updatedEmail) {
        return [
          ...prev,
          {
            id: `usr-${id}`,
            orgId: currentOrgId,
            role: 'teacher' as const,
            name: updatedName || 'Teacher',
            email: updatedEmail,
            phone: updatedPhone || '',
            password: updatedPassword,
          },
        ];
      }
      return prev;
    });

    if (
      currentUser &&
      (currentUser.id === `usr-${id}` ||
        currentUser.id === id ||
        (targetTeacher?.email && currentUser.email.toLowerCase() === targetTeacher.email.toLowerCase()))
    ) {
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              name: updatedName || prev.name,
              email: updatedEmail || prev.email,
              phone: updatedPhone !== undefined ? updatedPhone : prev.phone,
              password: updatedPassword || prev.password,
            }
          : null
      );
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('teachers').update(updates).eq('id', id);
      } catch (e) {
        console.error('Supabase update teacher error:', e);
      }
    }
  };

  const updateTeacherProfile = async (teacherId: string, updates: Partial<Teacher> & { password?: string }) => {
    setTeachers((prev) =>
      prev.map((t) => (t.id === teacherId ? { ...t, ...updates } : t))
    );

    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id === `usr-${teacherId}` || (currentUser && (p.id === currentUser.id || p.email.toLowerCase() === currentUser.email.toLowerCase()))) {
          return {
            ...p,
            name: updates.name || p.name,
            phone: updates.phone !== undefined ? updates.phone : p.phone,
            password: updates.password || p.password,
            email: updates.email || p.email,
          } as UserProfile;
        }
        return p;
      })
    );

    if (currentUser && currentUser.role === 'teacher') {
      setCurrentUser((prev) => (prev ? ({
        ...prev,
        name: updates.name || prev.name,
        phone: updates.phone !== undefined ? updates.phone : prev.phone,
        password: updates.password || prev.password,
        email: updates.email || prev.email,
      } as UserProfile) : null));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const teacherUpdates: any = { ...updates };
        if (updates.password) {
          teacherUpdates.password_hash = updates.password;
          delete teacherUpdates.password;
        }
        await supabase.from('teachers').update(teacherUpdates).eq('id', teacherId);
        await supabase.from('profiles').update({
          name: updates.name,
          phone: updates.phone,
          password_hash: updates.password,
          email: updates.email,
        }).eq('id', `usr-${teacherId}`);
      } catch (e) {
        console.error('Supabase update teacher profile error:', e);
      }
    }
  };

  const deleteTeacher = async (id: string) => {
    const teacherToDelete = teachers.find((t) => t.id === id);
    setTeachers((prev) => prev.filter((t) => t.id !== id));
    if (teacherToDelete) {
      setProfiles((prev) => prev.filter((p) => p.email.toLowerCase() !== teacherToDelete.email.toLowerCase()));
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('teachers').delete().eq('id', id);
        if (teacherToDelete) {
          await supabase.from('profiles').delete().eq('email', teacherToDelete.email.toLowerCase());
        }
      } catch (e) {
        console.error('Supabase delete teacher error:', e);
      }
    }
  };

  const addHomeworkTopic = async (title: string) => {
    const id = `top-${Date.now()}`;
    const newTopic: HomeworkTopic = {
      id,
      orgId: currentOrgId,
      title: title.trim(),
      isCustom: true,
    };
    setHomeworkTopics((prev) => [...prev, newTopic]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('homework_topics').insert({
          id,
          org_id: currentOrgId,
          title: title.trim(),
          is_custom: true,
        });
      } catch (e) {
        console.error('Supabase topic error:', e);
      }
    }
  };

  const deleteHomeworkTopic = async (id: string) => {
    setHomeworkTopics((prev) => prev.filter((t) => t.id !== id));
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('homework_topics').delete().eq('id', id);
      } catch (e) {
        console.error('Supabase delete topic error:', e);
      }
    }
  };

  // Computed: Monthly statistics
  const monthlyStats = useMemo(() => {
    const orgSessions = sessions.filter(
      (s) => s.orgId === currentOrgId && s.scheduledDate.startsWith(activeMonth)
    );
    const orgTeachers = teachers.filter((t) => t.orgId === currentOrgId && t.status === 'Active');
    const orgStudents = students.filter((s) => s.orgId === currentOrgId && s.status === 'Active');

    const totalClasses = orgSessions.length;
    let completed = 0;
    let studentAbsences = 0;
    let teacherAbsences = 0;
    let noClass = 0;
    let unrecorded = 0;

    for (const s of orgSessions) {
      if (s.status === 'completed') completed++;
      else if (s.status === 'student_absent') studentAbsences++;
      else if (s.status === 'teacher_absent') teacherAbsences++;
      else if (s.status === 'no_class') noClass++;
      else unrecorded++;
    }

    return {
      teachersCount: orgTeachers.length,
      studentsCount: orgStudents.length,
      totalClasses,
      completed,
      studentAbsences,
      teacherAbsences,
      noClass,
      unrecorded,
    };
  }, [sessions, teachers, students, currentOrgId, activeMonth]);

  // Computed: Teacher performance table
  const teacherPerformance = useMemo((): TeacherPerformance[] => {
    const orgTeachers = teachers.filter((t) => t.orgId === currentOrgId);
    const orgSessions = sessions.filter(
      (s) => s.orgId === currentOrgId && s.scheduledDate.startsWith(activeMonth)
    );

    return orgTeachers.map((t) => {
      const teacherStudents = students.filter((s) => s.teacherId === t.id && s.orgId === currentOrgId);
      const teacherSessions = orgSessions.filter((s) => s.teacherId === t.id);

      const totalClasses = teacherSessions.length;
      let completed = 0;
      let studentAbsence = 0;
      let teacherAbsence = 0;
      let noClass = 0;
      let unrecorded = 0;

      for (const s of teacherSessions) {
        if (s.status === 'completed') completed++;
        else if (s.status === 'student_absent') studentAbsence++;
        else if (s.status === 'teacher_absent') teacherAbsence++;
        else if (s.status === 'no_class') noClass++;
        else unrecorded++;
      }

      const completionRate = totalClasses > 0 ? Math.round((completed / totalClasses) * 100) : 0;

      return {
        teacherId: t.id,
        teacherName: t.name,
        studentCount: teacherStudents.length,
        totalClasses,
        completed,
        studentAbsence,
        teacherAbsence,
        noClass,
        unrecorded,
        completionRate,
      };
    });
  }, [teachers, students, sessions, currentOrgId, activeMonth]);

  // Computed: Today's classes (strictly today's date, deduplicated so each student appears once)
  const todayClasses = useMemo(() => {
    const realToday: string = new Date().toISOString().split('T')[0] ?? '2026-09-09';
    const parts = realToday.split('-');
    const dayStr = parts[2] ?? '09';
    const targetDate = realToday.startsWith(activeMonth)
      ? realToday
      : `${activeMonth}-${dayStr}`;

    const matching = sessions
      .filter((s) => s.orgId === currentOrgId && s.scheduledDate === targetDate)
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

    // Deduplicate: guarantee only 1 class session per student for today's schedule
    const seenStudentIds = new Set<string>();
    const deduplicated: ClassSession[] = [];
    for (const sess of matching) {
      if (!seenStudentIds.has(sess.studentId)) {
        seenStudentIds.add(sess.studentId);
        deduplicated.push(sess);
      }
    }
    return deduplicated;
  }, [sessions, currentOrgId, activeMonth]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentOrg,
        organizations,
        teachers,
        students,
        homeworkTopics,
        courses,
        sessions,
        activeMonth,
        isSupabaseActive: isSupabaseConfigured,
        setActiveMonth: (month: string) => {
          setActiveMonth(month);
          syncStudentClassesForMonth(month);
        },
        login,
        signupManager,
        logout,
        updateOrganization,
        addOrganization,
        switchUserRole,
        switchOrganization,
        markAttendance,
        addStudent,
        updateStudent,
        deleteStudent,
        reassignStudentTeacher,
        addTeacher,
        updateTeacher,
        updateTeacherProfile,
        deleteTeacher,
        addHomeworkTopic,
        deleteHomeworkTopic,
        addCourse,
        updateCourse,
        deleteCourse,
        syncStudentClassesForMonth,
        monthlyStats,
        teacherPerformance,
        todayClasses,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
