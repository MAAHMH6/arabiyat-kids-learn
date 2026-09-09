import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassSession, ClassStatus } from '../../types';
import { X, Check, CheckCircle2, XCircle, AlertCircle, Slash, BookOpen, FileText } from 'lucide-react';

interface RecordClassModalProps {
  session: ClassSession | null;
  onClose: () => void;
  onSaved?: () => void;
}

export const RecordClassModal: React.FC<RecordClassModalProps> = ({ session, onClose, onSaved }) => {
  const { students, teachers, homeworkTopics, markAttendance } = useApp();

  const [selectedStatus, setSelectedStatus] = useState<ClassStatus>('completed');
  const [topicId, setTopicId] = useState<string>('');
  const [homeworkGiven, setHomeworkGiven] = useState<boolean>(true);
  const [homeworkText, setHomeworkText] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    if (session) {
      setSelectedStatus(session.status !== 'not_recorded' ? session.status : 'completed');
      setTopicId(session.homeworkTopicId || (homeworkTopics[0]?.id || ''));
      setHomeworkGiven(session.homeworkGiven !== undefined ? session.homeworkGiven : true);
      setHomeworkText(session.homeworkText || '');
      setNotes(session.notes || '');
    }
  }, [session, homeworkTopics]);

  if (!session) return null;

  const student = students.find((s) => s.id === session.studentId);
  const teacher = teachers.find((t) => t.id === session.teacherId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    markAttendance(session.id, selectedStatus, {
      homeworkTopicId: topicId,
      homeworkGiven,
      homeworkText,
      notes,
    });
    if (onSaved) onSaved();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">Record Class</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              {session.scheduledDate} • {session.scheduledTime} • {student?.name} ({session.durationMinutes} min)
            </p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave}>
          <div className="modal-body">
            {/* Step 1: Attendance */}
            <div style={{ marginBottom: '22px' }}>
              <label className="form-label" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                1. Attendance Status
              </label>
              <div className="attendance-grid">
                {/* Present */}
                <button
                  type="button"
                  onClick={() => setSelectedStatus('completed')}
                  className={`attendance-option-btn ${selectedStatus === 'completed' ? 'selected-completed' : ''}`}
                >
                  <CheckCircle2 size={20} color="#10B981" />
                  <span>🟢 Present</span>
                </button>

                {/* Student Absent */}
                <button
                  type="button"
                  onClick={() => setSelectedStatus('student_absent')}
                  className={`attendance-option-btn ${selectedStatus === 'student_absent' ? 'selected-student_absent' : ''}`}
                >
                  <XCircle size={20} color="#EF4444" />
                  <span>🔴 Student Absent</span>
                </button>

                {/* Teacher Absent */}
                <button
                  type="button"
                  onClick={() => setSelectedStatus('teacher_absent')}
                  className={`attendance-option-btn ${selectedStatus === 'teacher_absent' ? 'selected-teacher_absent' : ''}`}
                >
                  <AlertCircle size={20} color="#EAB308" />
                  <span>🟡 Teacher Absent</span>
                </button>

                {/* No Class */}
                <button
                  type="button"
                  onClick={() => setSelectedStatus('no_class')}
                  className={`attendance-option-btn ${selectedStatus === 'no_class' ? 'selected-no_class' : ''}`}
                >
                  <Slash size={20} color="#64748B" />
                  <span>⚪ No Class</span>
                </button>
              </div>
            </div>

            {/* Step 2: Homework & Class Log (Shown prominently if present or attended) */}
            <div
              style={{
                background: 'var(--bg-subtle)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <BookOpen size={18} color="var(--primary)" />
                <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary)' }}>
                  2. Homework & Notes
                </span>
              </div>

              {/* Topic */}
              <div className="form-group">
                <label className="form-label">Homework Topic</label>
                <select
                  className="form-select"
                  value={topicId}
                  onChange={(e) => setTopicId(e.target.value)}
                >
                  <option value="">-- Select a topic --</option>
                  {homeworkTopics.map((top) => (
                    <option key={top.id} value={top.id}>
                      {top.title} {top.isCustom ? '(Custom)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Homework given Yes / No */}
              <div className="form-group" style={{ marginBottom: '14px' }}>
                <label className="form-label">Homework given?</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    className={`btn ${homeworkGiven ? 'btn-primary' : 'btn-outline'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setHomeworkGiven(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className={`btn ${!homeworkGiven ? 'btn-primary' : 'btn-outline'}`}
                    style={{ flex: 1, padding: '8px' }}
                    onClick={() => setHomeworkGiven(false)}
                  >
                    No
                  </button>
                </div>
              </div>

              {homeworkGiven && (
                <div className="form-group">
                  <label className="form-label">Homework Task</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Practice 1–10 Arabic numbers."
                    value={homeworkText}
                    onChange={(e) => setHomeworkText(e.target.value)}
                  />
                </div>
              )}

              {/* Notes */}
              <div className="form-group" style={{ marginBottom: '0' }}>
                <label className="form-label">Class Notes</label>
                <textarea
                  className="form-textarea"
                  placeholder="e.g. Practice Arabic fruit names. Great pronunciation today!"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Check size={16} />
              <span>Save Class</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
