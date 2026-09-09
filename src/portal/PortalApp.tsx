import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminCalendar } from './components/admin/AdminCalendar';
import { StudentManagement } from './components/admin/StudentManagement';
import { TeacherManagement } from './components/admin/TeacherManagement';
import { HomeworkTopics } from './components/admin/HomeworkTopics';
import { AdminReports } from './components/admin/AdminReports';
import { OrgSettings } from './components/admin/OrgSettings';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherCalendar } from './components/teacher/TeacherCalendar';
import { TeacherStudents } from './components/teacher/TeacherStudents';
import { StudentPortal } from './components/student/StudentPortal';
import { LoginScreen } from './components/auth/LoginScreen';
import { ArrowLeft, LogOut, Sparkles } from 'lucide-react';
import arabiyatLogo from '@/assets/arabiyat-logo.png';
import './portal.css';

export function PortalApp() {
  const { currentUser, currentOrg, logout } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Reset tab when user role changes
  useEffect(() => {
    setActiveTab('dashboard');
  }, [currentUser?.role]);

  // If user is not logged in, show real Login Screen
  if (!currentUser) {
    return <LoginScreen onBackToLanding={() => { window.location.href = '/'; }} />;
  }

  const isDirector = currentUser.role === 'admin' || currentUser.role === 'founder';
  const isTeacher = currentUser.role === 'teacher';
  const isStudent = currentUser.role === 'student';

  const getPageTitle = () => {
    if (isStudent) return 'Student & Parent Academy Desk';
    if (isDirector) {
      switch (activeTab) {
        case 'dashboard':
          return 'Director Dashboard';
        case 'calendar':
          return 'Academy Teaching Calendar';
        case 'students':
          return 'Student Directory & Schedules';
        case 'teachers':
          return 'Teacher Management & Credentials';
        case 'homework':
          return 'Homework Topics & Curriculum';
        case 'reports':
          return 'Monthly Attendance & Progress Reports';
        case 'settings':
          return 'Academy Information & Settings';
        default:
          return 'Dashboard';
      }
    }

    switch (activeTab) {
      case 'dashboard':
        return 'Teacher Dashboard';
      case 'calendar':
        return 'My Teaching Calendar';
      case 'students':
        return 'My Assigned Students & Learning Logs';
      case 'homework':
        return 'Curriculum & Homework';
      case 'reports':
        return 'My Attendance Reports';
      default:
        return 'Dashboard';
    }
  };

  const getPageSubtitle = () => {
    if (isStudent) {
      return 'ArabiyatLearn • Student Homework, Schedule & Progress Desk';
    }
    if (isDirector) {
      return 'ArabiyatLearn • Arabic Made Simple for Kids — Director Suite';
    }
    return `${currentOrg?.name || 'ArabiyatLearn'} • Arabic Language Teacher Portal`;
  };

  // Student specific layout
  if (isStudent) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column', background: '#F8FAFC' }}>
        {/* Clean Student Header */}
        <header
          style={{
            background: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src={arabiyatLogo} alt="ArabiyatLearn" style={{ width: '42px', height: '42px', objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>
                ArabiyatLearn
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--coral)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Student & Parent Academy Desk
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <a
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#475569',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
              }}
            >
              <ArrowLeft size={14} />
              <span>Public Website</span>
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1E293B' }}>{currentUser.name}</span>
              <button
                onClick={logout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </header>

        <main className="content-body" style={{ flex: 1, padding: '28px', maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          <StudentPortal />
        </main>
      </div>
    );
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Portal Main Workspace */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content View */}
        <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Navbar
            title={getPageTitle()}
            subtitle={getPageSubtitle()}
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />

          <main className="content-body" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            {isDirector ? (
              <>
                {activeTab === 'dashboard' && <AdminDashboard onNavigateTab={setActiveTab} />}
                {activeTab === 'calendar' && <AdminCalendar />}
                {activeTab === 'students' && <StudentManagement />}
                {activeTab === 'teachers' && <TeacherManagement />}
                {activeTab === 'homework' && <HomeworkTopics />}
                {activeTab === 'reports' && <AdminReports />}
                {activeTab === 'settings' && <OrgSettings />}
              </>
            ) : (
              <>
                {activeTab === 'dashboard' && <TeacherDashboard onNavigateTab={setActiveTab} />}
                {activeTab === 'calendar' && <TeacherCalendar />}
                {activeTab === 'students' && <TeacherStudents />}
                {activeTab === 'homework' && <HomeworkTopics />}
                {activeTab === 'reports' && <AdminReports />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default PortalApp;
