import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Teacher } from '../../types';
import {
  GraduationCap,
  UserPlus,
  Mail,
  Phone,
  CheckCircle2,
  Lock,
  Trash2,
  X,
  Check,
  Calendar,
  Users,
} from 'lucide-react';

export const TeacherManagement: React.FC = () => {
  const { teachers, students, sessions, activeMonth, addTeacher, updateTeacher, deleteTeacher } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    addTeacher({
      name: name.trim(),
      email: email.trim(),
      password: password.trim() || 'teacher123',
      phone: phone.trim() || '+966 50 000 0000',
      status,
    });

    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={24} />
              Teacher Directory & Credentials
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Manage teacher accounts, assign portal login access, and track monthly workloads
            </p>
          </div>

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <UserPlus size={16} />
            <span>Add Teacher</span>
          </button>
        </div>
      </div>

      {/* Teachers Table matching prompt */}
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Students Assigned</th>
                <th>Classes This Month</th>
                <th>Contact Info</th>
                <th>Account Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    <GraduationCap size={32} color="var(--primary)" style={{ margin: '0 auto 10px auto', display: 'block' }} />
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                      No teachers added yet
                    </div>
                    <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                      Add your teachers so you can assign students and create class schedules.
                    </p>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ marginTop: '12px' }}
                      onClick={() => setIsModalOpen(true)}
                    >
                      <UserPlus size={14} />
                      Add First Teacher
                    </button>
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => {
                  const assignedStudents = students.filter((s) => s.teacherId === teacher.id);
                  const teacherSessions = sessions.filter(
                    (s) => s.teacherId === teacher.id && s.scheduledDate.startsWith(activeMonth)
                  );

                  return (
                    <tr key={teacher.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div className="avatar-circle" style={{ width: '32px', height: '32px', fontSize: '0.82rem' }}>
                            {teacher.name.charAt(0)}
                          </div>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{teacher.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{teacher.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={15} color="var(--primary)" />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{assignedStudents.length}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>students</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={15} color="var(--accent)" />
                        <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{teacherSessions.length}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>classes</span>
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{teacher.phone}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          background: teacher.status === 'Active' ? '#ECFDF5' : '#F1F5F9',
                          color: teacher.status === 'Active' ? '#065F46' : '#475569',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: teacher.status === 'Active' ? '#10B981' : '#94A3B8',
                          }}
                        />
                        {teacher.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <button
                          className="btn btn-outline btn-sm"
                          style={{ color: '#EF4444', borderColor: '#FECACA' }}
                          onClick={() => {
                            if (confirm(`Remove teacher ${teacher.name}?`)) {
                              deleteTeacher(teacher.id);
                            }
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Teacher Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Create Teacher Account</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Teacher 4 or Ustadha Aisha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="teacher@arabiyatlearn.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Password / Invite</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Set temporary teacher password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone (optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="+966 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  <span>Create Teacher Account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
