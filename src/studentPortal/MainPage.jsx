import { useState } from 'react';
import Header from '../components/header.jsx';
import '../styles/theme.css';
import './MainPage.css';
import NotificationBoard from "../components/NotificationBoard";

function initialTheme() {
  const saved = window.localStorage.getItem('sp-theme');
  if (saved) return saved;
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const DICT = {
  en: {
    btnLogin: 'Log In',
    btnReg: 'New Registration',
    heroTitle: 'One Stop Portal for',
    heroTitleAccent: 'All Student Services',
    heroLead:
      'Register, apply for examinations, download admit cards, check results and get your certificates — all in one place.',
  },
  hi: {
    btnLogin: 'लॉग इन',
    btnReg: 'नया पंजीकरण',
    heroTitle: 'सभी छात्र सेवाओं के लिए',
    heroTitleAccent: 'एक ही पोर्टल',
    heroLead:
      'पंजीकरण करें, परीक्षा के लिए आवेदन करें, प्रवेश पत्र डाउनलोड करें, परिणाम देखें और अपने प्रमाणपत्र प्राप्त करें — सब कुछ एक ही स्थान पर।',
  },
};

const NOTIFICATIONS = [
  {
    category: 'exam',
    status: 'new',
    stripe: 'var(--rose)',
    text: 'Exam application window opens for Institute Candidates',
    time: '05 Apr 2026 → last date to apply: 15 Apr 2026',
  },
  {
    category: 'exam',
    status: 'new',
    stripe: 'var(--rose)',
    text: 'Last date for Online Registration Application (Institute Candidate)',
    time: '31 May 2026',
  },
  {
    category: 'exam',
    status: 'new',
    stripe: 'var(--indigo)',
    text: 'May 2026 STC — Computer Applications Associate (CAA) application window',
    time: '05 Apr 2026 → last date: 18 Apr 2026',
  },
  {
    category: 'exam',
    status: 'new',
    stripe: 'var(--indigo)',
    text: 'May 2026 STC — Certified Data Entry & Office Assistant (Upskilling)',
    time: '05 Apr 2026 → last date: 20 Apr 2026',
  },
  {
    category: 'admit',
    status: 'new',
    stripe: 'var(--teal)',
    text: 'July 2026 IT, C-Level admit card available for download',
    time: 'from 03 Jul 2026',
  },
  {
    category: 'admit',
    status: 'new',
    stripe: 'var(--teal)',
    text: 'July 2026 HW, CHM-T (Computer Hardware Maintenance-Technician) O-Level admit card available',
    time: 'from 03 Jul 2026',
  },
  {
    category: 'result',
    status: 'new',
    stripe: 'var(--green)',
    text: 'January 2026 IT results declared — O, A, B and C Level',
    time: 'viewable/printable from 21 Apr 2026',
  },
  {
    category: 'result',
    status: 'new',
    stripe: 'var(--green)',
    text: 'May 2026 ITL — Course on Computer Concepts result declared for select roll-no. series',
    time: 'from 19 Jun 2026 · DL, DN, KK, GO, LU, HD, AZ, AJ and others',
  },
  {
    category: 'practical',
    status: 'old',
    text: 'August 2023 MM — MAT-O Level Practical Examination admit card',
    time: 'archived · was available from 26 Aug 2023',
  },
  {
    category: 'other',
    status: 'old',
    text: 'No other notification declared at this time',
    time: 'check back later for updates',
  },
];

const NOTIF_TABS = [
  { key: 'exam', label: 'Exam Notice' },
  { key: 'admit', label: 'Admit Card Notice' },
  { key: 'practical', label: 'Practical Admit Card Notice' },
  { key: 'result', label: 'Result Notice' },
  { key: 'other', label: 'Other Notices' },
];

function randomCaptcha(len = 6) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function MainPage() {
  const [lang, setLang] = useState('en');
  const [sizeStep, setSizeStep] = useState(0);
  const [theme, setTheme] = useState(initialTheme);
  const [loginOpen, setLoginOpen] = useState(false);
  const [notifCategory, setNotifCategory] = useState('exam');
  const [processTab, setProcessTab] = useState('reg');
  const [captcha, setCaptcha] = useState('bk5CV5');

  const t = DICT[lang];
  const rootStyle = { fontSize: `${16 + sizeStep * 1.5}px` };

  function adjustSize(delta) {
    setSizeStep((prev) => (delta === 0 ? 0 : Math.max(-1, Math.min(2, prev + delta))));
  }

  function changeTheme(next) {
    setTheme(next);
    window.localStorage.setItem('sp-theme', next);
  }

  const visibleNotifs = NOTIFICATIONS.filter((n) => n.category === notifCategory);
  const newCount = NOTIFICATIONS.filter(
    (n) => n.category === notifCategory && n.status === 'new'
  ).length;
  const newCountLabel = newCount > 0 ? `${newCount} New` : 'Up to date';

  return (
    <div className="sp-root" data-theme={theme} style={rootStyle}>
      <Header
        lang={lang}
        setLang={setLang}
        adjustSize={adjustSize}
        theme={theme}
        changeTheme={changeTheme}
        t={t}
        onLoginClick={() => setLoginOpen(true)}
      />

      {/* ============ HERO ============ */}
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <span className="badge-pill"><span className="dot"></span> Digital India — Empowering Citizens</span>
            <h2>{t.heroTitle}<span className="accent">{t.heroTitleAccent}</span></h2>
            <p className="lead">{t.heroLead}</p>

            <div className="search-row">
              <input type="text" placeholder="Search courses, notices, application forms…" />
              <button type="button">Quick Search</button>
            </div>
            <div className="chip-row">
              <span className="chip">CCC</span><span className="chip">BCC</span><span className="chip">ECC</span>
              <span className="chip">O Level</span><span className="chip">A Level</span><span className="chip">B Level</span><span className="chip">C Level</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="photo-card">
              <svg viewBox="0 0 400 275" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#2B66A6"></stop><stop offset="1" stopColor="#283775"></stop>
                  </linearGradient>
                </defs>
                <rect width="400" height="275" fill="url(#pg)"></rect>
                <circle cx="330" cy="55" r="70" fill="rgba(255,255,255,0.08)"></circle>
                <circle cx="60" cy="230" r="90" fill="rgba(255,255,255,0.06)"></circle>
                <g transform="translate(120,60)">
                  <circle cx="60" cy="35" r="30" fill="#FFD9B8"></circle>
                  <rect x="20" y="70" width="80" height="90" rx="18" fill="#8EC546"></rect>
                  <rect x="150" y="90" width="60" height="70" rx="14" fill="#283775" opacity="0.5"></rect>
                  <circle cx="180" cy="70" r="22" fill="#FFD9B8" opacity="0.9"></circle>
                </g>
              </svg>
            </div>
            <div className="quick-actions">
              <h4>Quick Actions</h4>
              <div className="qa-grid">
                <a className="qa-tile" href="#process">
                  <div className="ic" style={{ background: 'var(--blue)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="9" cy="8" r="3.2"></circle><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path><path d="M18 8v5m-2.5-2.5h5"></path></svg></div>
                  <span>New Registration</span>
                </a>
                <a className="qa-tile" href="#process">
                  <div className="ic" style={{ background: 'var(--green)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="4" y="3" width="16" height="18" rx="1.5"></rect><path d="M8 8h8M8 12h8M8 16h5"></path></svg></div>
                  <span>Exam Form</span>
                </a>
                <a className="qa-tile" href="#services">
                  <div className="ic" style={{ background: 'var(--orange)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 10h18"></path></svg></div>
                  <span>Admit Card</span>
                </a>
                <a className="qa-tile" href="#stats">
                  <div className="ic" style={{ background: 'var(--teal)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M4 19V9m6 10V4m6 15v-7"></path></svg></div>
                  <span>Check Result</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* {/* ============ NOTIFICATIONS ============ */}
      <NotificationBoard />
      {/* <section className="split-section"> 
        <div className="container">
          <div className="notif-card">
            <div className="notif-head">
              <div className="bell"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.7 21a2 2 0 0 1-3.4 0"></path></svg></div>
              <h3 style={{ flex: 1 }}>Important Notifications</h3>
              <span className="new-count">{newCountLabel}</span>
            </div>
            <div className="notif-tabs">
              {NOTIF_TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={notifCategory === tab.key ? 'active' : ''}
                  onClick={() => setNotifCategory(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="notif-list">
              {visibleNotifs.map((n, i) => (
                <div key={i} className={`notif-item${n.status === 'old' ? ' old' : ''}`}>
                  <div className="stripe" style={n.stripe ? { background: n.stripe } : undefined}></div>
                  <div className="body">
                    <p>
                      {n.text}
                      {n.status === 'new' && <span className="tag-new">New</span>}
                    </p>
                    <time>{n.time}</time>
                  </div>
                </div>
              ))}
            </div>
            <a className="view-all" href="#directory" style={{ alignSelf: 'flex-end' }}>View All Notifications →</a>
          </div>
        </div>
      </section> */}

      {/* ============ QUICK LINKS ============ */}
      <section className="quicklinks-section">
        <div className="container">
          <div className="sec-header" style={{ marginBottom: 18 }}>
            <span className="eyebrow">Frequently Used</span>
            <h2 style={{ fontSize: 22 }}>Quick Links</h2>
          </div>
          <div className="quicklinks-grid">
            <a className="ql-tile" href="#directory"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 4 6v6c0 5 3.6 8.7 8 9 4.4-.3 8-4 8-9V6z"></path></svg></div><span>Regional Centres</span></a>
            <a className="ql-tile" href="#directory"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg></div><span>Search Institutes</span></a>
            <a className="ql-tile" href="#directory"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="1.5"></rect><circle cx="11" cy="12" r="3"></circle><path d="m19 20-2.2-2.2"></path></svg></div><span>Search Application Number</span></a>
            <a className="ql-tile" href="#courses"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5V4.5A1.5 1.5 0 0 1 5.5 3H18l2 2v14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5Z"></path><path d="M8 8h8M8 12h8M8 16h4"></path></svg></div><span>Certification / Courses</span></a>
            <a className="ql-tile" href="#courses"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3v18M4 8h5m-5 8h5"></path><rect x="9" y="3" width="11" height="18" rx="1.5"></rect></svg></div><span>List of Active NSQF Courses</span></a>
            <a className="ql-tile" href="#process"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="16" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18"></path></svg></div><span>Apply Online</span></a>
            <a className="ql-tile" href="#services"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="14" rx="2"></rect><path d="M3 9h18M8 14h3"></path></svg></div><span>Digital Platform</span></a>
            <a className="ql-tile" href="#services"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 10h18"></path></svg></div><span>Download Admit Card</span></a>
            <a className="ql-tile" href="#stats"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19V9m6 10V4m6 15v-7"></path></svg></div><span>View Result</span></a>
            <a className="ql-tile" href="#services"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 15V3m0 12-4-4m4 4 4-4"></path><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"></path></svg></div><span>Download Certificate</span></a>
            <a className="ql-tile" href="#faq"><div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.2a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2-2.4 3.5"></path><path d="M12 17.2v.1"></path></svg></div><span>FAQ</span></a>
          </div>
        </div>
      </section>

      {/* ============ STUDENT SERVICES ============ */}
      <section className="services" id="services">
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">What We Offer</span>
            <h2>Student Services</h2>
            <p>Every service you need — from registration to your final certificate — available online 24×7.</p>
          </div>

          <div className="services-grid">
            <div className="svc-card"><div className="ic" style={{ background: 'var(--blue-100)', color: 'var(--blue)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3 4 6v6c0 5 3.6 8.7 8 9 4.4-.3 8-4 8-9V6z"></path></svg></div><h4>Verification</h4><p>Verify NIELIT certificates online.</p></div>
            <div className="svc-card"><div className="ic" style={{ background: 'var(--green-100)', color: 'var(--green)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="16" height="18" rx="1.5"></rect><path d="M8 8h8M8 12h8M8 16h5"></path></svg></div><h4>Examination Form</h4><p>Fill and submit your exam application.</p></div>
            <div className="svc-card"><div className="ic" style={{ background: 'var(--orange-100)', color: 'var(--orange-dark)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 10h18M7 15h4"></path></svg></div><h4>Admit Card</h4><p>Download your hall ticket for exams.</p></div>
            <div className="svc-card"><div className="ic" style={{ background: 'var(--purple-100)', color: 'var(--violet)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 8 12 4l9 4-9 4-9-4Z"></path><path d="M7 10v5c0 1.5 2.2 3 5 3s5-1.5 5-3v-5"></path></svg></div><h4>Scholarship</h4><p>Apply for financial aid programmes.</p></div>
            <div className="svc-card"><div className="ic" style={{ background: 'var(--teal-100)', color: 'var(--teal)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21V9l8-6 8 6v12"></path><path d="M9 21v-6h6v6"></path></svg></div><h4>Affiliations &amp; Courses</h4><p>Find accredited study centres near you.</p></div>
            <div className="svc-card"><div className="ic" style={{ background: 'var(--blue-100)', color: 'var(--indigo)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="8" r="3"></circle><circle cx="17" cy="16" r="3"></circle><path d="m10.5 9.5 4 5"></path></svg></div><h4>Linkage</h4><p>Industry &amp; placement programmes.</p></div>
            <div className="svc-card"><div className="ic" style={{ background: '#F5D5DB', color: 'var(--rose)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3ZM3 19a2 2 0 0 0 2 2h1v-6H3Z"></path></svg></div><h4>Support / Helpdesk</h4><p>24×7 query resolution for students.</p></div>
            <div className="svc-card"><div className="ic" style={{ background: 'var(--amber-100)', color: 'var(--amber)' }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4.2"></circle><path d="m8.5 11.8-1.2 6.7L12 16l4.7 2.5-1.2-6.7"></path></svg></div><h4>Certificate</h4><p>Download your NIELIT certificate.</p></div>
          </div>
        </div>
      </section>

      {/* ============ COURSES ============ */}
      <section className="courses" id="courses">
        <div className="container">
          <div className="sec-header with-cta">
            <div>
              <span className="eyebrow">What You Can Study</span>
              <h2>Courses Offered</h2>
            </div>
            <a href="#directory" style={{ fontWeight: 700, color: 'var(--indigo)', fontSize: '13.8px' }}>View All Courses →</a>
          </div>

          <span className="pill-label">IT Literacy Programmes</span>
          <div className="course-grid">
            <div className="course-card"><h5>CCC</h5><p>Course on Computer Concepts</p></div>
            <div className="course-card"><h5>BCC</h5><p>Basic Computer Course</p></div>
            <div className="course-card"><h5>ECC</h5><p>E-Commerce Course</p></div>
            <div className="course-card"><h5>ACC</h5><p>Advanced Certificate Course</p></div>
            <div className="course-card"><h5>CCCP</h5><p>CCC for Professionals</p></div>
          </div>

          <span className="pill-label alt">Certificate &amp; Diploma Courses</span>
          <div className="course-grid small">
            <div className="course-card diploma"><h5>O Level</h5><p>Foundation Level IT Course</p></div>
            <div className="course-card diploma"><h5>A Level</h5><p>Advanced Diploma in IT</p></div>
            <div className="course-card diploma"><h5>B Level</h5><p>MCA-equivalent</p></div>
            <div className="course-card diploma"><h5>C Level</h5><p>M.Tech-equivalent, advanced specialisation</p></div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="process-sec" id="process">
        <div className="container">
          <div className="sec-header" style={{ maxWidth: '100%' }}>
            <span className="eyebrow">Step by Step</span>
            <h2>Registration &amp; Examination Process</h2>
            <p>Everything from your first application to your final certificate, broken into simple steps.</p>
          </div>

          <div className="tab-switch">
            <button
              type="button"
              className={processTab === 'reg' ? 'active' : ''}
              onClick={() => setProcessTab('reg')}
            >
              Registration Process
            </button>
            <button
              type="button"
              className={processTab === 'exam' ? 'active' : ''}
              onClick={() => setProcessTab('exam')}
            >
              Examination Process
            </button>
          </div>

          <div className={`tab-panel${processTab === 'reg' ? ' active' : ''}`}>
            <div className="steps-track">
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--blue)' }}>1</div>
                <h5>Registration</h5>
                <ul><li>Click on 'Apply Online'</li><li>Select the certificate course — O/A/B/C</li><li>Read the guidelines &amp; instructions carefully (ORAF)</li></ul>
              </div>
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--indigo)' }}>2</div>
                <h5>Fill Registration Form</h5>
                <ul><li>Fill the registration application form</li><li>Upload photograph, signature &amp; thumb impression</li><li>Submit the registration form</li></ul>
              </div>
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--violet)' }}>3</div>
                <h5>Application Number</h5>
                <ul><li>Note down your unique application number</li><li>Print the application form for future use</li></ul>
              </div>
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--orange)' }}>4</div>
                <h5>Pay Registration Fee</h5>
                <ul><li>Online — CSC-SPV, NEFT/RTGS</li><li>Or through a CSC near your location</li></ul>
              </div>
            </div>
          </div>

          <div className={`tab-panel${processTab === 'exam' ? ' active' : ''}`}>
            <div className="steps-track">
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--teal)' }}>1</div>
                <h5>Create Your User</h5>
                <ul><li>Click on 'New User?' (Registered Candidates)</li><li>Provide details as per O/A/B/C level registration</li></ul>
              </div>
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--green)' }}>2</div>
                <h5>Lock Your Profile</h5>
                <ul><li>Fill in any missing details</li><li>Upload photograph, signature &amp; thumb impression</li><li>Lock your profile</li></ul>
              </div>
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--amber)' }}>3</div>
                <h5>Fill Exam Form</h5>
                <ul><li>Fill the exam form</li><li>Review the exam form</li><li>Submit the exam form</li></ul>
              </div>
              <div className="step-card">
                <div className="step-num" style={{ background: 'var(--rose)' }}>4</div>
                <h5>Pay Exam Fees</h5>
                <ul><li>Through CSCs near your location</li><li>Online payment also available</li></ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS + HELP/FAQ ============ */}
      <section className="stats-sec" id="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item"><div className="ic" style={{ background: 'var(--orange-100)' }}><svg viewBox="0 0 24 24" fill="none" stroke="var(--orange-dark)" strokeWidth="2"><circle cx="9" cy="8" r="3.2"></circle><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path><circle cx="17" cy="8" r="2.6"></circle><path d="M17 13.2c2.4.4 4 2 4 4.3"></path></svg></div><div className="num">20L+</div><div className="lbl">Registered Students</div></div>
            <div className="stat-item"><div className="ic" style={{ background: 'var(--blue-100)' }}><svg viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"></path><circle cx="12" cy="9.5" r="2.4"></circle></svg></div><div className="num">5000+</div><div className="lbl">Exam Centres</div></div>
            <div className="stat-item"><div className="ic" style={{ background: 'var(--purple-100)' }}><svg viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2"><path d="M4 19.5V4.5A1.5 1.5 0 0 1 5.5 3H18l2 2v14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5Z"></path><path d="M8 8h8M8 12h8M8 16h4"></path></svg></div><div className="num">100+</div><div className="lbl">Courses Offered</div></div>
            <div className="stat-item"><div className="ic" style={{ background: 'var(--green-100)' }}><svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2"><path d="M12 17.3 6.2 21l1.5-6.6L2.5 9.9l6.7-.6L12 3l2.8 6.3 6.7.6-5.2 4.5L18 21Z"></path></svg></div><div className="num">95%</div><div className="lbl">Satisfaction Rate</div></div>
          </div>

          <div className="help-grid" id="faq">
            <div className="help-card blue">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3ZM3 19a2 2 0 0 0 2 2h1v-6H3Z"></path></svg></div>
              <div>
                <h4>Student Helpdesk</h4>
                <p>Need help? Our support team is available to resolve your queries about registration, exams, results and certificates.</p>
                <div className="contact-line"><a href="tel:01144446771">📞 011-44446771</a><a href="mailto:contact@nielit.gov.in">✉️ contact@nielit.gov.in</a></div>
              </div>
            </div>
            <div className="help-card orange">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M9.5 9.3a2.5 2.5 0 1 1 3.6 2.3c-.8.5-1.1 1-1.1 2"></path><circle cx="12" cy="16.8" r=".4" fill="currentColor" stroke="none"></circle></svg></div>
              <div>
                <h4>Frequently Asked Questions</h4>
                <p>Find answers to common questions about NIELIT courses, registration, examination schedules and certificates.</p>
                <a className="link-cta" href="#directory">Browse FAQs →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT DIRECTORY ============ */}
      <section className="directory" id="directory">
        <div className="container">
          <div className="sec-header">
            <span className="eyebrow">Need Specific Help?</span>
            <h2>Contact Directory</h2>
            <p>Reach the right desk directly for faster resolution.</p>
          </div>
          <div className="dir-grid">
            <div className="dir-card"><h5>O/A/B/C Registration</h5><a href="mailto:regn@nielit.gov.in">regn[at]nielit[dot]gov[dot]in</a><span className="phone">011-25308321</span></div>
            <div className="dir-card"><h5>O/A/B/C Theory Exams</h5><a href="mailto:exam@nielit.gov.in">exam[at]nielit[dot]gov[dot]in</a><span className="phone">011-25308394</span></div>
            <div className="dir-card"><h5>O/A/B/C Practical Exams</h5><a href="mailto:prexam@nielit.gov.in">prexam[at]nielit[dot]gov[dot]in</a><span className="phone">011-25308393</span></div>
            <div className="dir-card"><h5>O/A/B/C Projects</h5><a href="mailto:projects@nielit.gov.in">projects[at]nielit[dot]gov[dot]in</a><span className="phone">011-25308393</span></div>
            <div className="dir-card"><h5>Certificates (provisional, verification, transcripts)</h5><a href="mailto:certificate@nielit.gov.in">certificate[at]nielit[dot]gov[dot]in</a><span className="phone">011-25308392</span></div>
            <div className="dir-card"><h5>Digital Literacy Exams (ACC/BCC/CCC/CCCP/ECC)</h5><a href="mailto:ccc@nielit.gov.in">ccc[at]nielit[dot]gov[dot]in</a></div>
            <div className="dir-card"><h5>O/A/B/C Accreditation</h5><a href="mailto:accr@nielit.gov.in">accr[at]nielit[dot]gov[dot]in</a><span className="phone">011-25308351</span></div>
            <div className="dir-card"><h5>Digital Literacy Facilitation</h5><a href="mailto:ccc.accr@nielit.gov.in">ccc.accr[at]nielit[dot]gov[dot]in</a><span className="phone">011-25308350</span></div>
            <div className="dir-card"><h5>NSQF Exams</h5><a href="mailto:nsqf.exam@nielit.gov.in">nsqf.exam[at]nielit[dot]gov[dot]in</a><span className="phone">011-44446771</span></div>
          </div>
        </div>
      </section>

      {/* ============ APP PROMO ============ */}
      <section className="app-promo">
        <div className="container">
          <div className="app-card">
            <div>
              <span className="badge-pill">Mobile App — Coming Soon</span>
              <h3>NIELIT on the Go</h3>
              <p>A dedicated app is in the works — register, fill exam forms, download admit cards, check results and get certificates from your phone, anytime, anywhere.</p>
              <div className="store-row">
                <div className="store-btn"><svg viewBox="0 0 24 24" fill="#fff"><path d="M3 3v18l14-9L3 3Z"></path></svg><div><span style={{ fontSize: '10px' }}>Coming soon on</span><strong>Google Play</strong></div></div>
                <div className="store-btn"><svg viewBox="0 0 24 24" fill="#fff"><path d="M16 2c0 1.7-1.3 3-3 3-.1-1.7 1.3-3.2 3-3Zm4.6 15.3c-.5 1.1-.7 1.6-1.4 2.6-.9 1.3-2.2 3-3.8 3-1.4 0-1.7-.9-3.6-.9s-2.3.9-3.6.9c-1.6 0-2.8-1.5-3.7-2.8C2 16.7 1.7 12.8 3.6 10.2c1-1.5 2.6-2.4 4.1-2.4 1.5 0 2.4.9 3.6.9 1.2 0 1.9-.9 3.6-.9 1.4 0 2.8.7 3.7 2-3.2 1.8-2.7 6.4 1 7.5Z"></path></svg><div><span style={{ fontSize: '10px' }}>Coming soon on</span><strong>App Store</strong></div></div>
              </div>
              <p className="app-note">Meanwhile, every service above already works on mobile browsers.</p>
            </div>
            <div className="phone-mock">
              <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="footer-brand"><div className="sq">N</div><div><strong>NIELIT</strong><span>Student Portal</span></div></div>
              <p className="desc">National Institute of Electronics &amp; Information Technology (NIELIT) — an autonomous Scientific Society under MeitY, Government of India, empowering citizens through digital education.</p>
              <div className="footer-socials">
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13 22v-9h3l.5-3.5H13V7.5c0-1 .3-1.7 1.7-1.7H17V2.6C16.6 2.5 15.4 2.4 14 2.4c-3 0-5 1.8-5 5.1V9.5H6V13h3v9h4z"></path></svg></a>
                <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.4 11.4 0 0 1 3.6 4.6a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.7-.5v.1c0 2 1.4 3.6 3.2 4a4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.4a11.3 11.3 0 0 0 6.1 1.8c7.4 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.4-1.3 1.9-2.1z"></path></svg></a>
                <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z"></path></svg></a>
                <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M22 12s0-3.2-.4-4.7a2.9 2.9 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.3a2.9 2.9 0 0 0-2 2C2 8.8 2 12 2 12s0 3.2.4 4.7c.3 1 1 1.7 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.3a2.9 2.9 0 0 0 2-2c.4-1.5.4-4.7.4-4.7ZM10 15.3V8.7l6 3.3Z"></path></svg></a>
              </div>
              <div className="footer-contact-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.4 2.1L8 10.2a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2-.4c1 .3 2 .5 3 .7a2 2 0 0 1 1.6 2Z"></path></svg> Board: 011-44446777 &nbsp;|&nbsp; Helpdesk: 011-44446771</div>
              <div className="footer-contact-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path fill="none" d="M4 4h16v16H4z" opacity="0"></path><path d="m3 6 9 7 9-7"></path><rect x="3" y="5" width="18" height="14" rx="2"></rect></svg> contact[at]nielit[dot]gov[dot]in</div>
            </div>

            <div>
              <h5>Useful Links</h5>
              <ul>
                <li><a href="#process">→ New Registration</a></li>
                <li><a href="#process">→ Examination Form</a></li>
                <li><a href="#services">→ Admit Card</a></li>
                <li><a href="#stats">→ Check Result</a></li>
                <li><a href="#services">→ Download Certificate</a></li>
                <li><a href="#services">→ Verify Certificate</a></li>
                <li><a href="#directory">→ Find Study Centre</a></li>
              </ul>
            </div>

            <div>
              <h5>Important Links</h5>
              <ul>
                <li><a href="https://www.nielit.gov.in/" target="_blank" rel="noopener">→ About NIELIT</a></li>
                <li><a href="#courses">→ Courses Offered</a></li>
                <li><a href="#directory">→ Study Centres</a></li>
                <li><a href="#services">→ Affiliations</a></li>
                <li><a href="#services">→ Scholarship</a></li>
                <li><a href="#services">→ Linkage Programme</a></li>
                <li><a href="https://www.nielit.gov.in/" target="_blank" rel="noopener">→ NIELIT Website</a></li>
              </ul>
            </div>

            <div>
              <h5>Policies</h5>
              <ul>
                <li><a href="#">→ Privacy Policy</a></li>
                <li><a href="#">→ Terms of Use</a></li>
                <li><a href="#">→ Accessibility Statement</a></li>
                <li><a href="#">→ Disclaimer</a></li>
                <li><a href="#">→ Sitemap</a></li>
                <li><a href="#">→ RTI</a></li>
              </ul>
              <div style={{ marginTop: 16, fontSize: '12.3px', color: '#8A9AB8', display: 'flex', gap: 8 }}>
                <svg viewBox="0 0 24 24" width="15" height="15" style={{ flex: 'none', marginTop: 2 }} fill="none" stroke="var(--orange)" strokeWidth="2"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"></path><circle cx="12" cy="9.5" r="2.4"></circle></svg>
                <span>NIELIT Bhawan, Plot No. 3, PSP Pocket, Sector-8, Dwarka, New Delhi – 110077</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 NIELIT. All rights reserved. Government of India.</span>
            <span>Last Updated: Jul 2026 | Total Visitors: {(164758432).toLocaleString('en-IN')}</span>
          </div>
        </div>
      </footer>

      {/* ============ LOGIN MODAL ============ */}
      <div className={`modal-overlay${loginOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setLoginOpen(false); }}>
        <div className="login-modal">
          <button className="close-x" aria-label="Close" onClick={() => setLoginOpen(false)}>✕</button>
          <h3>Candidate Login</h3>
          <div className="live-users"><span className="pulse"></span> 139 users currently logged in</div>

          <div className="field">
            <label htmlFor="userType">User type</label>
            <select id="userType" defaultValue="">
              <option value="" disabled>Select user type</option>
              <option>Registered Candidate</option>
              <option>Accredited Institute</option>
              <option>Employee</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="userId">User ID</label>
            <input id="userId" type="text" placeholder="Enter your user ID" />
          </div>
          <div className="field">
            <label htmlFor="pwd">Password</label>
            <input id="pwd" type="password" placeholder="Enter your password" />
          </div>
          <div className="field">
            <label htmlFor="captchaInput">Captcha</label>
            <div className="captcha-row">
              <span className="captcha-box">{captcha}</span>
              <button
                className="refresh-btn"
                type="button"
                aria-label="Refresh captcha"
                onClick={() => setCaptcha(randomCaptcha())}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 1 3 6.7M3 12v5h5"></path></svg>
              </button>
            </div>
            <input id="captchaInput" type="text" placeholder="Type the code above" style={{ marginTop: 8 }} />
          </div>
          <button className="login-submit" type="button">Log In</button>
          <div className="login-links"><a href="#">Forgot password?</a><a href="#">New user? Register</a></div>
        </div>
      </div>
    </div>
  );
}
