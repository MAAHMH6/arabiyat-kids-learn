import React, { useState, useEffect } from 'react';
import { useApp } from './context/AppContext';
import { LandingPage } from './components/public/LandingPage';
import { LoginScreen } from './components/auth/LoginScreen';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminCalendar } from './components/admin/AdminCalendar';
import { StudentManagement } from './components/admin/StudentManagement';
import { TeacherManagement } from './components/admin/TeacherManagement';
import { HomeworkTopics } from './components/admin/HomeworkTopics';
import { AdminReports } from './components/admin/AdminReports';
import { OrgSettings } from './components/admin/OrgSettings';
import { FounderDashboard } from './components/founder/FounderDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { TeacherCalendar } from './components/teacher/TeacherCalendar';
import { TeacherStudents } from './components/teacher/TeacherStudents';

export function App() {
  const { currentUser, currentOrg } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Reset tab when user role changes
  useEffect(() => {
    setActiveTab('dashboard');
  }, [currentUser?.role]);

  // If user is not logged in:
  if (!currentUser) {
    if (showLogin) {
      return <LoginScreen onBackToLanding={() => setShowLogin(false)} />;
    }
    return <LandingPage onGoToLogin={() => setShowLogin(true)} />;
  }

  const isDirector = currentUser.role === 'admin' || currentUser.role === 'founder';

  const getPageTitle = () => {
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
    if (isDirector) {
      return 'TSOAL KSA • The School of Arabic Language — Director Suite';
    }
    return `${currentOrg.name} • Arabic Language Teacher Portal`;
  };

  return (
    <div className="app-container">
      {/* Navigation Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content View */}
      <div className="main-wrapper">
        <Navbar
          title={getPageTitle()}
          subtitle={getPageSubtitle()}
          onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className="content-body">
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
  );
}

export default App;
