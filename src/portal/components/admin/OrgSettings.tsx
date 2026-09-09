import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Check,
  Shield,
  Sparkles,
  Database,
  Calendar,
  Users,
  GraduationCap,
  Globe,
  Mail,
  Phone,
} from 'lucide-react';

export const OrgSettings: React.FC = () => {
  const { currentOrg, updateOrganization, activeMonth, setActiveMonth, teachers, students, sessions, isSupabaseActive } = useApp();
  const [orgName, setOrgName] = useState(currentOrg.name);
  const [domain, setDomain] = useState(currentOrg.domain);
  const [managerName, setManagerName] = useState(currentOrg.managerName);
  const [managerEmail, setManagerEmail] = useState(currentOrg.managerEmail);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateOrganization(currentOrg.id, {
      name: orgName.trim(),
      domain: domain.trim(),
      managerName: managerName.trim(),
      managerEmail: managerEmail.trim(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building2 size={24} />
              Academy Information & Director Settings
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Manage your personal school brand parameters, director contact, and operational active term
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        {/* Academy Profile Settings */}
        <div className="card" style={{ marginBottom: 0 }}>
          <div className="card-header">
            <div>
              <div className="card-title">
                <Building2 size={18} color="var(--primary)" />
                Academy Profile
              </div>
              <div className="card-desc">Official Arabic School identification</div>
            </div>
          </div>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">School / Academy Name</label>
              <input
                type="text"
                className="form-input"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Director / Principal Name</label>
              <input
                type="text"
                className="form-input"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Director Contact Email</label>
              <input
                type="email"
                className="form-input"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Website / Domain</label>
              <input
                type="text"
                className="form-input"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Branding Logo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="/arabiyat-logo.png"
                  alt="Logo preview"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.jpg';
                  }}
                  style={{ width: '52px', height: '52px', borderRadius: '12px', objectFit: 'contain', border: '1px solid var(--border-color)', padding: '4px', background: '#FFFFFF' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--primary)', fontFamily: 'var(--font-serif)' }}>Arabiyat Learn</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--coral)', fontWeight: 600 }}>Arabic Made Simple for Kids</div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
              <Check size={16} />
              <span>{isSaved ? 'Settings Saved Successfully!' : 'Save Academy Settings'}</span>
            </button>
          </form>
        </div>

        {/* Operational Overview Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div>
                <div className="card-title">
                  <Calendar size={18} color="var(--primary)" />
                  Academic Schedule Control
                </div>
                <div className="card-desc">Active term for reporting & schedules</div>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label">Active Academic Month</label>
              <select
                className="form-select"
                value={activeMonth}
                onChange={(e) => setActiveMonth(e.target.value)}
              >
                <option value="2026-08">August 2026</option>
                <option value="2026-09">September 2026 (Current)</option>
                <option value="2026-10">October 2026</option>
                <option value="2026-11">November 2026</option>
                <option value="2026-12">December 2026</option>
              </select>
            </div>

            <div
              style={{
                background: 'var(--bg-subtle)',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                fontSize: '0.82rem',
                lineHeight: 1.5,
              }}
            >
              <strong>Academic Note:</strong> Changing the active month automatically recalculates all student attendance records, monthly absence counts, and teacher ledger reports across the platform.
            </div>
          </div>

          {/* Cloud Database Status */}
          <div className="card" style={{ marginBottom: 0 }}>
            <div className="card-header">
              <div>
                <div className="card-title">
                  <Database size={18} color="var(--primary)" />
                  Platform Infrastructure
                </div>
                <div className="card-desc">System health and live data sync</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Database Connection</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    background: isSupabaseActive ? '#ECFDF5' : '#FEF3C7',
                    color: isSupabaseActive ? '#065F46' : '#92400E',
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: isSupabaseActive ? '#10B981' : '#F59E0B',
                    }}
                  />
                  {isSupabaseActive ? 'Supabase Live Connected' : 'Local Persistent Cache Active'}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Teachers Registered</span>
                <strong>{teachers.length} teachers</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Enrolled Students</span>
                <strong>{students.length} students</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Sessions Logged</span>
                <strong>{sessions.length} sessions</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
