import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassSession } from '../../types';
import { ClassDetailModal } from '../common/ClassDetailModal';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Calendar,
  UserPlus,
  PlusCircle,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigateTab?: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { monthlyStats, todayClasses, students, teachers, activeMonth, currentOrg } = useApp();
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);

  const todayFormatted = useMemo(() => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, []);

  // Guarantee strictly 1 upcoming/today class per student
  const displayClasses = useMemo(() => {
    const seen = new Set<string>();
    return todayClasses.filter((sess) => {
      if (seen.has(sess.studentId)) return false;
      seen.add(sess.studentId);
      return true;
    });
  }, [todayClasses]);

  const getStatusBadge = (status: string, time: string) => {
    switch (status) {
      case 'completed':
        return <span className="status-badge status-completed">🟢 Completed</span>;
      case 'student_absent':
        return <span className="status-badge status-student_absent">🔴 Student Absent</span>;
      case 'teacher_absent':
        return <span className="status-badge status-teacher_absent">🟡 Teacher Absent</span>;
      case 'no_class':
        return <span className="status-badge status-no_class">⚪ No Class</span>;
      default:
        // If today and scheduled later in the day
        if (time.includes('5:00 PM')) {
          return (
            <span
              className="status-badge"
              style={{ background: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }}
            >
              🔵 Upcoming
            </span>
          );
        }
        return <span className="status-badge status-not_recorded">🟠 Not Recorded</span>;
    }
  };

  const formattedMonth = activeMonth === '2026-09' ? 'September 2026' : activeMonth;

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
            Good morning, Manager {currentOrg.managerName}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginTop: '2px' }}>
            {formattedMonth} • Complete Operational Overview for <strong>{currentOrg.name}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {onNavigateTab && (
            <>
              <button className="btn btn-outline" onClick={() => onNavigateTab('calendar')}>
                <Calendar size={16} />
                <span>Full Calendar</span>
              </button>
              <button className="btn btn-primary" onClick={() => onNavigateTab('students')}>
                <UserPlus size={16} />
                <span>Add Student</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Organization Overview Title */}
      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Organization Overview
        </h3>
        <span
          style={{
            fontSize: '0.78rem',
            background: 'var(--bg-subtle)',
            color: 'var(--accent)',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '999px',
            border: '1px solid var(--border-color)',
          }}
        >
          {formattedMonth}
        </span>
      </div>

      {/* Row 1: Core Totals (3 aligned cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '16px' }}>
        <div className="stat-card primary">
          <div className="stat-icon-wrapper" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <GraduationCap size={22} />
          </div>
          <div className="stat-value">{monthlyStats.teachersCount}</div>
          <div className="stat-label">Active Teachers</div>
        </div>

        <div className="stat-card primary">
          <div className="stat-icon-wrapper" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <Users size={22} />
          </div>
          <div className="stat-value">{monthlyStats.studentsCount}</div>
          <div className="stat-label">Enrolled Students</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#F1F5F9', color: '#475569' }}>
            <CalendarCheck size={22} />
          </div>
          <div className="stat-value">{monthlyStats.totalClasses}</div>
          <div className="stat-label">Total Classes This Month</div>
        </div>
      </div>

      {/* Row 2: Attendance & Status Breakdown (4 cards aligned in one line) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="stat-card success">
          <div className="stat-icon-wrapper" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-value">{monthlyStats.completed}</div>
          <div className="stat-label">🟢 Completed</div>
        </div>

        <div className="stat-card danger">
          <div className="stat-icon-wrapper" style={{ background: '#FEF2F2', color: '#EF4444' }}>
            <XCircle size={22} />
          </div>
          <div className="stat-value">{monthlyStats.studentAbsences}</div>
          <div className="stat-label">🔴 Student Absences</div>
        </div>

        <div className="stat-card yellow">
          <div className="stat-icon-wrapper" style={{ background: '#FEFCE8', color: '#EAB308' }}>
            <AlertCircle size={22} />
          </div>
          <div className="stat-value">{monthlyStats.teacherAbsences}</div>
          <div className="stat-label">🟡 Teacher Absences</div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon-wrapper" style={{ background: '#FFFBEB', color: '#F59E0B' }}>
            <HelpCircle size={22} />
          </div>
          <div className="stat-value">{monthlyStats.unrecorded}</div>
          <div className="stat-label">🟠 Unrecorded</div>
        </div>
      </div>

      {/* Today's Classes Live Section */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Clock size={20} color="var(--primary)" />
              Today's Classes
            </div>
            <div className="card-desc">
              {todayFormatted} • Click any row to inspect complete student & homework details
            </div>
          </div>
          {onNavigateTab && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => onNavigateTab('calendar')}
              style={{ gap: '4px' }}
            >
              <span>View Full Calendar</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Student</th>
                <th>Teacher</th>
                <th>Duration</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayClasses.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    <Clock size={28} color="var(--accent)" style={{ margin: '0 auto 8px auto', display: 'block' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      No classes scheduled for today
                    </div>
                    <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>
                      Add students with recurring days to automatically generate daily schedules.
                    </p>
                    {onNavigateTab && (
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: '12px' }}
                        onClick={() => onNavigateTab('students')}
                      >
                        <UserPlus size={14} />
                        Add First Student
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                displayClasses.slice(0, 8).map((session: ClassSession) => {
                  const student = students.find((s) => s.id === session.studentId);
                  const teacher = teachers.find((t) => t.id === session.teacherId);
                  return (
                    <tr
                      key={session.id}
                      onClick={() => setSelectedSession(session)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {session.scheduledTime}
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{student?.name || 'Student'}</span>
                          {student?.courseTitle && (
                            <span
                              style={{
                                fontSize: '0.75rem',
                                color: 'var(--accent)',
                                fontWeight: 600,
                                marginTop: '2px',
                              }}
                            >
                              {student.courseTitle}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            background: 'var(--bg-subtle)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                          }}
                        >
                          {teacher?.name || 'Teacher'}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{session.durationMinutes} mins</td>
                      <td>{getStatusBadge(session.status, session.scheduledTime)}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSession(session);
                          }}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Class Detail Modal */}
      {selectedSession && (
        <ClassDetailModal session={selectedSession} onClose={() => setSelectedSession(null)} />
      )}
    </div>
  );
};
