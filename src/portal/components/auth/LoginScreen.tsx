import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, Mail, ArrowRight, ArrowLeft, ShieldCheck, HelpCircle } from 'lucide-react';
import arabiyatLogo from '@/assets/arabiyat-logo.png';

interface LoginScreenProps {
  onBackToLanding?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onBackToLanding }) => {
  const { login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email/username and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.message || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to authenticate. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #FAF8F3 0%, #EFE8D8 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background watermark */}
      <div
        style={{
          position: 'absolute',
          fontFamily: 'var(--font-arabic, "Traditional Arabic", Amiri, serif)',
          fontSize: '12rem',
          fontWeight: 700,
          color: 'rgba(20, 61, 43, 0.03)',
          right: '-50px',
          bottom: '-60px',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        مدرسة اللغة العربية
      </div>

      {onBackToLanding && (
        <button
          type="button"
          onClick={onBackToLanding}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: '#FFFFFF',
            border: '1px solid var(--border-color, #E2E8F0)',
            padding: '8px 16px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--primary, #0C3E35)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            zIndex: 20,
            transition: 'all 0.2s ease',
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to ArabiyatLearn</span>
        </button>
      )}

      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid var(--border-color, #E2E8F0)',
          boxShadow: '0 20px 45px rgba(12, 62, 53, 0.09)',
          width: '100%',
          maxWidth: '440px',
          padding: '36px 32px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '26px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 14px auto',
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#FFFFFF',
              boxShadow: '0 8px 20px rgba(12, 62, 53, 0.08)',
              padding: '6px',
              border: '2px solid rgba(12, 62, 53, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={arabiyatLogo}
              alt="ArabiyatLearn Logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--coral, #C8707E)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            ArabiyatLearn • Academy Portal
          </p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary, #0C3E35)', marginTop: '4px', fontFamily: 'var(--font-serif, "Playfair Display", serif)' }}>
            Welcome Back
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '4px' }}>
            Sign in to access your academy workspace
          </p>
        </div>

        {error && (
          <div
            style={{
              background: '#FEF2F2',
              color: '#991B1B',
              padding: '10px 14px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              marginBottom: '18px',
              border: '1px solid #FECACA',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '16px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
              <Mail size={15} color="var(--primary, #0C3E35)" />
              Email or Username
            </label>
            <input
              type="text"
              className="form-input"
              placeholder="admin@arabiyatlearn.com or your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
              <Lock size={15} color="var(--primary, #0C3E35)" />
              Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter account password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '0.92rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '13px',
              fontSize: '1rem',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              background: 'var(--primary, #0C3E35)',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 4px 14px rgba(12, 62, 53, 0.25)',
            }}
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div
          style={{
            marginTop: '22px',
            padding: '12px 14px',
            borderRadius: '12px',
            background: 'var(--bg-subtle, #F8FAFC)',
            border: '1px solid #E2E8F0',
            fontSize: '0.8rem',
            color: '#64748B',
            lineHeight: 1.5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
            <ShieldCheck size={14} color="var(--primary, #0C3E35)" />
            <span>Unified Academy Access</span>
          </div>
          Director, Teacher, and Student accounts sign in here. Credentials are managed by ArabiyatLearn.
        </div>
      </div>
    </div>
  );
};
