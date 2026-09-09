import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Organization, SubscriptionPlan } from '../../types';
import {
  ShieldAlert,
  Building2,
  Users,
  GraduationCap,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowUpRight,
  Sparkles,
  X,
  Check,
} from 'lucide-react';

export const FounderDashboard: React.FC = () => {
  const { organizations, students, teachers, updateOrganization, addOrganization } = useApp();
  const [selectedOrgForPlan, setSelectedOrgForPlan] = useState<Organization | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('professional');
  const [selectedStatus, setSelectedStatus] = useState<'active' | 'trial' | 'expired'>('active');

  // Modal to add new organization manager
  const [isAddOrgModalOpen, setIsAddOrgModalOpen] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newManagerName, setNewManagerName] = useState('');
  const [newManagerEmail, setNewManagerEmail] = useState('');
  const [newOrgPlan, setNewOrgPlan] = useState<SubscriptionPlan>('starter');

  const handleUpdatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrgForPlan) return;

    const maxTeachers = selectedPlan === 'starter' ? 3 : selectedPlan === 'professional' ? 10 : 999;
    const maxStudents = selectedPlan === 'starter' ? 30 : selectedPlan === 'professional' ? 100 : 9999;

    updateOrganization(selectedOrgForPlan.id, {
      plan: selectedPlan,
      subscriptionStatus: selectedStatus,
      maxTeachers,
      maxStudents,
    });

    setSelectedOrgForPlan(null);
  };

  const handleAddOrg = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName || !newManagerEmail) return;

    const id = `org-${Date.now()}`;
    const maxTeachers = newOrgPlan === 'starter' ? 3 : newOrgPlan === 'professional' ? 10 : 999;
    const maxStudents = newOrgPlan === 'starter' ? 30 : newOrgPlan === 'professional' ? 100 : 9999;

    const newOrg: Organization = {
      id,
      name: newOrgName,
      domain: `${newOrgName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      logoUrl: '/logo.jpg',
      primaryColor: '#143D2B',
      accentColor: '#C69328',
      activeMonth: '2026-09',
      managerName: newManagerName || 'Manager',
      managerEmail: newManagerEmail,
      plan: newOrgPlan,
      subscriptionStatus: 'active',
      maxTeachers,
      maxStudents,
      createdAt: new Date().toISOString().split('T')[0],
    };

    addOrganization(newOrg);
    setIsAddOrgModalOpen(false);
    setNewOrgName('');
    setNewManagerName('');
    setNewManagerEmail('');
  };

  // Calculate platform metrics
  const totalRevenuePKR = organizations.reduce((acc, o) => {
    if (o.subscriptionStatus !== 'active') return acc;
    if (o.plan === 'starter') return acc + 2500;
    if (o.plan === 'professional') return acc + 5000;
    if (o.plan === 'business') return acc + 10000;
    return acc;
  }, 0);

  return (
    <div>
      {/* Founder Top Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          padding: '30px',
          marginBottom: '28px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F59E0B', fontWeight: 700, fontSize: '0.85rem' }}>
            <ShieldAlert size={18} />
            <span>FOUNDER SUPERADMIN CONSOLE</span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginTop: '4px' }}>
            Platform & Subscription Governance
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '0.9rem', marginTop: '4px' }}>
            Grant organization subscriptions, monitor active academy managers, and control multi-tenant licenses.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddOrgModalOpen(true)}>
          <Plus size={16} />
          <span>Grant New Manager Access</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="stats-grid" style={{ marginBottom: '28px' }}>
        <div className="stat-card primary">
          <div className="stat-icon-wrapper" style={{ background: '#EFF6FF', color: '#1D4ED8' }}>
            <Building2 size={22} />
          </div>
          <div className="stat-value">{organizations.length}</div>
          <div className="stat-label">Registered Organizations</div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon-wrapper" style={{ background: '#ECFDF5', color: '#10B981' }}>
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-value">
            {organizations.filter((o) => o.subscriptionStatus === 'active').length}
          </div>
          <div className="stat-label">Active Subscriptions</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <CreditCard size={22} />
          </div>
          <div className="stat-value" style={{ fontSize: '1.5rem' }}>
            PKR {totalRevenuePKR.toLocaleString()}
          </div>
          <div className="stat-label">Monthly Platform MRR</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper" style={{ background: '#F1F5F9', color: '#475569' }}>
            <Users size={22} />
          </div>
          <div className="stat-value">{teachers.length + students.length}</div>
          <div className="stat-label">Total Users (Org-wide)</div>
        </div>
      </div>

      {/* Subscription Role Notice */}
      <div
        style={{
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          borderRadius: 'var(--radius-md)',
          padding: '14px 18px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <Sparkles size={20} color="#D97706" style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.88rem', color: '#92400E' }}>
          <strong>Subscription Policy:</strong> Only <strong>Academy Organizers and Managers</strong> can hold subscription plans. Teachers cannot purchase or configure subscriptions; they only receive managed class access under their manager's license.
        </div>
      </div>

      {/* Organizations & Subscriptions Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <Building2 size={20} color="var(--primary)" />
              Organization Subscriptions & License Control
            </div>
            <div className="card-desc">
              Change subscription tiers, assign allowed teacher limits, or toggle subscription status
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Organization / Academy</th>
                <th>Manager</th>
                <th>Current Plan</th>
                <th>Subscription Status</th>
                <th>Tier Limits</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org) => {
                const planPrice =
                  org.plan === 'starter' ? 'PKR 2,500' : org.plan === 'professional' ? 'PKR 5,000' : 'PKR 10,000';

                return (
                  <tr key={org.id}>
                    <td>
                      <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '0.95rem' }}>
                        {org.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{org.domain}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{org.managerName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{org.managerEmail}</div>
                    </td>
                    <td>
                      <span
                        style={{
                          textTransform: 'uppercase',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: org.plan === 'professional' ? 'var(--accent-light)' : 'var(--bg-subtle)',
                          color: org.plan === 'professional' ? 'var(--accent)' : 'var(--text-main)',
                          border: `1px solid ${org.plan === 'professional' ? 'var(--accent)' : 'var(--border-color)'}`,
                        }}
                      >
                        {org.plan} ({planPrice}/mo)
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: org.subscriptionStatus === 'active' ? '#ECFDF5' : '#FEF2F2',
                          color: org.subscriptionStatus === 'active' ? '#065F46' : '#991B1B',
                        }}
                      >
                        <span
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: org.subscriptionStatus === 'active' ? '#10B981' : '#EF4444',
                          }}
                        />
                        {org.subscriptionStatus.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      <div>Max Teachers: <strong>{org.maxTeachers}</strong></div>
                      <div>Max Students: <strong>{org.maxStudents}</strong></div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => {
                          setSelectedOrgForPlan(org);
                          setSelectedPlan(org.plan);
                          setSelectedStatus(org.subscriptionStatus);
                        }}
                      >
                        Modify License
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modify License Modal */}
      {selectedOrgForPlan && (
        <div className="modal-overlay" onClick={() => setSelectedOrgForPlan(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Modify Organization License</h3>
              <button className="modal-close" onClick={() => setSelectedOrgForPlan(null)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdatePlan}>
              <div className="modal-body">
                <p style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
                  Updating subscription for <strong>{selectedOrgForPlan.name}</strong> (Manager: {selectedOrgForPlan.managerName}).
                </p>

                <div className="form-group">
                  <label className="form-label">Select Subscription Plan</label>
                  <select
                    className="form-select"
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as SubscriptionPlan)}
                  >
                    <option value="starter">Starter (PKR 2,500/mo — Up to 3 Teachers, 30 Students)</option>
                    <option value="professional">Professional (PKR 5,000/mo — Up to 10 Teachers, 100 Students)</option>
                    <option value="business">Business (PKR 10,000/mo — Unlimited Teachers & Students)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subscription Status</label>
                  <select
                    className="form-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as 'active' | 'trial' | 'expired')}
                  >
                    <option value="active">Active (Full Access)</option>
                    <option value="trial">Trial Period</option>
                    <option value="expired">Expired / Suspended</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setSelectedOrgForPlan(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  Save License Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grant New Organization Modal */}
      {isAddOrgModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddOrgModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Grant Manager Access</h3>
              <button className="modal-close" onClick={() => setIsAddOrgModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddOrg}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Academy / Organization Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Al-Madinah Academy"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Manager Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Tariq Al-Ghamdi"
                    value={newManagerName}
                    onChange={(e) => setNewManagerName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Manager Email (Used for Login)</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="manager@academy.com"
                    value={newManagerEmail}
                    onChange={(e) => setNewManagerEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subscription Tier</label>
                  <select
                    className="form-select"
                    value={newOrgPlan}
                    onChange={(e) => setNewOrgPlan(e.target.value as SubscriptionPlan)}
                  >
                    <option value="starter">Starter — PKR 2,500/mo (3 Teachers)</option>
                    <option value="professional">Professional — PKR 5,000/mo (10 Teachers)</option>
                    <option value="business">Business — PKR 10,000/mo (Unlimited)</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setIsAddOrgModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={16} />
                  Grant Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
