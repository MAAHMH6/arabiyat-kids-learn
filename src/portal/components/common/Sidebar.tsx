import React from 'react';
import { useApp } from '../../context/AppContext';
import { TeacherProfileModal } from '../teacher/TeacherProfileModal';
import arabiyatLogo from '@/assets/arabiyat-logo.png';
import {
  LayoutDashboard,
  Calendar,
  Users,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  ShieldAlert,
  CreditCard,
  X,
  LogOut,
  ArrowLeft,
  Layers,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { currentUser, currentOrg, logout } = useApp();
  const isDirector = currentUser?.role === 'admin' || currentUser?.role === 'founder';
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const { teachers } = useApp();

  const currentTeacher = React.useMemo(() => {
    return teachers.find(
      (t) =>
        t.email.toLowerCase() === currentUser?.email?.toLowerCase() ||
        t.profileId === currentUser?.id ||
        t.id === currentUser?.id
    );
  }, [teachers, currentUser]);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img
            src={arabiyatLogo}
            alt="ArabiyatLearn"
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="sidebar-brand-name" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700 }}>
              ArabiyatLearn
            </div>
            <div className="sidebar-brand-tag" style={{ color: 'var(--coral)', fontSize: '0.72rem', fontWeight: 600 }}>
              Arabic Made Simple for Kids
            </div>
          </div>
          {onClose && (
            <button className="sidebar-mobile-close" onClick={onClose} aria-label="Close Sidebar">
              <X size={20} />
            </button>
          )}
        </div>

        <div className="nav-section-title">
          {isDirector ? 'Academy Director • الإدارة' : 'Teacher Portal • المعلمات'}
        </div>

        <nav className="nav-menu">
          {isDirector ? (
            <>
              <button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
                onClick={() => handleNavClick('calendar')}
              >
                <Calendar size={18} />
                <span>Calendar</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => handleNavClick('students')}
              >
                <Users size={18} />
                <span>Students</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'teachers' ? 'active' : ''}`}
                onClick={() => handleNavClick('teachers')}
              >
                <GraduationCap size={18} />
                <span>Teachers</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                onClick={() => handleNavClick('courses')}
              >
                <BookOpen size={18} />
                <span>Courses & Curriculum</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'homework' ? 'active' : ''}`}
                onClick={() => handleNavClick('homework')}
              >
                <Layers size={18} />
                <span>Homework Topics</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => handleNavClick('reports')}
              >
                <BarChart3 size={18} />
                <span>Reports</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => handleNavClick('settings')}
              >
                <Settings size={18} />
                <span>Academy Settings</span>
              </button>
            </>
          ) : (
            <>
              <button
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
                onClick={() => handleNavClick('calendar')}
              >
                <Calendar size={18} />
                <span>My Calendar</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => handleNavClick('students')}
              >
                <Users size={18} />
                <span>My Students</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'homework' ? 'active' : ''}`}
                onClick={() => handleNavClick('homework')}
              >
                <BookOpen size={18} />
                <span>Homework</span>
              </button>
              <button
                className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => handleNavClick('reports')}
              >
                <BarChart3 size={18} />
                <span>My Reports</span>
              </button>
              {currentTeacher && (
                <button
                  type="button"
                  className="nav-item"
                  onClick={() => setIsProfileModalOpen(true)}
                  style={{ marginTop: 'auto' }}
                >
                  <Settings size={18} />
                  <span>My Profile & Login</span>
                </button>
              )}
            </>
          )}

          <div style={{ margin: '14px 0 6px 0', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} />
          <a
            href="/"
            className="nav-item"
            style={{ textDecoration: 'none', color: 'rgba(255, 255, 255, 0.75)' }}
          >
            <ArrowLeft size={18} />
            <span>Public Website</span>
          </a>
        </nav>

        <div className="sidebar-user">
          <div className="user-avatar-badge">
            <div className="avatar-circle">
              {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="user-meta-name">{currentUser?.name || 'User'}</div>
              <div className="user-meta-role">
                {isDirector ? 'Academy Director' : 'Teacher'}
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px',
            }}
            title="Log out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {currentTeacher && (
        <TeacherProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          teacher={currentTeacher}
        />
      )}
    </>
  );
};
