import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Download,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  Slash,
  CalendarCheck,
  TrendingUp,
} from 'lucide-react';

export const AdminReports: React.FC = () => {
  const { monthlyStats, teacherPerformance, activeMonth, currentOrg } = useApp();

  const formattedMonth = activeMonth === '2026-09' ? 'September 2026' : activeMonth;

  const handleExportCSV = () => {
    let csv = 'Teacher,Total Classes,Completed,Student Absence,Teacher Absence,No Class,Unrecorded,Completion Rate\n';
    teacherPerformance.forEach((row) => {
      csv += `"${row.teacherName}",${row.totalClasses},${row.completed},${row.studentAbsence},${row.teacherAbsence},${row.noClass},${row.unrecorded},"${row.completionRate}%"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Monthly_Teaching_Report_${activeMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Header */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={24} />
              Monthly Operational & Attendance Reports
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Monthly performance breakdown and attendance audit for <strong>{currentOrg.name}</strong>
            </p>
          </div>

          <button className="btn btn-outline" onClick={handleExportCSV}>
            <Download size={16} />
            <span>Export CSV Report</span>
          </button>
        </div>
      </div>

      {/* Monthly Report Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #143D2B 0%, #1D543C 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px',
          color: '#FFFFFF',
          marginBottom: '24px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span
              style={{
                fontSize: '0.78rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--accent)',
                fontWeight: 700,
              }}
            >
              Official Attendance Summary
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '2px' }}>
              Monthly Report — {formattedMonth}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#D2E3D8' }}>
              Total scheduled class hours: <strong>{monthlyStats.totalClasses * 0.75} hours</strong> ({monthlyStats.totalClasses} sessions)
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '16px',
              padding: '14px 24px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ fontSize: '0.82rem', color: '#E0EDE6' }}>Total Classes</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--accent)' }}>
              {monthlyStats.totalClasses}
            </div>
          </div>
        </div>

        {/* Breakdown chips matching prompt */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '12px',
            marginTop: '24px',
          }}
        >
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <div style={{ fontSize: '0.75rem', color: '#A7F3D0', fontWeight: 600 }}>🟢 Completed</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{monthlyStats.completed}</div>
          </div>

          <div style={{ background: 'rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
            <div style={{ fontSize: '0.75rem', color: '#FECACA', fontWeight: 600 }}>🔴 Student Absent</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{monthlyStats.studentAbsences}</div>
          </div>

          <div style={{ background: 'rgba(234, 179, 8, 0.2)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(234, 179, 8, 0.4)' }}>
            <div style={{ fontSize: '0.75rem', color: '#FEF08A', fontWeight: 600 }}>🟡 Teacher Absent</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{monthlyStats.teacherAbsences}</div>
          </div>

          <div style={{ background: 'rgba(100, 116, 139, 0.2)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(100, 116, 139, 0.4)' }}>
            <div style={{ fontSize: '0.75rem', color: '#CBD5E1', fontWeight: 600 }}>⚪ No Class</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{monthlyStats.noClass}</div>
          </div>

          <div style={{ background: 'rgba(245, 158, 11, 0.2)', borderRadius: '12px', padding: '12px 14px', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <div style={{ fontSize: '0.75rem', color: '#FDE68A', fontWeight: 600 }}>🟠 Unrecorded</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{monthlyStats.unrecorded}</div>
          </div>
        </div>
      </div>

      {/* Teacher Performance Matrix matching prompt */}
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">
              <TrendingUp size={18} color="var(--primary)" />
              Teacher Performance Matrix
            </div>
            <div className="card-desc">
              Operational teaching consistency, class completion rates, and absence tracking per educator
            </div>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Assigned Students</th>
                <th>Total Classes</th>
                <th>Completed</th>
                <th>Student Absence</th>
                <th>Teacher Absence</th>
                <th>Completion Rate</th>
              </tr>
            </thead>
            <tbody>
              {teacherPerformance.map((item) => (
                <tr key={item.teacherId}>
                  <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                    {item.teacherName}
                  </td>
                  <td>{item.studentCount} students</td>
                  <td style={{ fontWeight: 600 }}>{item.totalClasses}</td>
                  <td>
                    <span style={{ color: '#065F46', fontWeight: 700 }}>{item.completed}</span>
                  </td>
                  <td>
                    <span style={{ color: '#991B1B', fontWeight: 600 }}>{item.studentAbsence}</span>
                  </td>
                  <td>
                    <span style={{ color: '#854D0E', fontWeight: 600 }}>{item.teacherAbsence}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '80px',
                          height: '8px',
                          background: '#E2E8F0',
                          borderRadius: '4px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${item.completionRate}%`,
                            height: '100%',
                            background: item.completionRate >= 85 ? '#10B981' : '#F59E0B',
                          }}
                        />
                      </div>
                      <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{item.completionRate}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
