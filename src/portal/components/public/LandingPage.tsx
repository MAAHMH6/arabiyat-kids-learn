import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Star,
  Check,
  Play,
  Clock,
  BookOpen,
  GraduationCap,
  Shield,
  Smile,
  Video,
  Award,
  Globe,
  Users,
  ChevronRight,
} from 'lucide-react';

interface LandingPageProps {
  onGoToLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToLogin }) => {
  return (
    <div style={{ background: '#FCF9F5', minHeight: '100vh', color: '#112621', fontFamily: 'var(--font-sans)' }}>
      {/* Top Announcement Bar */}
      <div
        style={{
          background: '#072A22',
          color: '#E2ECE7',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '0.8rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          letterSpacing: '0.02em',
        }}
      >
        <span style={{ color: '#D4A348' }}>✦</span>
        <span>All courses for Kids now live! Limited spots available for the 2026 academic term.</span>
        <span style={{ color: '#D4A348' }}>✦</span>
      </div>

      {/* Main Navigation Header */}
      <header
        style={{
          background: 'rgba(252, 249, 245, 0.96)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #EAE2D7',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '16px 28px',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="/arabiyat-logo.png"
              alt="Arabiyat Learn"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/logo.jpg';
              }}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                objectFit: 'contain',
                background: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(12, 62, 53, 0.1)',
                padding: '2px',
                border: '1px solid #EAE2D7',
              }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.25rem', color: '#0C3E35', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Arabiyat Learn
              </div>
              <div style={{ fontSize: '0.74rem', color: '#C8707E', fontWeight: 600 }}>
                Arabic Made Simple for Kids
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
            <a href="#home" style={{ textDecoration: 'none', color: '#0C3E35', fontSize: '0.92rem', fontWeight: 600 }}>
              Home
            </a>
            <a href="#courses" style={{ textDecoration: 'none', color: '#4C655F', fontSize: '0.92rem', fontWeight: 500 }}>
              Courses
            </a>
            <a href="#about" style={{ textDecoration: 'none', color: '#4C655F', fontSize: '0.92rem', fontWeight: 500 }}>
              About
            </a>
            <a href="#how-it-works" style={{ textDecoration: 'none', color: '#4C655F', fontSize: '0.92rem', fontWeight: 500 }}>
              How it Works
            </a>
            <a href="#reviews" style={{ textDecoration: 'none', color: '#4C655F', fontSize: '0.92rem', fontWeight: 500 }}>
              Reviews
            </a>
            <a href="#contact" style={{ textDecoration: 'none', color: '#4C655F', fontSize: '0.92rem', fontWeight: 500 }}>
              Contact
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onGoToLogin}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#0C3E35',
                fontSize: '0.92rem',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 16px',
              }}
            >
              Log in
            </button>
            <button
              className="btn btn-coral"
              onClick={onGoToLogin}
              style={{
                background: '#C8707E',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '9px 22px',
                fontSize: '0.9rem',
                fontWeight: 600,
                boxShadow: '0 4px 14px rgba(200, 112, 126, 0.3)',
              }}
            >
              <span>Demo Class</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          padding: '60px 24px 80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Headline & CTAs */}
          <div>
            {/* Pill Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FDEEEF',
                border: '1px solid #F8D5DA',
                color: '#C8707E',
                padding: '6px 16px',
                borderRadius: '9999px',
                fontSize: '0.82rem',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              <Sparkles size={15} />
              <span>Featured on Arabic TV & Press</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: '#0C3E35',
                marginBottom: '18px',
                letterSpacing: '-0.02em',
              }}
            >
              Arabic Made <br />
              Simple for <span style={{ color: '#C8707E' }}>Kids</span>
            </h1>

            <p
              style={{
                fontSize: '1.1rem',
                color: '#4C655F',
                lineHeight: 1.65,
                marginBottom: '32px',
                maxWidth: '520px',
              }}
            >
              Step-by-step Arabic lessons designed for kids. Help your child understand Quranic Arabic, speak with confidence, and build a lasting foundation.
            </p>

            {/* Pill Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button
                className="btn btn-primary btn-lg"
                onClick={onGoToLogin}
                style={{
                  background: '#0C3E35',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  padding: '14px 32px',
                  fontWeight: 600,
                  boxShadow: '0 6px 20px rgba(12, 62, 53, 0.25)',
                }}
              >
                <span>Explore Courses</span>
              </button>

              <button
                className="btn btn-outline btn-lg"
                onClick={onGoToLogin}
                style={{
                  background: '#FFFFFF',
                  color: '#0C3E35',
                  border: '1.5px solid #EAE2D7',
                  borderRadius: '9999px',
                  padding: '14px 28px',
                  fontWeight: 600,
                }}
              >
                <span>Book a Free Demo</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Trust Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {[
                'Structured Curriculum',
                'Live & Recorded Classes',
                'Native Arabic Teachers',
                'Real Results',
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    color: '#4C655F',
                    background: '#FFFFFF',
                    border: '1px solid #EAE2D7',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontWeight: 600,
                  }}
                >
                  <Check size={14} color="#0C3E35" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(12, 62, 53, 0.12)',
                border: '4px solid #FFFFFF',
                background: 'linear-gradient(135deg, #FDEEEF 0%, #FFF8F2 100%)',
                padding: '24px',
              }}
            >
              {/* Classroom Teaching Showcase Graphic */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '30px 24px',
                  textAlign: 'center',
                  border: '1px solid #F0E8DD',
                }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '80px',
                    height: '80px',
                    borderRadius: '24px',
                    background: '#FDEEEF',
                    color: '#C8707E',
                    fontSize: '2.5rem',
                    marginBottom: '16px',
                    boxShadow: '0 8px 20px rgba(200, 112, 126, 0.2)',
                  }}
                >
                  📖
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: '#0C3E35',
                    marginBottom: '8px',
                  }}
                >
                  تعلم العربية بمرح
                </div>
                <div style={{ fontSize: '0.92rem', color: '#4C655F', marginBottom: '20px' }}>
                  Live interactive sessions with certified native Arabic teachers.
                </div>

                {/* Floating pill stats */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '12px',
                    background: '#FCF9F5',
                    padding: '16px',
                    borderRadius: '16px',
                    border: '1px solid #EAE2D7',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#0C3E35' }}>5,000+</div>
                    <div style={{ fontSize: '0.72rem', color: '#7D9690' }}>Students</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#C8707E' }}>4.9 ★</div>
                    <div style={{ fontSize: '0.72rem', color: '#7D9690' }}>Rating</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#D4A348' }}>100%</div>
                    <div style={{ fontSize: '0.72rem', color: '#7D9690' }}>Kid Safe</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learn Arabic Step by Step Section */}
      <section
        id="about"
        style={{
          padding: '80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ color: '#D4A348', fontSize: '1.1rem', marginBottom: '4px' }}>✦</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: '#0C3E35',
            }}
          >
            Learn Arabic Step by Step
          </h2>
          <p style={{ color: '#4C655F', fontSize: '1rem', marginTop: '6px' }}>
            Structured, joyful curriculum built to take your child from beginner sounds to confident sentences.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
          }}
        >
          {[
            {
              letter: 'أ',
              badgeColor: '#FDEEEF',
              badgeText: '#C8707E',
              title: 'Arabic Alphabet',
              desc: 'Master letter shapes, sounds, connecting rules, and phonics through joyful rhymes.',
            },
            {
              letter: '١',
              badgeColor: '#EBF4F1',
              badgeText: '#0C3E35',
              title: 'Numbers & Counting',
              desc: 'Count from 1 to 100 with interactive games, flashcards, and audio recognition.',
            },
            {
              letter: 'ق',
              badgeColor: '#FFF6E6',
              badgeText: '#D4A348',
              title: 'Everyday Vocabulary',
              desc: 'Essential words for family, food, animals, colors, and classroom objects.',
            },
            {
              letter: 'ت',
              badgeColor: '#FDEEEF',
              badgeText: '#C8707E',
              title: 'Speaking Skills',
              desc: 'Real conversational dialogues that get children speaking proudly in full phrases.',
            },
            {
              letter: 'ص',
              badgeColor: '#EBF4F1',
              badgeText: '#0C3E35',
              title: 'Pronunciation & Tajweed',
              desc: 'Accurate articulation of throat letters and Arabic sounds with native feedback.',
            },
            {
              letter: 'م',
              badgeColor: '#FFF6E6',
              badgeText: '#D4A348',
              title: 'Beginner Conversations',
              desc: 'Daily greetings, introducing oneself, asking questions, and expressing thoughts.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #EAE2D7',
                padding: '24px',
                boxShadow: '0 4px 14px rgba(12, 62, 53, 0.04)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: item.badgeColor,
                  color: item.badgeText,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  marginBottom: '16px',
                }}
              >
                {item.letter}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#0C3E35', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#4C655F', lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Bestseller Showcase */}
      <section
        id="courses"
        style={{
          padding: '0 24px 80px 24px',
          maxWidth: '1160px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '28px',
            border: '1px solid #EAE2D7',
            padding: '40px',
            boxShadow: '0 12px 36px rgba(12, 62, 53, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          {/* Visual Book Art */}
          <div
            style={{
              background: 'linear-gradient(135deg, #FFF9F3 0%, #FDF1F3 100%)',
              borderRadius: '20px',
              padding: '40px 24px',
              textAlign: 'center',
              border: '1px solid #F1E5D8',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '12px' }}>📚</div>
            <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.6rem', color: '#0C3E35', fontWeight: 700 }}>
              كتاب العربية للأطفال
            </div>
            <div style={{ fontSize: '0.85rem', color: '#7D9690', marginTop: '4px' }}>
              Full Interactive Worksheets & Audio Tracks
            </div>
          </div>

          {/* Details */}
          <div>
            <div
              style={{
                display: 'inline-block',
                background: '#FDEEEF',
                color: '#C8707E',
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                padding: '4px 12px',
                borderRadius: '9999px',
                marginBottom: '12px',
              }}
            >
              BESTSELLER
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#0C3E35',
                marginBottom: '10px',
              }}
            >
              Beginner Arabic for Kids
            </h2>
            <p style={{ color: '#4C655F', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Designed for 5–14 year olds to master basic reading, speaking, and writing with fun visual lessons and native teachers.
            </p>

            {/* Spec Matrix */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                marginBottom: '24px',
              }}
            >
              {[
                { label: 'Level', val: 'Absolute Beginner' },
                { label: 'Lessons', val: '36 Live Sessions' },
                { label: 'Duration', val: '12 Weeks' },
                { label: 'Language', val: 'Modern Standard' },
                { label: 'Age Group', val: '5 – 14 Years' },
                { label: 'Certificate', val: 'Included upon completion' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#FAF6F0', padding: '10px 14px', borderRadius: '12px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#7D9690', textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0C3E35' }}>{s.val}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 800, color: '#0C3E35' }}>
                  $99
                </span>
                <span style={{ fontSize: '0.82rem', color: '#7D9690', marginLeft: '6px' }}>/ full access</span>
              </div>
              <button
                className="btn btn-primary"
                onClick={onGoToLogin}
                style={{
                  borderRadius: '9999px',
                  padding: '12px 28px',
                  fontWeight: 600,
                }}
              >
                <span>View Course</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: '80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ color: '#D4A348', fontSize: '1.1rem', marginBottom: '4px' }}>✦</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: '#0C3E35',
            }}
          >
            How It Works
          </h2>
          <p style={{ color: '#4C655F', fontSize: '1rem', marginTop: '6px' }}>
            Getting your child started with Arabic takes less than two minutes.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          {[
            { step: '01', title: 'Choose a Course', desc: 'Pick the right level and learning pace suited for your child.' },
            { step: '02', title: 'Enroll in Seconds', desc: 'Sign up and get assigned to your dedicated native teacher.' },
            { step: '03', title: 'Watch & Practice', desc: 'Join interactive classes and complete engaging homework.' },
            { step: '04', title: 'Celebrate Milestones', desc: 'Watch your child speak Arabic and earn accredited certificates.' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #EAE2D7',
                padding: '28px 20px',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(12, 62, 53, 0.04)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#0C3E35',
                  color: '#FFFFFF',
                  margin: '0 auto 16px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                }}
              >
                {item.step}
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 700, color: '#0C3E35', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#4C655F', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-coral btn-lg"
            onClick={onGoToLogin}
            style={{
              borderRadius: '9999px',
              padding: '14px 34px',
              fontWeight: 600,
              boxShadow: '0 6px 20px rgba(200, 112, 126, 0.3)',
            }}
          >
            <span>Start Learning Today</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Dark Forest Green Section: "Learning Arabic Should Feel Simple." */}
      <section
        style={{
          background: '#0C3E35',
          color: '#FFFFFF',
          padding: '90px 24px',
        }}
      >
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              Learning Arabic Should Feel Simple.
            </h2>
            <p style={{ color: '#D5E6DC', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              We stripped away complicated grammar jargon to focus on natural speaking, fun drills, and memorable lessons.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                emoji: '🧩',
                title: 'Fun & Short Lessons',
                desc: 'Bite-sized 30-to-45 minute classes carefully paced so kids stay fully engaged without feeling overwhelmed.',
              },
              {
                emoji: '📹',
                title: 'Recorded Classes',
                desc: 'Every live class is archived for lifetime replay, making homework review and revision effortless.',
              },
              {
                emoji: '👩‍🏫',
                title: 'Native Arabic Teachers',
                desc: 'Vetted, friendly instructors who specialize in early childhood phonetics and conversational confidence.',
              },
              {
                emoji: '🎨',
                title: 'Designed for Kids',
                desc: 'Colorful illustrated guides, gamified quizzes, and cheerful certificates designed to spark a love for the language.',
              },
              {
                emoji: '📱',
                title: 'Kid-Friendly Platform',
                desc: 'Simple, distraction-free student portal that runs smoothly on iPad, tablets, laptops, and mobile phones.',
              },
              {
                emoji: '🛡️',
                title: 'Safe Learning Environment',
                desc: '100% ad-free, verified safe space with direct parental visibility into attendance, progress, and homework.',
              },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  padding: '28px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{f.emoji}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                  {f.title}
                </h3>
                <p style={{ color: '#C5D8CF', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section
        style={{
          padding: '90px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ color: '#D4A348', fontSize: '1.1rem', marginBottom: '4px' }}>✦</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: '#0C3E35',
            }}
          >
            Popular Courses
          </h2>
          <p style={{ color: '#4C655F', fontSize: '1rem', marginTop: '6px' }}>
            Carefully structured courses for children of all levels and ages.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {[
            {
              emoji: '📚',
              tag: 'BEGINNER • 4.9 ★',
              title: 'Beginner Arabic for Kids',
              desc: 'Learn basic conversational sentences, everyday words, and basic writing.',
              duration: '12 Weeks • 36 Classes',
              price: '$99',
            },
            {
              emoji: 'عَائِلَة',
              tag: 'FOUNDATION • 4.9 ★',
              title: 'Arabic Alphabet for Kids',
              desc: 'Master the 28 letters, shapes, phonics, vowels, and handwriting.',
              duration: '8 Weeks • 24 Classes',
              price: '$79',
            },
            {
              emoji: '١٢٣',
              tag: 'NUMBERS • 4.8 ★',
              title: 'Arabic Numbers & Counting',
              desc: 'Learn numbers 1 to 100, simple addition, and everyday counting games.',
              duration: '6 Weeks • 18 Classes',
              price: '$59',
            },
          ].map((course, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '24px',
                border: '1px solid #EAE2D7',
                overflow: 'hidden',
                boxShadow: '0 6px 20px rgba(12, 62, 53, 0.05)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  height: '180px',
                  background: 'linear-gradient(135deg, #FFF6F0 0%, #FDEEEF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3.5rem',
                  fontFamily: 'var(--font-arabic)',
                  fontWeight: 700,
                  color: '#0C3E35',
                  borderBottom: '1px solid #EAE2D7',
                }}
              >
                {course.emoji}
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#C8707E', letterSpacing: '0.04em', marginBottom: '6px' }}>
                  {course.tag}
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#0C3E35', marginBottom: '8px' }}>
                  {course.title}
                </h3>
                <p style={{ color: '#4C655F', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>
                  {course.desc}
                </p>
                <div style={{ fontSize: '0.78rem', color: '#7D9690', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0E8DC', paddingTop: '16px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800, color: '#0C3E35' }}>
                    {course.price}
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={onGoToLogin}
                    style={{ borderRadius: '9999px', padding: '8px 18px' }}
                  >
                    <span>View Course</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            className="btn btn-outline"
            onClick={onGoToLogin}
            style={{ borderRadius: '9999px', padding: '12px 30px' }}
          >
            <span>See All Courses</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* Free Demo Lesson Card */}
      <section
        style={{
          padding: '0 24px 80px 24px',
          maxWidth: '1160px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '28px',
            border: '1px solid #EAE2D7',
            padding: '40px',
            boxShadow: '0 10px 32px rgba(12, 62, 53, 0.06)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          {/* Mock Video Player */}
          <div
            style={{
              background: '#14241B',
              borderRadius: '20px',
              height: '240px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#FFFFFF',
                color: '#0C3E35',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                cursor: 'pointer',
              }}
            >
              <Play size={24} style={{ marginLeft: '4px' }} />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '20px',
                color: '#FFFFFF',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              Lesson 1 Preview • 15 mins
            </div>
          </div>

          <div>
            <div style={{ color: '#D4A348', fontSize: '1rem', marginBottom: '4px' }}>✦</div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#0C3E35',
                marginBottom: '8px',
              }}
            >
              Try a Free Arabic Lesson
            </h2>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0C3E35', marginBottom: '8px' }}>
              Lesson 1 — Introduction to Arabic
            </div>
            <p style={{ color: '#4C655F', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Experience our engaging teaching method firsthand with zero commitment. No credit card required.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {[
                'Full 15-minute interactive video lesson',
                'Downloadable colorful practice worksheet',
                'Audio pronunciation guide for parents',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#112621' }}>
                  <Check size={16} color="#0C3E35" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary btn-lg"
              onClick={onGoToLogin}
              style={{ borderRadius: '9999px', padding: '12px 30px' }}
            >
              <span>Enroll in Free Lesson</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* What Families Say */}
      <section
        id="reviews"
        style={{
          padding: '40px 24px 80px 24px',
          maxWidth: '1240px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ color: '#D4A348', fontSize: '1.1rem', marginBottom: '4px' }}>✦</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
              fontWeight: 700,
              color: '#0C3E35',
            }}
          >
            What Families Say
          </h2>
          <p style={{ color: '#4C655F', fontSize: '1rem', marginTop: '6px' }}>
            Trusted by over 5,000 parents across Saudi Arabia and worldwide.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              quote: 'My 7-year-old son struggled with Arabic for two years in school. Within 6 weeks with Arabiyat Learn, he was reading letters and excited for every lesson!',
              author: 'Umm Fatima',
              location: 'Riyadh, KSA',
            },
            {
              quote: 'The teachers are so patient, warm, and engaging with children. The homework portal makes it super simple to track attendance and weekly topics.',
              author: 'Dr. Tariq M.',
              location: 'Jeddah, KSA',
            },
            {
              quote: 'Best investment for our family. Living abroad, we wanted our kids to speak pure Arabic and understand Quranic vocabulary. Truly exceptional!',
              author: 'Sarah K.',
              location: 'London, UK',
            },
          ].map((r, i) => (
            <div
              key={i}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #EAE2D7',
                padding: '28px',
                boxShadow: '0 4px 14px rgba(12, 62, 53, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '14px' }}>
                  {[...Array(5)].map((_, starIdx) => (
                    <Star key={starIdx} size={16} fill="#D4A348" color="#D4A348" />
                  ))}
                </div>
                <p style={{ color: '#112621', fontSize: '0.92rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '20px' }}>
                  "{r.quote}"
                </p>
              </div>
              <div style={{ borderTop: '1px solid #F0E8DC', paddingTop: '14px' }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0C3E35' }}>{r.author}</div>
                <div style={{ fontSize: '0.78rem', color: '#7D9690' }}>{r.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Give Your Child the Gift of Arabic Banner */}
      <section
        style={{
          padding: '0 24px 90px 24px',
          maxWidth: '1160px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            background: '#14493F',
            borderRadius: '28px',
            color: '#FFFFFF',
            padding: '60px 32px',
            textAlign: 'center',
            boxShadow: '0 20px 48px rgba(12, 62, 53, 0.18)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ color: '#D4A348', fontSize: '1.4rem', marginBottom: '8px' }}>✦</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            Give Your Child the Gift of Arabic
          </h2>
          <p
            style={{
              fontSize: '1.05rem',
              color: '#D5E6DC',
              maxWidth: '580px',
              margin: '0 auto 32px auto',
              lineHeight: 1.6,
            }}
          >
            Start with a single lesson. Watch your child understand Quranic Arabic, speak with pride, and connect with their heritage.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <button
              className="btn btn-white btn-lg"
              onClick={onGoToLogin}
              style={{
                background: '#FFFFFF',
                color: '#0C3E35',
                borderRadius: '9999px',
                padding: '14px 34px',
                fontWeight: 700,
              }}
            >
              <span>Get Started Now</span>
            </button>

            <button
              className="btn btn-outline btn-lg"
              onClick={onGoToLogin}
              style={{
                background: 'transparent',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '9999px',
                padding: '14px 30px',
                fontWeight: 600,
              }}
            >
              <span>Speak to an Advisor</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        style={{
          background: '#072A22',
          color: '#FFFFFF',
          padding: '60px 24px 30px 24px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <img
                src="/arabiyat-logo.png"
                alt="Arabiyat Learn"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo.jpg';
                }}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  padding: '2px',
                }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '1.2rem' }}>
                  Arabiyat Learn
                </div>
                <div style={{ fontSize: '0.74rem', color: '#C8707E', fontWeight: 600 }}>
                  Arabic Made Simple for Kids
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#A3BDB5', lineHeight: 1.6 }}>
              The premier online Arabic language learning platform designed specifically for children, connecting students with certified native teachers.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#FFFFFF' }}>
              Courses
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#A3BDB5' }}>
              <a href="#courses" style={{ color: 'inherit', textDecoration: 'none' }}>Beginner Arabic</a>
              <a href="#courses" style={{ color: 'inherit', textDecoration: 'none' }}>Arabic Alphabet</a>
              <a href="#courses" style={{ color: 'inherit', textDecoration: 'none' }}>Numbers & Counting</a>
              <a href="#courses" style={{ color: 'inherit', textDecoration: 'none' }}>Tajweed & Phonics</a>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#FFFFFF' }}>
              About
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#A3BDB5' }}>
              <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About the Academy</a>
              <a href="#how-it-works" style={{ color: 'inherit', textDecoration: 'none' }}>How it Works</a>
              <a href="#reviews" style={{ color: 'inherit', textDecoration: 'none' }}>Parent Reviews</a>
              <button
                onClick={onGoToLogin}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: '#C8707E',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '0.86rem',
                }}
              >
                Director & Teacher Portal Login →
              </button>
            </div>
          </div>

          {/* Col 4 */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#FFFFFF' }}>
              Support
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.86rem', color: '#A3BDB5' }}>
              <span>Email: support@arabiyatlearn.com</span>
              <span>WhatsApp: +966 50 123 4567</span>
              <span>Kingdom of Saudi Arabia</span>
            </div>
          </div>
        </div>

        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8rem',
            color: '#7D9E95',
          }}
        >
          <div>© 2026 Arabiyat Learn. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span style={{ cursor: 'pointer', color: '#FFFFFF' }} onClick={onGoToLogin}>Portal Login</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
