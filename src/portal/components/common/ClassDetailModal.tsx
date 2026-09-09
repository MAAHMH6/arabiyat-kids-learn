import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassSession, ClassStatus } from '../../types';
import { X, User, GraduationCap, Calendar, Clock, BookOpen, FileText, Check } from 'lucide-react';

interface ClassDetailModalProps {
  session: ClassSession | null;
  onClose: () => void;
}

export const ClassDetailModal: React.FC<ClassDetailModalProps> = ({ session, onClose }) => {
  const { students, teachers, homeworkTopics, markAttendance } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState<ClassStatus>(session?.status || 'not_recorded');
  const [notes, setNotes] = useState(session?.notes || '');
  const [homeworkText, setHomeworkText] = useState(session?.homeworkText || '');

  if (!session) return null;

  const student = students.find((s) => s.id === session.studentId);
  const teacher = teachers.find((t) => t.id === session.teacherId);
  const topic = homeworkTopics.find((t) => t.id === session.homeworkTopicId);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    markAttendance(session.id, status, {
      notes,
      homeworkText,
    });
    setIsEditing(false);
  };

  const getStatusBadge = (st: ClassStatus) => {
    switch (st) {
      case 'completed':
        return <span className="status-badge status-completed">🟢 Completed</span>;
      case 'student_absent':
        return <span className="status-badge status-student_absent">🔴 Student Absent</span>;
      case 'teacher_absent':
        return <span className="status-badge status-teacher_absent">🟡 Teacher Absent</span>;
      case 'no_class':
        return <span className="status-badge status-no_class">⚪ No Class</span>;
      default:
        return <span className="status-badge status-not_recorded">🟠 Not Recorded</span>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Class Details</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {!isEditing ? (
          <div className="modal-body">
            {/* Class overview */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '20px',
              }}
            >
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {student?.name || 'Student'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <GraduationCap size={15} color="var(--primary)" />
                  Teacher: <strong>{teacher?.name || 'Assigned Teacher'}</strong>
                </div>
              </div>
              <div>{getStatusBadge(session.status)}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
              <div style={{ background: '#FAF8F3', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} /> Date
                </div>
                <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-main)' }}>
                  {session.scheduledDate}
                </div>
              </div>

              <div style={{ background: '#FAF8F3', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={13} /> Time & Duration
                </div>
                <div style={{ fontWeight: 700, marginTop: '2px', color: 'var(--text-main)' }}>
                  {session.scheduledTime} ({session.durationMinutes} mins)
                </div>
              </div>
            </div>

            {/* Homework & Notes info */}
            <div style={{ background: '#FFFFFF', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px', marginBottom: '20px' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <BookOpen size={16} />
                Homework & Topic
              </div>
              <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                <strong>Topic: </strong>
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{topic?.title || 'None / Not recorded'}</span>
              </div>
              <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                <strong>Homework: </strong>
                <span>{session.homeworkText || (session.homeworkGiven ? 'Yes' : 'No homework given')}</span>
              </div>
              <div style={{ fontSize: '0.85rem' }}>
                <strong>Teacher Notes: </strong>
                <p style={{ marginTop: '4px', color: 'var(--text-muted)', fontStyle: session.notes ? 'normal' : 'italic' }}>
                  {session.notes || 'No notes added for this class.'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ClassStatus)}
                >
                  <option value="completed">🟢 Completed / Present</option>
                  <option value="student_absent">🔴 Student Absent</option>
                  <option value="teacher_absent">🟡 Teacher Absent</option>
                  <option value="no_class">⚪ No Class</option>
                  <option value="not_recorded">🟠 Not Recorded</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Homework Task</label>
                <input
                  type="text"
                  className="form-input"
                  value={homeworkText}
                  onChange={(e) => setHomeworkText(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-textarea"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                <Check size={16} />
                Save Changes
              </button>
            </div>
          </form>
        )}

        {!isEditing && (
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
              Edit Record
            </button>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
