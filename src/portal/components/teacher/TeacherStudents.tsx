import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import {
  Users,
  BookOpen,
  Clock,
  Calendar,
  Edit2,
  Check,
  X,
  Plus,
  CheckCircle2,
  UserCheck,
  Trash2,
  Mail,
  FileText,
  AlertTriangle,
  Video,
  Lock,
  Link2,
  ExternalLink,
} from 'lucide-react';

export const TeacherStudents: React.FC = () => {
  const { students, sessions, homeworkTopics, currentUser, teachers, courses, updateStudent, addStudent, deleteStudent } = useApp();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Add student modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addName, setAddName] = useState('');
  const [addCourseId, setAddCourseId] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addMeetingLink, setAddMeetingLink] = useState('');
  const [addDuration, setAddDuration] = useState<number>(45);
  const [addTime, setAddTime] = useState('5:00 PM');
  const [addDays, setAddDays] = useState<number[]>([1, 3, 5]);
  const [addStartDate, setAddStartDate] = useState('2026-09-01');
  const [addNotes, setAddNotes] = useState('');

  // Editing student modal state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editName, setEditName] = useState('');
  const [editCourseId, setEditCourseId] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editMeetingLink, setEditMeetingLink] = useState('');
  const [editDuration, setEditDuration] = useState<number>(45);
  const [editTime, setEditTime] = useState('5:00 PM');
  const [editDays, setEditDays] = useState<number[]>([1, 3, 5]);
  const [editStartDate, setEditStartDate] = useState('2026-09-01');
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState<'Active' | 'Inactive'>('Active');
  const [editSuccessMsg, setEditSuccessMsg] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Find current teacher
  const currentTeacher = useMemo(() => {
    return teachers.find(
      (t) =>
        t.email.toLowerCase() === currentUser?.email?.toLowerCase() ||
        t.profileId === currentUser?.id ||
        t.id === currentUser?.id
    );
  }, [teachers, currentUser]);

  const currentTeacherId = currentTeacher?.id || teachers[0]?.id || 'teacher-default';

  // Filter students assigned to this teacher
  const myStudents = useMemo(() => {
    return students.filter((s) => s.teacherId === currentTeacherId);
  }, [students, currentTeacherId]);

  const studentSessions = selectedStudent
    ? sessions.filter((s) => s.studentId === selectedStudent.id)
    : [];

  const handleOpenEdit = (e: React.MouseEvent, student: Student) => {
    e.stopPropagation();
    setEditingStudent(student);
    setEditName(student.name);
    setEditCourseId(student.courseId || '');
    setEditEmail(student.email || '');
    setEditPassword(student.password || '');
    setEditPhone(student.phone || '');
    setEditMeetingLink(student.meetingLink || '');
    setEditDuration(student.durationMinutes);
    setEditTime(student.scheduleTime);
    setEditDays(student.scheduleDays || [1, 3, 5]);
    setEditStartDate(student.startDate || '2026-09-01');
    setEditNotes(student.notes || '');
    setEditStatus(student.status);
    setEditSuccessMsg('');
    setConfirmDeleteId(null);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editName.trim()) return;

    const selectedCourse = courses.find((c) => c.id === editCourseId);

    const updates: Partial<Student> = {
      name: editName.trim(),
      courseId: editCourseId || undefined,
      courseTitle: selectedCourse?.title || undefined,
      email: editEmail.trim() || undefined,
      password: editPassword.trim() || undefined,
      phone: editPhone.trim() || undefined,
      meetingLink: editMeetingLink.trim() || undefined,
      durationMinutes: editDuration,
      scheduleTime: editTime.trim(),
      scheduleDays: editDays,
      startDate: editStartDate,
      notes: editNotes.trim() || undefined,
      status: editStatus,
    };

    updateStudent(editingStudent.id, updates);

    if (selectedStudent?.id === editingStudent.id) {
      setSelectedStudent({
        ...selectedStudent,
        ...updates,
      });
    }

    setEditSuccessMsg('Student details updated successfully!');
    setTimeout(() => {
      setEditingStudent(null);
      setEditSuccessMsg('');
    }, 900);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addName.trim()) return;

    const selectedCourse = courses.find((c) => c.id === addCourseId);

    addStudent({
      name: addName.trim(),
      teacherId: currentTeacherId,
      durationMinutes: addDuration,
      startDate: addStartDate,
      scheduleDays: addDays,
      scheduleTime: addTime.trim(),
      courseId: addCourseId || undefined,
      courseTitle: selectedCourse?.title || undefined,
      email: addEmail.trim() || undefined,
      password: addPassword.trim() || undefined,
      phone: addPhone.trim() || undefined,
      meetingLink: addMeetingLink.trim() || undefined,
      notes: addNotes.trim() || undefined,
    });

    // Reset and close
    setAddName('');
    setAddCourseId('');
    setAddEmail('');
    setAddPassword('');
    setAddPhone('');
    setAddMeetingLink('');
    setAddNotes('');
    setIsAddModalOpen(false);
  };

  const handleDeleteStudent = (studentId: string) => {
    deleteStudent(studentId);
    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null);
    }
    setEditingStudent(null);
    setConfirmDeleteId(null);
  };

  const toggleEditDay = (dayNum: number) => {
    setEditDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum].sort()
    );
  };

  const toggleAddDay = (dayNum: number) => {
    setAddDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum].sort()
    );
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={24} />
              My Assigned Students & Learning Ledger
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Inspect student learning histories, manage individual profiles, and edit schedules & notes
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                background: 'var(--bg-subtle)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--primary)',
                border: '1px solid var(--border-color)',
              }}
            >
              Enrolled: {myStudents.length}
            </span>

            <button
              type="button"
              className="btn btn-primary"
              style={{ gap: '6px', padding: '8px 16px', fontSize: '0.88rem', borderRadius: '10px' }}
              onClick={() => setIsAddModalOpen(true)}
            >
              <Plus size={16} />
              <span>Add Student</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      {myStudents.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-muted)' }}>
          <UserCheck size={40} color="var(--primary)" style={{ margin: '0 auto 12px auto', display: 'block' }} />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)' }}>
            No Students Currently Assigned
          </h3>
          <p style={{ fontSize: '0.88rem', marginTop: '6px', maxWidth: '480px', margin: '6px auto 16px auto' }}>
            Click the button below to register a student directly to your class roster, or wait for the Academy Director to assign students.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ borderRadius: '10px', gap: '6px' }}
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus size={16} />
            <span>Add First Student</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {myStudents.map((student) => {
            const studentClasses = sessions.filter((s) => s.studentId === student.id);
            const completedCount = studentClasses.filter((s) => s.status === 'completed').length;
            const isSelected = selectedStudent?.id === student.id;

            return (
              <div
                key={student.id}
                className="card"
                style={{
                  marginBottom: 0,
                  cursor: 'pointer',
                  borderColor: isSelected ? 'var(--accent)' : 'var(--border-color)',
                  boxShadow: isSelected ? '0 4px 16px rgba(198, 147, 40, 0.2)' : 'var(--shadow-sm)',
                  position: 'relative',
                  transition: 'all 0.2s',
                }}
                onClick={() => setSelectedStudent(student)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>
                      {student.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '2px 8px',
                          borderRadius: '999px',
                          background: student.status === 'Active' ? '#ECFDF5' : '#F1F5F9',
                          color: student.status === 'Active' ? '#065F46' : '#64748B',
                        }}
                      >
                        {student.status}
                      </span>
                      {student.email && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          • {student.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    style={{ gap: '4px', padding: '5px 12px', fontSize: '0.8rem', borderRadius: '8px' }}
                    onClick={(e) => handleOpenEdit(e, student)}
                    title="Edit student details fully"
                  >
                    <Edit2 size={13} />
                    <span>Edit Details</span>
                  </button>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <BookOpen size={14} color="var(--primary)" />
                    <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.84rem' }}>
                      {student.courseTitle || (student.courseId ? courses.find((c) => c.id === student.courseId)?.title : null) || 'Arabic Alphabet & Phonics'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="var(--primary)" />
                    <span>Timing: <strong>{student.scheduleTime}</strong> ({student.durationMinutes} mins)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <Calendar size={14} color="var(--accent)" />
                    <span>
                      Days:{' '}
                      <strong>
                        {(student.scheduleDays || [1, 3, 5]).map((d) => dayNames[d]).join(', ')}
                      </strong>
                    </span>
                  </div>
                  {student.meetingLink && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                      <Video size={14} color="#10B981" />
                      <a
                        href={student.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#065F46',
                          background: '#ECFDF5',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>Join Meeting Link</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  )}
                  {student.notes && (
                    <div style={{ marginTop: '6px', fontSize: '0.8rem', color: '#475569', fontStyle: 'italic', background: '#F8FAFC', padding: '4px 8px', borderRadius: '6px' }}>
                      Note: {student.notes}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '10px',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.82rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>
                    Completed: <strong>{completedCount}</strong> classes
                  </span>
                  <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
                    {isSelected ? 'Viewing History ↑' : 'View History →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Student Progress History Section */}
      {selectedStudent && (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={20} color="var(--accent)" />
                Learning History & Completed Sessions: {selectedStudent.name}
              </div>
              <div className="card-subtitle" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginTop: '4px' }}>
                <span>Scheduled: {(selectedStudent.scheduleDays || [1, 3, 5]).map((d) => dayNames[d]).join(', ')} at {selectedStudent.scheduleTime}</span>
                {selectedStudent.email && (
                  <span style={{ background: '#F1F5F9', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', color: '#475569' }}>
                    Login: <strong>{selectedStudent.email}</strong> {selectedStudent.password ? `(Pass: ${selectedStudent.password})` : ''}
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {selectedStudent.meetingLink && (
                <a
                  href={selectedStudent.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary"
                  style={{ gap: '6px', textDecoration: 'none', background: '#10B981', borderColor: '#10B981', color: '#FFFFFF' }}
                >
                  <Video size={14} />
                  <span>Start Live Class Room</span>
                </a>
              )}
              <button
                className="btn btn-outline btn-sm"
                onClick={() => setSelectedStudent(null)}
              >
                Close Ledger
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Homework Topic</th>
                  <th>Homework Assigned</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {studentSessions.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                      No classes recorded yet for {selectedStudent.name}.
                    </td>
                  </tr>
                ) : (
                  studentSessions.map((sess) => {
                    const topic = homeworkTopics.find((t) => t.id === sess.homeworkTopicId);
                    return (
                      <tr key={sess.id}>
                        <td style={{ fontWeight: 600 }}>{sess.scheduledDate}</td>
                        <td>{sess.scheduledTime}</td>
                        <td>
                          <span className={`status-badge status-${sess.status}`}>
                            {sess.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontWeight: 600, color: 'var(--accent)' }}>
                            {topic?.title || '—'}
                          </span>
                        </td>
                        <td>{sess.homeworkText || (sess.homeworkGiven ? 'Yes' : 'None')}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{sess.notes || '—'}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* FULL EDIT STUDENT MODAL */}
      {editingStudent && (
        <div className="modal-overlay" onClick={() => setEditingStudent(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit2 size={18} color="var(--primary)" />
                Edit Student Details: {editingStudent.name}
              </h3>
              <button className="modal-close" onClick={() => setEditingStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveStudent}>
              <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                {editSuccessMsg && (
                  <div
                    style={{
                      background: '#ECFDF5',
                      color: '#065F46',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      marginBottom: '16px',
                      border: '1px solid #A7F3D0',
                    }}
                  >
                    ✓ {editSuccessMsg}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Student Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Student / Parent Email (for login)</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="student@example.com"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Student Login Password</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. student123"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Class Meeting Link (Zoom, Meet, Teams)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://meet.google.com/abc-defg-hij"
                      value={editMeetingLink}
                      onChange={(e) => setEditMeetingLink(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="e.g. +966 or phone number"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Enrolled Course</label>
                  <select
                    className="form-select"
                    value={editCourseId}
                    onChange={(e) => setEditCourseId(e.target.value)}
                  >
                    <option value="">General Arabic Foundations</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Lesson Duration</label>
                    <select
                      className="form-select"
                      value={editDuration}
                      onChange={(e) => setEditDuration(Number(e.target.value))}
                    >
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Class Timing *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editTime}
                      onChange={(e) => setEditTime(e.target.value)}
                      placeholder="e.g. 5:00 PM"
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editStartDate}
                      onChange={(e) => setEditStartDate(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Student Status</label>
                    <select
                      className="form-select"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as 'Active' | 'Inactive')}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Weekly Schedule Days</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {dayNames.map((d, index) => {
                      const isSelected = editDays.includes(index);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleEditDay(index)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                            background: isSelected ? 'var(--primary)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                            fontWeight: isSelected ? 700 : 500,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                          }}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label className="form-label">Learning Goals & Curriculum Notes</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="e.g. Arabic reading basics, Tajweed pronunciation, conversational focus..."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                </div>

                {/* Delete / Archive section */}
                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', marginTop: '12px' }}>
                  {confirmDeleteId === editingStudent.id ? (
                    <div style={{ background: '#FEF2F2', padding: '10px 12px', borderRadius: '8px', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.82rem', color: '#991B1B', fontWeight: 600 }}>
                        Are you sure? This removes the student and scheduled classes.
                      </span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          type="button"
                          className="btn btn-sm"
                          style={{ background: '#DC2626', color: '#FFF', padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                          onClick={() => handleDeleteStudent(editingStudent.id)}
                        >
                          Yes, Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline"
                          style={{ padding: '4px 8px', fontSize: '0.75rem', borderRadius: '6px' }}
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}
                      onClick={() => setConfirmDeleteId(editingStudent.id)}
                    >
                      <Trash2 size={14} />
                      <span>Delete / Archive this student</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setEditingStudent(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>Save All Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD STUDENT MODAL FOR TEACHER */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} color="var(--primary)" />
                Add Student to My Roster
              </h3>
              <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStudent}>
              <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                <div className="form-group">
                  <label className="form-label">Student Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Zayd Al-Harbi"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Student / Parent Email (for login)</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="student@example.com"
                      value={addEmail}
                      onChange={(e) => setAddEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Student Login Password</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. student123"
                      value={addPassword}
                      onChange={(e) => setAddPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Class Meeting Link (Zoom, Meet, Teams)</label>
                    <input
                      type="url"
                      className="form-input"
                      placeholder="https://meet.google.com/abc-defg-hij"
                      value={addMeetingLink}
                      onChange={(e) => setAddMeetingLink(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="e.g. +966 or phone number"
                      value={addPhone}
                      onChange={(e) => setAddPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Enrolled Course</label>
                  <select
                    className="form-select"
                    value={addCourseId}
                    onChange={(e) => setAddCourseId(e.target.value)}
                  >
                    <option value="">General Arabic Foundations</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title} ({c.level})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Lesson Duration</label>
                    <select
                      className="form-select"
                      value={addDuration}
                      onChange={(e) => setAddDuration(Number(e.target.value))}
                    >
                      <option value={30}>30 Minutes</option>
                      <option value={45}>45 Minutes</option>
                      <option value={60}>60 Minutes</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Class Timing *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 5:00 PM"
                      value={addTime}
                      onChange={(e) => setAddTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={addStartDate}
                    onChange={(e) => setAddStartDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Weekly Schedule Days</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {dayNames.map((d, index) => {
                      const isSelected = addDays.includes(index);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() => toggleAddDay(index)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            border: `1px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                            background: isSelected ? 'var(--primary)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                            fontWeight: isSelected ? 700 : 500,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                          }}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Learning Goals & Curriculum Notes</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="e.g. Reading level 1, conversation, vocabulary..."
                    value={addNotes}
                    onChange={(e) => setAddNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} />
                  <span>Add Student & Generate Schedule</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
