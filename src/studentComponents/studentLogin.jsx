import { useState } from 'react';
import { Link } from 'react-router-dom';
import { initialTheme } from '../utils/theme.js';
import '../styles/theme.css';
import './studentLogin.css';

function randomCaptcha(len = 6) {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export default function StudentLogin() {
  const [theme] = useState(initialTheme);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState('bk5CV5');
  const [captchaInput, setCaptchaInput] = useState('');
  const [remember, setRemember] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!userType) {
      setError('Please select a user type.');
      return;
    }
    if (captchaInput.trim() !== captcha) {
      setError('Captcha does not match. Please try again.');
      setCaptcha(randomCaptcha());
      setCaptchaInput('');
      return;
    }

    setSubmitting(true);
    // TODO: wire to the real student-auth endpoint once it exists.
    setTimeout(() => setSubmitting(false), 900);
  }

  return (
    <div className="sp-root student-login-page" data-theme={theme}>
      {/* ===== LEFT INFO PANEL ===== */}
      <div className="info-panel">
        <div className="brand-row">
          <div className="logo-badge">
            <img src="https://www.nielit.in/images/NIELIT_logo.jpg" alt="NIELIT logo" />
          </div>
          <div className="brand-text">
            <strong>NIELIT</strong>
            <span>Student Information &amp; Enrollment System</span>
          </div>
        </div>

        <div className="info-mid">
          <span className="badge-pill"><span className="dot"></span> Digital India — Empowering Citizens</span>
          <h1>
            Welcome back to
            <span className="accent">your student portal</span>
          </h1>
          <p>Log in to fill exam forms, download admit cards, check results and manage your certificates — all in one place.</p>

          <div className="feature-list">
            <div className="feature-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="4" y="3" width="16" height="18" rx="1.5"></rect><path d="M8 8h8M8 12h8M8 16h5"></path></svg></div>
              <span>Fill and track your examination forms</span>
            </div>
            <div className="feature-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="6" width="18" height="12" rx="2"></rect><path d="M3 10h18"></path></svg></div>
              <span>Download admit cards instantly</span>
            </div>
            <div className="feature-item">
              <div className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="8" r="4.2"></circle><path d="m8.5 11.8-1.2 6.7L12 16l4.7 2.5-1.2-6.7"></path></svg></div>
              <span>Access and verify your certificates</span>
            </div>
          </div>
        </div>

        <div className="live-users"><span className="pulse"></span> 139 users currently logged in</div>
      </div>

      {/* ===== RIGHT FORM PANEL ===== */}
      <div className="form-panel">
        <div className="form-wrap">
          <span className="eyebrow">Candidate Login</span>
          <h2>Sign in to your account</h2>
          <p className="sub">Enter your credentials to access the student portal.</p>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="userType">User type</label>
              <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
                <option value="">Select user type</option>
                <option>Registered Candidate</option>
                <option>Accredited Institute</option>
                <option>Employee</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="userId">User ID</label>
              <input
                id="userId"
                type="text"
                placeholder="Enter your user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="pwd">Password</label>
              <div className="pwd-wrap">
                <input
                  id="pwd"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="pwd-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
              </div>
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
              <input
                id="captchaInput"
                type="text"
                placeholder="Type the code above"
                style={{ marginTop: 10 }}
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
              />
            </div>

            <div className="form-options">
              <label className="remember">
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Keep me signed in
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button className="login-btn" type="submit" disabled={submitting}>
              {submitting ? 'Checking…' : 'Log In'}
              {!submitting && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14m-6-6 6 6-6 6"></path></svg>
              )}
            </button>
          </form>

          <div className="divider">New to the portal</div>

          <div className="new-user-box">
            <p>Don't have an account yet? Register as a candidate to get started.</p>
            <a className="register-link" href="#">
              Create new account
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14m-6-6 6 6-6 6"></path></svg>
            </a>
          </div>

          <Link className="back-home" to="/">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5m6-6-6 6 6 6"></path></svg>
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
