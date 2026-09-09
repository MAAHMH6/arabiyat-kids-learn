import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Plus, Trash2, Tag, Search, Filter, CheckCircle2 } from 'lucide-react';

export const HomeworkTopics: React.FC = () => {
  const { homeworkTopics, addHomeworkTopic, deleteHomeworkTopic, sessions, students, teachers } = useApp();
  const [newTopic, setNewTopic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    addHomeworkTopic(newTopic);
    setNewTopic('');
  };

  // Sessions that have homework or notes recorded
  const recordedHomeworkSessions = sessions
    .filter((s) => s.homeworkGiven || s.homeworkText || s.notes)
    .filter((s) => {
      if (!searchQuery) return true;
      const student = students.find((st) => st.id === s.studentId);
      const teacher = teachers.find((t) => t.id === s.teacherId);
      const topic = homeworkTopics.find((top) => top.id === s.homeworkTopicId);
      const q = searchQuery.toLowerCase();
      return (
        student?.name.toLowerCase().includes(q) ||
        teacher?.name.toLowerCase().includes(q) ||
        topic?.title.toLowerCase().includes(q) ||
        s.homeworkText?.toLowerCase().includes(q) ||
        s.notes?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={24} />
              Organization Homework Topics & Teaching Log
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Manage standard teaching topics for the curriculum and audit what was assigned to each student
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum Topics Grid */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="card-header">
          <div>
            <div className="card-title">
              <Tag size={18} color="var(--primary)" />
              Active Curriculum Topics
            </div>
            <div className="card-desc">
              These topics appear automatically in teacher dashboards when recording classes
            </div>
          </div>
        </div>

        {/* Add custom topic form */}
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px', maxWidth: '480px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="Add new topic (e.g. Food & Drinks, Travel, Quranic Roots)"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
            <Plus size={16} />
            Add Topic
          </button>
        </form>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {homeworkTopics.map((topic) => (
            <div
              key={topic.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: topic.isCustom ? 'var(--accent-light)' : 'var(--bg-subtle)',
                border: `1.5px solid ${topic.isCustom ? 'var(--accent)' : 'var(--border-color)'}`,
                color: 'var(--primary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                padding: '6px 14px',
                borderRadius: '999px',
              }}
            >
              <span>{topic.title}</span>
              {topic.isCustom && (
                <button
                  type="button"
                  onClick={() => deleteHomeworkTopic(topic.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#EF4444',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  title="Remove custom topic"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Organization Teaching & Homework Registry */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <BookOpen size={18} color="var(--accent)" />
              Assigned Homework & Curriculum History
            </div>
            <div className="card-desc">
              Review what each teacher assigned and taught across all students
            </div>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '12px' }} />
            <input
              type="text"
              className="form-input"
              placeholder="Search student, teacher, topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '34px', fontSize: '0.85rem' }}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Student</th>
                <th>Teacher</th>
                <th>Topic</th>
                <th>Homework Assigned</th>
                <th>Class Notes & Progress</th>
              </tr>
            </thead>
            <tbody>
              {recordedHomeworkSessions.slice(0, 15).map((session) => {
                const student = students.find((s) => s.id === session.studentId);
                const teacher = teachers.find((t) => t.id === session.teacherId);
                const topic = homeworkTopics.find((top) => top.id === session.homeworkTopicId);

                return (
                  <tr key={session.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                      {session.scheduledDate}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                      {student?.name || 'Student'}
                    </td>
                    <td style={{ fontWeight: 500 }}>
                      {teacher?.name || 'Teacher'}
                    </td>
                    <td>
                      <span
                        style={{
                          background: 'var(--accent-light)',
                          color: 'var(--accent)',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                        }}
                      >
                        {topic?.title || 'General Arabic'}
                      </span>
                    </td>
                    <td style={{ maxWidth: '280px' }}>
                      {session.homeworkText ? (
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 500 }}>
                          {session.homeworkText}
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {session.homeworkGiven ? 'Homework assigned' : 'No homework'}
                        </span>
                      )}
                    </td>
                    <td style={{ maxWidth: '300px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {session.notes || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
