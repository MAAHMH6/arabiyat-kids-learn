import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student } from '../../types';
import {
  Users,
  UserPlus,
  Clock,
  Calendar,
  GraduationCap,
  Edit2,
  Trash2,
  Check,
  X,
  ArrowRightLeft,
  Sparkles,
  Video,
  ExternalLink,
  Lock,
} from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const { students, teachers, courses, addStudent, updateStudent, deleteStudent, reassignStudentTeacher } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form states for Add Student
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [startDate, setStartDate] = useState('2026-09-01');
  const [scheduleDays, setScheduleDays] = useState<number[]>([1, 3, 5]); // Mon, Wed, Fri
  const [scheduleTime, setScheduleTime] = useState('5:00 PM');

  // Edit modal state
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [editName, setEditName] = useState('');
  const [editCourseId, setEditCourseId] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editMeetingLink, setEditMeetingLink] = useState('');
  const [editTeacherId, setEditTeacherId] = useState('');
  const [editDuration, setEditDuration] = useState(45);
  const [editStartDate, setEditStartDate] = useState('2026-09-01');
  const [editDays, setEditDays] = useState<number[]>([1, 3, 5]);
  const [editTime, setEditTime] = useState('5:00 PM');
  const [editStatus, setEditStatus] = useState<'Active' | 'Inactive'>('Active');
  const [editNotes, setEditNotes] = useState('');

  // Reassignment form state
  const [newTeacherId, setNewTeacherId] = useState('');

  const dayOptions = [
    { label: 'Sun', value: 0 },
    { label: 'Mon', value: 1 },
    { label: 'Tue', value: 2 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 4 },
    { label: 'Fri', value: 5 },
    { label: 'Sat', value: 6 },
  ];

  const handleToggleDay = (dayVal: number) => {
    if (scheduleDays.includes(dayVal)) {
      setScheduleDays(scheduleDays.filter((d) => d !== dayVal));
    } else {
      setScheduleDays([...scheduleDays, dayVal].sort());
    }
  };

  const handleToggleEditDay = (dayVal: number) => {
    if (editDays.includes(dayVal)) {
      setEditDays(editDays.filter((d) => d !== dayVal));
    } else {
      setEditDays([...editDays, dayVal].sort());
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const selectedCourse = courses.find((c) => c.id === courseId);

    addStudent({
      name: name.trim(),
      teacherId,
      durationMinutes,
      startDate,
      scheduleDays,
      scheduleTime,
      courseId: courseId || undefined,
      courseTitle: selectedCourse?.title || undefined,
      email: email.trim() || undefined,
      password: password.trim() || undefined,
      phone: phone.trim() || undefined,
      meetingLink: meetingLink.trim() || undefined,
    });

    // Reset & close
    setName('');
    setCourseId('');
    setEmail('');
    setPassword('');
    setPhone('');
    setMeetingLink('');
    setIsAddModalOpen(false);
  };

  const handleEditOpen = (student: Student) => {
    setEditingStudent(student);
    setEditName(student.name);
    setEditCourseId(student.courseId || '');
    setEditEmail(student.email || '');
    setEditPassword(student.password || '');
    setEditPhone(student.phone || '');
    setEditMeetingLink(student.meetingLink || '');
    setEditTeacherId(student.teacherId);
    setEditDuration(student.durationMinutes);
    setEditStartDate(student.startDate || '2026-09-01');
    setEditDays(student.scheduleDays || [1, 3, 5]);
    setEditTime(student.scheduleTime);
    setEditStatus(student.status);
    setEditNotes(student.notes || '');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent || !editName.trim()) return;

    const selectedCourse = courses.find((c) => c.id === editCourseId);

    updateStudent(editingStudent.id, {
      name: editName.trim(),
      courseId: editCourseId || undefined,
      courseTitle: selectedCourse?.title || undefined,
      email: editEmail.trim() || undefined,
      password: editPassword.trim() || undefined,
      phone: editPhone.trim() || undefined,
      meetingLink: editMeetingLink.trim() || undefined,
      teacherId: editTeacherId,
      durationMinutes: editDuration,
      startDate: editStartDate,
      scheduleDays: editDays,
      scheduleTime: editTime.trim(),
      status: editStatus,
      notes: editNotes.trim() || undefined,
    });

    setEditingStudent(null);
  };

  const handleReassignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !newTeacherId) return;

    reassignStudentTeacher(selectedStudent.id, newTeacherId);
    setIsReassignModalOpen(false);
    setSelectedStudent(null);
  };

  const getDaysFormatted = (days: number[]) => {
    const map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((d) => map[d]).join(', ');
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={24} />
              Student Assignment & Scheduling
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Assign students to teachers, configure recurring weekly times, and auto-generate class calendars
            </p>
          </div>

          <button className="btn btn-primary" onClick={() => setIsAddModalOpen(true)}>
            <UserPlus size={16} />
            <span>Add New Student</span>
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student & Login</th>
                <th>Assigned Teacher</th>
                <th>Duration</th>
                <th>Start Date</th>
                <th>Weekly Schedule & Time</th>
                <th>Meeting Link</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    <Users size={32} color="var(--accent)" style={{ margin: '0 auto 10px auto', display: 'block' }} />
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                      No students enrolled yet
                    </div>
                    <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                      Click "Add New Student" above to create your first student and assign recurring class times.
                    </p>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: '12px' }}
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      <UserPlus size={14} />
                      Add New Student
                    </button>
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const teacher = teachers.find((t) => t.id === student.teacherId);
                  return (
                    <tr key={student.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                          {student.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                          {student.courseTitle || (student.courseId ? courses.find((c) => c.id === student.courseId)?.title : null) || 'Arabic Alphabet & Phonics'}
                        </div>
                        {student.email && (
                          <div style={{ fontSize: '0.73rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                            <Lock size={11} color="#94A3B8" />
                            <span>{student.email}</span>
                          </div>
                        )}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <GraduationCap size={15} color="var(--primary)" />
                          <span style={{ fontWeight: 600 }}>{teacher?.name || 'Unassigned'}</span>
                        </div>
                      </td>
                      <td>{student.durationMinutes} mins</td>
                      <td style={{ color: 'var(--text-muted)' }}>{student.startDate}</td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span
                            style={{
                              background: 'var(--primary-light)',
                              color: 'var(--primary)',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              display: 'inline-block',
                              width: 'fit-content',
                            }}
                          >
                            {getDaysFormatted(student.scheduleDays)}
                          </span>
                          <span style={{ fontWeight: 600, color: 'var(--accent)', fontSize: '0.82rem' }}>
                            {student.scheduleTime}
                          </span>
                        </div>
                      </td>
                      <td>
                        {student.meetingLink ? (
                          <a
                            href={student.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '3px 8px',
                              borderRadius: '6px',
                              background: '#ECFDF5',
                              color: '#065F46',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              textDecoration: 'none',
                            }}
                          >
                            <Video size={12} />
                            <span>Meeting Room</span>
                            <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span style={{ color: '#94A3B8', fontSize: '0.75rem' }}>No link</span>
                        )}
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            background: student.status === 'Active' ? '#ECFDF5' : '#F1F5F9',
                            color: student.status === 'Active' ? '#065F46' : '#64748B',
                            fontWeight: 600,
                          }}
                        >
                          {student.status || 'Active'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => handleEditOpen(student)}
                            title="Edit student details fully"
                          >
                            <Edit2 size={13} />
                            <span>Edit</span>
                          </button>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => {
                              setSelectedStudent(student);
                              setNewTeacherId(student.teacherId);
                              setIsReassignModalOpen(true);
                            }}
                            title="Reassign to another teacher"
                          >
                            <ArrowRightLeft size={13} />
                          </button>
                          <button
                            className="btn btn-outline btn-sm"
                            style={{ color: '#EF4444', borderColor: '#FECACA' }}
                            onClick={() => {
                              if (confirm(`Are you sure you want to remove ${student.name}?`)) {
                                deleteStudent(student.id);
                              }
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Enrol New Student & Configure Schedule</h3>
              <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                <div className="form-group">
                  <label className="form-label">Student Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Nawaf Al-Qahtani"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Student / Parent Login Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Student Portal Password</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. student123"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="e.g. +966 or phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Assign Teacher</label>
                    <select
                      className="form-select"
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                    >
                      {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Enrolled Course</label>
                    <select
                      className="form-select"
                      value={courseId}
                      onChange={(e) => setCourseId(e.target.value)}
                    >
                      <option value="">General Arabic Foundations</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} ({c.level})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Class Duration</label>
                    <select
                      className="form-select"
                      value={durationMinutes}
                      onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    >
                      <option value={30}>30 minutes</option>
                      <option value={40}>40 minutes (Demo)</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Schedule Days */}
                <div className="form-group">
                  <label className="form-label">Weekly Schedule</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {dayOptions.map((day) => {
                      const isChecked = scheduleDays.includes(day.value);
                      return (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => handleToggleDay(day.value)}
                          style={{
                            flex: '1 0 42px',
                            padding: '8px 4px',
                            borderRadius: '8px',
                            border: `1.5px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`,
                            background: isChecked ? 'var(--primary-light)' : '#FFFFFF',
                            color: isChecked ? 'var(--primary)' : 'var(--text-main)',
                            fontWeight: isChecked ? 700 : 500,
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                          }}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Recurring classes will be auto-generated across the month for selected days.
                  </span>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 5:00 PM"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>Save & Generate Classes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="modal-overlay" onClick={() => setEditingStudent(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Edit Student & Meeting Link</h3>
              <button className="modal-close" onClick={() => setEditingStudent(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="modal-body" style={{ maxHeight: '72vh', overflowY: 'auto' }}>
                <div className="form-group">
                  <label className="form-label">Student Name *</label>
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
                    <label className="form-label">Student / Parent Login Email</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="student@example.com"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Student Portal Password</label>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Assign Teacher</label>
                    <select
                      className="form-select"
                      value={editTeacherId}
                      onChange={(e) => setEditTeacherId(e.target.value)}
                    >
                      {teachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.status})
                        </option>
                      ))}
                    </select>
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

                  <div className="form-group">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as any)}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label">Class Duration</label>
                    <select
                      className="form-select"
                      value={editDuration}
                      onChange={(e) => setEditDuration(Number(e.target.value))}
                    >
                      <option value={30}>30 minutes</option>
                      <option value={40}>40 minutes (Demo)</option>
                      <option value={45}>45 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={editStartDate}
                      onChange={(e) => setEditStartDate(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Schedule Days */}
                <div className="form-group">
                  <label className="form-label">Weekly Schedule</label>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {dayOptions.map((day) => {
                      const isChecked = editDays.includes(day.value);
                      return (
                        <button
                          key={day.value}
                          type="button"
                          onClick={() => handleToggleEditDay(day.value)}
                          style={{
                            flex: '1 0 42px',
                            padding: '8px 4px',
                            borderRadius: '8px',
                            border: `1.5px solid ${isChecked ? 'var(--primary)' : 'var(--border-color)'}`,
                            background: isChecked ? 'var(--primary-light)' : '#FFFFFF',
                            color: isChecked ? 'var(--primary)' : 'var(--text-main)',
                            fontWeight: isChecked ? 700 : 500,
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                          }}
                        >
                          {day.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. 5:00 PM"
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Student Notes & Learning Goals</label>
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="e.g. Needs focus on Makharij, conversational practice, etc."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setEditingStudent(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>Update Student & Sync</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reassign Teacher Modal */}
      {isReassignModalOpen && selectedStudent && (
        <div className="modal-overlay" onClick={() => setIsReassignModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Reassign Teacher</h3>
              <button className="modal-close" onClick={() => setIsReassignModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleReassignSubmit}>
              <div className="modal-body">
                <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '16px' }}>
                  Reassigning <strong>{selectedStudent.name}</strong> to a new teacher.
                </p>

                <div
                  style={{
                    background: 'var(--bg-subtle)',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    marginBottom: '16px',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <Sparkles size={14} color="var(--accent)" style={{ display: 'inline', marginRight: '6px' }} />
                  <strong>Smart Reassignment Rule:</strong> Future uncompleted classes will automatically move to the new teacher, while past recorded classes will remain permanently attached to the original teacher for accurate reporting!
                </div>

                <div className="form-group">
                  <label className="form-label">Select New Teacher</label>
                  <select
                    className="form-select"
                    value={newTeacherId}
                    onChange={(e) => setNewTeacherId(e.target.value)}
                  >
                    {teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.name === teachers.find(old => old.id === selectedStudent.teacherId)?.name ? 'Current' : 'Select'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsReassignModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Reassignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
