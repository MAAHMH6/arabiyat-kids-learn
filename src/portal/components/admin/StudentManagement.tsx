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
} from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const { students, teachers, addStudent, updateStudent, deleteStudent, reassignStudentTeacher } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReassignModalOpen, setIsReassignModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Form states for Add Student
  const [name, setName] = useState('');
  const [teacherId, setTeacherId] = useState(teachers[0]?.id || '');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [startDate, setStartDate] = useState('2026-09-01');
  const [scheduleDays, setScheduleDays] = useState<number[]>([1, 3, 5]); // Mon, Wed, Fri
  const [scheduleTime, setScheduleTime] = useState('5:00 PM');

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

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addStudent({
      name: name.trim(),
      teacherId,
      durationMinutes,
      startDate,
      scheduleDays,
      scheduleTime,
    });

    // Reset & close
    setName('');
    setIsAddModalOpen(false);
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
                <th>Student</th>
                <th>Assigned Teacher</th>
                <th>Class Duration</th>
                <th>Start Date</th>
                <th>Weekly Schedule</th>
                <th>Time</th>
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
                      <td style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>
                        {student.name}
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
                        <span
                          style={{
                            background: 'var(--primary-light)',
                            color: 'var(--primary)',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                          }}
                        >
                          {getDaysFormatted(student.scheduleDays)}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600, color: 'var(--accent)' }}>{student.scheduleTime}</td>
                      <td>
                        <span
                          style={{
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            background: '#ECFDF5',
                            color: '#065F46',
                            fontWeight: 600,
                          }}
                        >
                          Active
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button
                            className="btn btn-outline btn-sm"
                            onClick={() => {
                              setSelectedStudent(student);
                              setNewTeacherId(student.teacherId);
                              setIsReassignModalOpen(true);
                            }}
                            title="Reassign to another teacher while preserving history"
                          >
                            <ArrowRightLeft size={13} />
                            <span>Reassign</span>
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
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Student</h3>
              <button className="modal-close" onClick={() => setIsAddModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Student Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Nawaf"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Teacher</label>
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
