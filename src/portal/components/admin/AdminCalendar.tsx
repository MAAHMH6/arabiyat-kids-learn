import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassSession, ClassStatus } from '../../types';
import { ClassDetailModal } from '../common/ClassDetailModal';
import {
  Calendar as CalendarIcon,
  Filter,
  User,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
} from 'lucide-react';

export const AdminCalendar: React.FC = () => {
  const { sessions, teachers, students, activeMonth, currentOrg } = useApp();

  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('all');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);

  // Filter sessions
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (s.orgId !== currentOrg.id) return false;
      if (!s.scheduledDate.startsWith(activeMonth)) return false;
      if (selectedTeacherId !== 'all' && s.teacherId !== selectedTeacherId) return false;
      if (selectedStudentId !== 'all' && s.studentId !== selectedStudentId) return false;
      if (selectedStatus !== 'all' && s.status !== selectedStatus) return false;
      return true;
    });
  }, [sessions, currentOrg.id, activeMonth, selectedTeacherId, selectedStudentId, selectedStatus]);

  // Generate calendar days for activeMonth (e.g. 2026-09)
  const calendarGrid = useMemo(() => {
    const [yearStr = '2026', monthStr = '09'] = activeMonth.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10) - 1;

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const totalDays = new Date(year, month + 1, 0).getDate();

    const days: { dayNumber: number; dateStr: string; isCurrentMonth: boolean; sessions: ClassSession[] }[] = [];

    // Preceding padding
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ dayNumber: 0, dateStr: '', isCurrentMonth: false, sessions: [] });
    }

    // Days of current month
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${yearStr}-${monthStr}-${String(d).padStart(2, '0')}`;
      const daySessions = filteredSessions.filter((s) => s.scheduledDate === dateStr);
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        sessions: daySessions,
      });
    }

    return days;
  }, [activeMonth, filteredSessions]);

  const getPillStyle = (status: ClassStatus) => {
    switch (status) {
      case 'completed':
        return { background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' };
      case 'student_absent':
        return { background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA' };
      case 'teacher_absent':
        return { background: '#FEFCE8', color: '#854D0E', border: '1px solid #FEF08A' };
      case 'no_class':
        return { background: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1' };
      default:
        return { background: '#FFFBEB', color: '#92400E', border: '1px solid #FDE68A' };
    }
  };

  const getStatusLabel = (status: ClassStatus) => {
    switch (status) {
      case 'completed': return '🟢 Present';
      case 'student_absent': return '🔴 Student Absent';
      case 'teacher_absent': return '🟡 Teacher Absent';
      case 'no_class': return '⚪ No Class';
      default: return '🟠 Unrecorded';
    }
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      {/* Header & Filter Bar */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={24} />
              Shared Organization Calendar
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Master schedule across all teachers and students with real-time status filtering
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className={`btn ${viewMode === 'month' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('month')}
            >
              Month View
            </button>
            <button
              className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>

        {/* Filters according to the prompt */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', background: 'var(--bg-subtle)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
          {/* Teacher Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <GraduationCap size={14} color="var(--primary)" />
              Filter Teacher
            </label>
            <select
              className="form-select"
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            >
              <option value="all">All Teachers ({teachers.length})</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Student Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={14} color="var(--accent)" />
              Filter Student
            </label>
            <select
              className="form-select"
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            >
              <option value="all">All Students ({students.length})</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="form-label" style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={14} color="var(--primary)" />
              Filter Status
            </label>
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="completed">🟢 Present / Completed</option>
              <option value="student_absent">🔴 Student Absent</option>
              <option value="teacher_absent">🟡 Teacher Absent</option>
              <option value="no_class">⚪ No Class</option>
              <option value="not_recorded">🟠 Unrecorded</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Rendering */}
      {viewMode === 'month' ? (
        <div className="calendar-wrapper">
          <div className="calendar-days-header">
            {dayNames.map((name) => (
              <div key={name}>{name}</div>
            ))}
          </div>

          <div className="calendar-month-grid">
            {calendarGrid.map((day, idx) => {
              if (!day.isCurrentMonth) {
                return <div key={`pad-${idx}`} className="calendar-day-cell other-month" />;
              }
              const todayStr = new Date().toISOString().split('T')[0];
              const isToday = day.dateStr === todayStr;
              return (
                <div key={day.dateStr} className={`calendar-day-cell ${isToday ? 'today' : ''}`}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '4px',
                    }}
                  >
                    <span className="calendar-day-number">{day.dayNumber}</span>
                    {isToday && (
                      <span
                        style={{
                          fontSize: '0.65rem',
                          background: 'var(--accent)',
                          color: '#14241B',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '4px',
                        }}
                      >
                        TODAY
                      </span>
                    )}
                  </div>

                  <div style={{ overflowY: 'auto', flex: 1, maxHeight: '95px' }}>
                    {day.sessions.slice(0, 3).map((sess) => {
                      const student = students.find((s) => s.id === sess.studentId);
                      const teacher = teachers.find((t) => t.id === sess.teacherId);
                      return (
                        <div
                          key={sess.id}
                          className="calendar-session-pill"
                          style={getPillStyle(sess.status)}
                          onClick={() => setSelectedSession(sess)}
                          title={`${sess.scheduledTime} - ${student?.name} (${teacher?.name}) - ${sess.status}`}
                        >
                          <strong>{sess.scheduledTime}</strong> {student?.name}
                        </div>
                      );
                    })}
                    {day.sessions.length > 3 && (
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: 'var(--text-muted)',
                          textAlign: 'center',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedSession(day.sessions[3] || null)}
                      >
                        +{day.sessions.length - 3} more classes
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="card">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Student</th>
                  <th>Teacher</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((sess) => {
                  const student = students.find((s) => s.id === sess.studentId);
                  const teacher = teachers.find((t) => t.id === sess.teacherId);
                  return (
                    <tr
                      key={sess.id}
                      onClick={() => setSelectedSession(sess)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontWeight: 600 }}>{sess.scheduledDate}</td>
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>{sess.scheduledTime}</td>
                      <td style={{ fontWeight: 600 }}>{student?.name}</td>
                      <td>{teacher?.name}</td>
                      <td>{sess.durationMinutes}m</td>
                      <td>
                        <span className="status-badge" style={getPillStyle(sess.status)}>
                          {getStatusLabel(sess.status)}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSession(sess);
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Class Modal */}
      {selectedSession && (
        <ClassDetailModal session={selectedSession} onClose={() => setSelectedSession(null)} />
      )}
    </div>
  );
};
