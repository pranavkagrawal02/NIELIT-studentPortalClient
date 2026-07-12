import { Link } from 'react-router-dom';

export function isExternalLink(link) {
  return /^([a-z][a-z0-9+.-]*:)?\/\//i.test(link || '') || /^mailto:|^tel:/i.test(link || '');
}

// Renders an external <a> for absolute/external URLs (mailto:, tel:, other domains)
// and an internal react-router <Link> for everything else (e.g. /page?PN=about-us).
export function NavLink({ to, className, children }) {
  if (isExternalLink(to)) {
    return (
      <a href={to} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={to || '#'} className={className}>
      {children}
    </Link>
  );
}
