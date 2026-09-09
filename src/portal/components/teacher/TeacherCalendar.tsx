import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassSession } from '../../types';
import { RecordClassModal } from './RecordClassModal';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, User } from 'lucide-react';

export const TeacherCalendar: React.FC = () => {
  const { currentUser, sessions, students, activeMonth, currentOrg, teachers } = useApp();
  const [selectedSession, setSelectedSession] = useState<ClassSession | null>(null);

  const currentTeacher = useMemo(() => {
    return teachers.find(
      (t) =>
        t.email.toLowerCase() === currentUser?.email?.toLowerCase() ||
        t.profileId === currentUser?.id ||
        t.id === currentUser?.id
    );
  }, [teachers, currentUser]);

  const currentTeacherId = currentTeacher?.id || '';

  // Filter only sessions assigned to current teacher
  const teacherSessions = useMemo(() => {
    return sessions.filter((s) => {
      if (s.teacherId !== currentTeacherId) return false;
      if (!s.scheduledDate.startsWith(activeMonth)) return false;
      return true;
    });
  }, [sessions, currentTeacherId, activeMonth]);

  // Group by date or display calendar grid
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [yearStr = '2026', monthStr = '09'] = activeMonth.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const calendarDays = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstDayIndex; i++) {
      arr.push({ dayNumber: 0, dateStr: '', isCurrent: false, sessions: [] });
    }
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${yearStr}-${monthStr}-${String(d).padStart(2, '0')}`;
      const daySess = teacherSessions.filter((s) => s.scheduledDate === dateStr);
      arr.push({ dayNumber: d, dateStr, isCurrent: true, sessions: daySess });
    }
    return arr;
  }, [yearStr, monthStr, firstDayIndex, totalDays, teacherSessions]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' };
      case 'student_absent': return { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' };
      case 'teacher_absent': return { bg: '#FEFCE8', text: '#854D0E', border: '#FEF08A' };
      case 'no_class': return { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' };
      default: return { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' };
    }
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarIcon size={24} />
              My Teaching Calendar
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              September 2026 • Private schedule for {currentUser?.name || 'Teacher'}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-wrapper">
        <div className="calendar-days-header">
          {daysOfWeek.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="calendar-month-grid">
          {calendarDays.map((day, idx) => {
            if (!day.isCurrent) {
              return <div key={`pad-${idx}`} className="calendar-day-cell other-month" />;
            }
            const todayStr = new Date().toISOString().split('T')[0];
            const isToday = day.dateStr === todayStr;
            return (
              <div key={day.dateStr} className={`calendar-day-cell ${isToday ? 'today' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span className="calendar-day-number">{day.dayNumber}</span>
                  {isToday && (
                    <span style={{ fontSize: '0.65rem', background: 'var(--accent)', color: '#14241B', fontWeight: 700, padding: '1px 4px', borderRadius: '4px' }}>
                      TODAY
                    </span>
                  )}
                </div>

                <div style={{ overflowY: 'auto', flex: 1, maxHeight: '90px' }}>
                  {day.sessions.map((sess) => {
                    const student = students.find((s) => s.id === sess.studentId);
                    const colors = getStatusColor(sess.status);
                    return (
                      <div
                        key={sess.id}
                        className="calendar-session-pill"
                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                        onClick={() => setSelectedSession(sess)}
                        title={`Click to mark attendance: ${sess.scheduledTime} - ${student?.name}`}
                      >
                        <strong>{sess.scheduledTime}</strong> — {student?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Record Modal */}
      {selectedSession && (
        <RecordClassModal
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};
