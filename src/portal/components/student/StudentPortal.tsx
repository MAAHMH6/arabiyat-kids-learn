import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar as CalendarIcon, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  Award, 
  Sparkles, 
  FileText,
  AlertCircle,
  Video
} from 'lucide-react';

export const StudentPortal: React.FC = () => {
  const { students, teachers, sessions, homeworkTopics, currentUser, activeMonth } = useApp();

  const isStudentUser = currentUser?.role === 'student';

  // Automatically find the student associated with the logged-in user
  const loggedInStudent = useMemo(() => {
    if (!currentUser) return null;
    return (
      students.find(
        (s) =>
          (s.email && s.email.toLowerCase() === currentUser.email.toLowerCase()) ||
          `usr-${s.id}` === currentUser.id ||
          s.id === currentUser.id
      ) || null
    );
  }, [students, currentUser]);

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    loggedInStudent?.id || students[0]?.id || ''
  );

  const currentStudent = loggedInStudent || students.find((s) => s.id === selectedStudentId) || students[0];
  const teacher = teachers.find((t) => t.id === currentStudent?.teacherId);

  // Sessions for this student
  const studentSessions = sessions.filter((s) => s.studentId === currentStudent?.id);
  const completedSessions = studentSessions.filter((s) => s.status === 'completed');
  const upcomingSessions = studentSessions.filter(
    (s) => s.status === 'not_recorded'
  );

  const homeworkSessions = studentSessions.filter(
    (s) => s.homeworkGiven || s.homeworkTopicId || s.homeworkText
  );

  const meetingUrl = currentStudent?.meetingLink?.trim() || 'https://meet.google.com';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Student Selector Banner - only shown to Admin/Director/Teacher, never to the student himself */}
      {!isStudentUser && students.length > 1 && (
        <div
          style={{
            background: 'var(--bg-card)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent)" />
            <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>
              Viewing Student Profile:
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {students.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStudentId(st.id)}
                className={`btn btn-sm ${
                  st.id === currentStudent?.id ? 'btn-primary' : 'btn-outline'
                }`}
                style={{ borderRadius: '999px' }}
              >
                {st.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Header Welcome Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, #082E27 100%)',
          color: '#FFFFFF',
          padding: '28px',
          borderRadius: 'var(--radius-xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(212, 163, 72, 0.2)',
              color: 'var(--gold)',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '10px',
              border: '1px solid rgba(212, 163, 72, 0.3)',
            }}
          >
            <Sparkles size={12} />
            STUDENT & PARENT ACADEMY DESK • {activeMonth}
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>
            Welcome back, {currentStudent?.name || 'Student'}!
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.95rem', marginTop: '6px' }}>
            Assigned Teacher: <strong>{teacher?.name || 'Ustadha'}</strong> • Schedule: {currentStudent?.scheduleTime || '5:00 PM'} (
            {(currentStudent?.scheduleDays || [1, 3, 5])
              .map((d: number) => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d])
              .join(', ')}
            )
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <a
            href={meetingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn"
            style={{
              background: 'var(--gold, #D4A348)',
              color: 'var(--primary, #0C3E35)',
              fontWeight: 800,
              borderRadius: 'var(--radius-md, 10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 22px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(212, 163, 72, 0.35)',
              fontSize: '0.95rem',
            }}
          >
            <Video size={18} />
            <span>Join Live Class Room</span>
          </a>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.75)' }}>
            {currentStudent?.meetingLink ? '✓ Dedicated room link assigned' : 'Standard live classroom'}
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: 'rgba(12, 62, 53, 0.08)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CalendarIcon size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Total Scheduled</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginTop: '2px', lineHeight: 1 }}>{studentSessions.length}</div>
          </div>
        </div>

        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Completed Classes</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginTop: '2px', lineHeight: 1 }}>{completedSessions.length}</div>
          </div>
        </div>

        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: 'rgba(200, 112, 126, 0.12)', color: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BookOpen size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Homework Assigned</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginTop: '2px', lineHeight: 1 }}>{homeworkSessions.length}</div>
          </div>
        </div>

        <div className="stat-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '12px', background: 'rgba(212, 163, 72, 0.15)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Award size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: 600 }}>Attendance Rate</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginTop: '2px', lineHeight: 1 }}>
              {studentSessions.length > 0
                ? Math.round((completedSessions.length / Math.max(studentSessions.length - upcomingSessions.length, 1)) * 100)
                : 100}
              %
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Upcoming Classes + Homework Notebook */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Homework & Practice Tasks */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--coral-light)',
                  color: 'var(--coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BookOpen size={18} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
                Homework & Learning Logs
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {homeworkSessions.length} tasks
            </span>
          </div>

          {homeworkSessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)' }}>
              <FileText size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
              <p style={{ fontWeight: 600 }}>No homework recorded yet.</p>
              <p style={{ fontSize: '0.85rem' }}>Your teacher will log homework topics after your next class session!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {homeworkSessions.map((s) => {
                const topic = homeworkTopics.find((t) => t.id === s.homeworkTopicId);
                return (
                  <div
                    key={s.id}
                    style={{
                      background: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '14px 16px',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary)' }}>
                        {topic ? `Topic: ${topic.title}` : 'Practice Assignment'}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                        {s.scheduledDate}
                      </span>
                    </div>
                    {s.homeworkText && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '4px' }}>
                        {s.homeworkText}
                      </p>
                    )}
                    {s.notes && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px', fontStyle: 'italic' }}>
                        Teacher Note: "{s.notes}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Classes Schedule */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Clock size={18} />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--primary)' }}>
                Upcoming Classes
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {upcomingSessions.length} classes
            </span>
          </div>

          {upcomingSessions.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--text-muted)' }}>
              <CalendarIcon size={36} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
              <p style={{ fontWeight: 600 }}>All scheduled classes completed!</p>
              <p style={{ fontSize: '0.85rem' }}>Check back next week for your next cohort timetable.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {upcomingSessions.slice(0, 5).map((s) => (
                <div
                  key={s.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: '#FFFFFF',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        padding: '6px 10px',
                        background: 'var(--primary-light)',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: 'var(--primary)',
                      }}
                    >
                      {s.scheduledDate}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                        {s.scheduledTime} ({s.durationMinutes} mins)
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        With {teacher?.name || 'Ustadha'}
                      </div>
                    </div>
                  </div>
                  <span className="status-pill status-unrecorded">
                    Scheduled
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
