import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseItem } from '../../types';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Layers,
  Sparkles,
  ExternalLink,
  X
} from 'lucide-react';

export const CoursesManagement: React.FC = () => {
  const { courses, addCourse, updateCourse, deleteCourse } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'>('Beginner');
  const [category, setCategory] = useState('Alphabet');
  const [price, setPrice] = useState('49');
  const [lessonsCount, setLessonsCount] = useState('16');
  const [duration, setDuration] = useState('8 weeks');
  const [thumbnailUrl, setThumbnailUrl] = useState('/assets/course-thumb-1.jpg');
  const [outcomesText, setOutcomesText] = useState('');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');

  const openAddModal = () => {
    setEditingCourse(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setLevel('Beginner');
    setCategory('Speaking');
    setPrice('49');
    setLessonsCount('16');
    setDuration('8 weeks');
    setThumbnailUrl('/assets/course-thumb-1.jpg');
    setOutcomesText('Interactive speaking exercises\nFoundational grammar & phonics\nLive practice with native speaker');
    setStatus('Published');
    setIsModalOpen(true);
  };

  const openEditModal = (course: CourseItem) => {
    setEditingCourse(course);
    setTitle(course.title);
    setSlug(course.slug);
    setDescription(course.description);
    setLevel(course.level);
    setCategory(course.category);
    setPrice(course.price.toString());
    setLessonsCount(course.lessonsCount.toString());
    setDuration(course.duration);
    setThumbnailUrl(course.thumbnailUrl || '/assets/course-thumb-1.jpg');
    setOutcomesText(course.outcomes.join('\n'));
    setStatus(course.status);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const outcomes = outcomesText
      .split('\n')
      .map((o) => o.trim())
      .filter(Boolean);

    const generatedSlug = slug.trim()
      ? slug.trim().toLowerCase().replace(/\s+/g, '-')
      : title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCourse) {
      updateCourse(editingCourse.id, {
        title: title.trim(),
        slug: generatedSlug,
        description: description.trim(),
        level,
        category,
        price: parseFloat(price) || 0,
        lessonsCount: parseInt(lessonsCount, 10) || 0,
        duration: duration.trim(),
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        outcomes: outcomes.length > 0 ? outcomes : ['Core Arabic Language Proficiency'],
        status,
      });
    } else {
      addCourse({
        title: title.trim(),
        slug: generatedSlug,
        description: description.trim(),
        level,
        category,
        price: parseFloat(price) || 0,
        lessonsCount: parseInt(lessonsCount, 10) || 0,
        duration: duration.trim(),
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        outcomes: outcomes.length > 0 ? outcomes : ['Core Arabic Language Proficiency'],
        status,
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, courseTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
      deleteCourse(id);
    }
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || c.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0C3E35 0%, #155E50 100%)',
          color: '#FFFFFF',
          padding: '24px 28px',
          borderRadius: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 4px 20px rgba(12, 62, 53, 0.15)',
        }}
      >
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(212, 163, 72, 0.2)',
              color: '#F9E2A8',
              padding: '4px 12px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              marginBottom: '8px',
            }}
          >
            <Sparkles size={12} />
            ACADEMY CURRICULUM & CATALOG
          </span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-serif)' }}>
            Course Management
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', marginTop: '4px', margin: 0 }}>
            Configure and publish curriculum courses for students and the public academy showcase.
          </p>
        </div>

        <button
          onClick={openAddModal}
          style={{
            background: 'var(--gold, #D4A348)',
            color: '#0C3E35',
            fontWeight: 700,
            fontSize: '0.9rem',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
            transition: 'all 0.2s ease',
          }}
        >
          <Plus size={18} />
          Add New Course
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#FFFFFF',
          padding: '16px 20px',
          borderRadius: '14px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '260px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search courses by title, topic, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 38px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '0.9rem',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B' }}>Level:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.82rem',
                fontWeight: 600,
                border: '1px solid',
                borderColor: selectedLevel === lvl ? '#0C3E35' : '#E2E8F0',
                background: selectedLevel === lvl ? '#0C3E35' : '#FFFFFF',
                color: selectedLevel === lvl ? '#FFFFFF' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              {/* Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span
                  style={{
                    background: 'rgba(12, 62, 53, 0.08)',
                    color: '#0C3E35',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {course.level} • {course.category}
                </span>
                <span
                  style={{
                    background: course.status === 'Published' ? '#DCFCE7' : '#F1F5F9',
                    color: course.status === 'Published' ? '#166534' : '#64748B',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {course.status}
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px', lineHeight: 1.3 }}>
                {course.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5, flex: 1, marginBottom: '16px' }}>
                {course.description}
              </p>

              {/* Meta Info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 14px',
                  background: '#F8FAFC',
                  borderRadius: '10px',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                  color: '#475569',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Layers size={15} color="#0C3E35" />
                  <span>{course.lessonsCount} lessons</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={15} color="#0C3E35" />
                  <span>{course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: 'auto', fontWeight: 700, color: '#0C3E35', fontSize: '0.95rem' }}>
                  ${course.price}
                </div>
              </div>

              {/* Learning Outcomes Preview */}
              {course.outcomes && course.outcomes.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Key Outcomes:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {course.outcomes.slice(0, 3).map((out, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', fontSize: '0.82rem', color: '#334155' }}>
                        <CheckCircle2 size={13} color="#10B981" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '14px', marginTop: 'auto' }}>
                <button
                  onClick={() => openEditModal(course)}
                  style={{
                    flex: 1,
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#334155',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <Edit3 size={15} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id, course.title)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #FCA5A5',
                    background: '#FEF2F2',
                    color: '#DC2626',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  title="Delete Course"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Course Modal */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '640px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '1px solid #E2E8F0',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E2E8F0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#F8FAFC',
              }}
            >
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#0C3E35' }}>
                  {editingCourse ? 'Edit Academy Course' : 'Create New Course'}
                </h3>
                <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>
                  Set curriculum details, pricing, and key learning outcomes.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748B',
                  padding: '6px',
                  borderRadius: '6px',
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arabic Alphabet & Phonics Playground"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Level
                  </label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Speaking, Alphabet, Reading"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="49"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Lessons Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="16"
                    value={lessonsCount}
                    onChange={(e) => setLessonsCount(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    placeholder="8 weeks"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Overview of the course, goals, and target audience..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Learning Outcomes (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder={"Recognize all 28 letters\nMaster letter connections\nBasic vocabulary acquisition"}
                  value={outcomesText}
                  onChange={(e) => setOutcomesText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.88rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                  Publication Status
                </label>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="courseStatus"
                      value="Published"
                      checked={status === 'Published'}
                      onChange={() => setStatus('Published')}
                    />
                    <span>Published (Visible to students)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="courseStatus"
                      value="Draft"
                      checked={status === 'Draft'}
                      onChange={() => setStatus('Draft')}
                    />
                    <span>Draft</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#475569',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '9px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#0C3E35',
                    color: '#FFFFFF',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
