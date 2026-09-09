import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassSession } from '../../types';
import { RecordClassModal } from './RecordClassModal';
import {
  Clock,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Slash,
  BookOpen,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigateTab?: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigateTab }) => {
  const { currentUser, sessions, students, activeMonth, teachers } = useApp();
  const [selectedSessionForRecord, setSelectedSessionForRecord] = useState<ClassSession | null>(null);
  const [successToast, setSuccessToast] = useState('');

  // Find logged-in teacher record
  const currentTeacher = useMemo(() => {
    return teachers.find(
      (t) =>
        t.email.toLowerCase() === currentUser?.email?.toLowerCase() ||
        t.profileId === currentUser?.id ||
        t.id === currentUser?.id
    );
  }, [teachers, currentUser]);

  const currentTeacherId = currentTeacher?.id || '';
  const teacherName = currentTeacher?.name || currentUser?.name || 'Teacher';

  // Filter today's classes assigned to this teacher
  const todayStr = new Date().toISOString().split('T')[0];
  const activeClasses = useMemo(() => {
    return sessions
      .filter((s) => (s.scheduledDate === todayStr || s.scheduledDate === '2026-09-08') && s.teacherId === currentTeacherId)
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  }, [sessions, currentTeacherId, todayStr]);

  // Monthly stats for this teacher
  const teacherMonthlySessions = useMemo(() => {
    return sessions.filter(
      (s) => s.scheduledDate.startsWith(activeMonth) && s.teacherId === currentTeacherId
    );
  }, [sessions, activeMonth, currentTeacherId]);

  const completedCount = teacherMonthlySessions.filter((s) => s.status === 'completed').length;
  const teacherAbsencesCount = teacherMonthlySessions.filter((s) => s.status === 'teacher_absent').length;
  const studentAbsencesCount = teacherMonthlySessions.filter((s) => s.status === 'student_absent').length;
  const myAssignedStudents = useMemo(() => {
    return students.filter((s) => s.teacherId === currentTeacherId);
  }, [students, currentTeacherId]);

  const getStatusDisplay = (session: ClassSession) => {
    switch (session.status) {
      case 'completed':
        return (
          <span className="status-badge status-completed">
            🟢 Completed
          </span>
        );
      case 'student_absent':
        return (
          <span className="status-badge status-student_absent">
            🔴 Student Absent
          </span>
        );
      case 'teacher_absent':
        return (
          <span className="status-badge status-teacher_absent">
            🟡 Teacher Absent
          </span>
        );
      case 'no_class':
        return (
          <span className="status-badge status-no_class">
            ⚪ No Class
          </span>
        );
      default:
        return (
          <span className="status-badge status-not_recorded">
            🟠 Needs Attendance
          </span>
        );
    }
  };

  return (
    <div>
      {/* Teacher Hero Banner matching prompt */}
      <div className="teacher-hero-banner">
        <h2 className="teacher-greeting">Good morning, {teacherName}</h2>
        <p className="teacher-subtext">Tuesday, September 8, 2026 • You have {activeClasses.length} classes scheduled today</p>
      </div>

      {successToast && (
        <div
          style={{
            background: '#ECFDF5',
            color: '#065F46',
            border: '1px solid #A7F3D0',
            padding: '12px 18px',
            borderRadius: '12px',
            marginBottom: '20px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Quick Stats for Teacher */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        <div className="stat-card primary">
          <div className="stat-value">{myAssignedStudents.length}</div>
          <div className="stat-label">Assigned Students</div>
        </div>
        <div className="stat-card success">
          <div className="stat-value">{completedCount}</div>
          <div className="stat-label">Classes Completed</div>
        </div>
        <div className="stat-card yellow">
          <div className="stat-value">{teacherAbsencesCount}</div>
          <div className="stat-label">Teacher Absence</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{studentAbsencesCount}</div>
          <div className="stat-label">Student Absences</div>
        </div>
      </div>

      {/* Today's Classes Section according to prompt */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Calendar size={20} color="var(--primary)" />
              Today's Classes
            </div>
            <div className="card-desc">
              Record attendance, log homework, and add Arabic pronunciation notes
            </div>
          </div>
        </div>

        {activeClasses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 20px', color: 'var(--text-muted)' }}>
            <Clock size={32} color="var(--primary)" style={{ margin: '0 auto 10px auto', display: 'block' }} />
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
              No classes scheduled for today
            </div>
            <p style={{ fontSize: '0.82rem', marginTop: '4px' }}>
              Check your teaching calendar to review upcoming weekly classes and assigned student schedules.
            </p>
          </div>
        ) : (
          <div className="today-classes-grid">
          {activeClasses.map((session) => {
            const student = students.find((s) => s.id === session.studentId);
            const isDone = session.status !== 'not_recorded';

            return (
              <div key={session.id} className="teacher-class-card">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="class-time-badge">
                      <Clock size={14} />
                      <span>{session.scheduledTime}</span>
                    </div>
                    {getStatusDisplay(session)}
                  </div>

                  <h3 className="class-student-title">{student?.name || 'Nawaf'}</h3>

                  <div className="class-duration-info">
                    <span>{session.durationMinutes} minutes duration</span>
                    <span>•</span>
                    <span>Arabic Lesson</span>
                  </div>

                  {session.notes && (
                    <div
                      style={{
                        background: 'var(--bg-subtle)',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        color: 'var(--text-main)',
                        marginBottom: '16px',
                        borderLeft: '3px solid var(--accent)',
                      }}
                    >
                      <strong>Notes: </strong>
                      <span>{session.notes}</span>
                    </div>
                  )}
                </div>

                <button
                  className={`btn ${isDone ? 'btn-outline' : 'btn-primary'}`}
                  style={{ width: '100%', marginTop: '8px' }}
                  onClick={() => setSelectedSessionForRecord(session)}
                >
                  <Sparkles size={16} />
                  <span>{isDone ? 'Update Attendance / Homework' : 'Mark Attendance'}</span>
                </button>
              </div>
            );
          })}
        </div>
        )}
      </div>

      {/* Record Class Modal */}
      {selectedSessionForRecord && (
        <RecordClassModal
          session={selectedSessionForRecord}
          onClose={() => setSelectedSessionForRecord(null)}
          onSaved={() => {
            setSuccessToast('Class attendance and homework updated successfully!');
            setTimeout(() => setSuccessToast(''), 4000);
          }}
        />
      )}
    </div>
  );
};
