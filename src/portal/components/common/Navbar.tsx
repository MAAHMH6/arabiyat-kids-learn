import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar as CalendarIcon, Clock, Menu, LogOut } from 'lucide-react';

interface NavbarProps {
  title: string;
  subtitle?: string;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ title, subtitle, onToggleSidebar }) => {
  const { activeMonth, setActiveMonth, logout, currentUser } = useApp();

  return (
    <header className="topbar">
      <div className="topbar-left">
        {onToggleSidebar && (
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={22} color="var(--primary)" />
          </button>
        )}
        <div>
          <h1 className="topbar-title">{title}</h1>
          {subtitle && <p className="topbar-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="topbar-right">
        {/* Active Month Selector (Only for Admin / Founder) */}
        {currentUser?.role !== 'teacher' && (
          <div className="month-picker">
            <CalendarIcon size={15} color="var(--primary)" />
            <span className="month-label">Month:</span>
            <select
              value={activeMonth}
              onChange={(e) => setActiveMonth(e.target.value)}
            >
              <option value="2026-08">August 2026</option>
              <option value="2026-09">September 2026</option>
              <option value="2026-10">October 2026</option>
              <option value="2026-11">November 2026</option>
            </select>
          </div>
        )}

        {/* Date indication */}
        <div className="date-badge">
          <Clock size={14} color="var(--accent)" />
          <span>Tue, Sep 8, 2026</span>
        </div>

        {/* Logout button */}
        <button
          className="btn btn-outline btn-sm"
          onClick={logout}
          title="Sign out of portal"
          style={{ gap: '6px' }}
        >
          <LogOut size={14} />
          <span className="logout-text">Logout</span>
        </button>
      </div>
    </header>
  );
};
