import { Link } from 'react-router-dom';
import '../styles/theme.css';

export default function PlaceholderPage({ title }) {
  return (
    <div className="sp-root" data-theme="light" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <h1>{title}</h1>
      <p>This page is coming soon.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}
