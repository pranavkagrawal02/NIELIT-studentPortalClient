import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/apiClient.js';
import { NavLink } from '../utils/NavLink.jsx';

function pathFor(item) {
  return item.link || '#';
}

const THEMES = [
  {
    key: 'light',
    label: 'Light',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="4.2"></circle><path d="M12 2.5v3M12 18.5v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2.5 12h3M18.5 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"></path></svg>
    ),
  },
  {
    key: 'dark',
    label: 'Dark',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"></path></svg>
    ),
  },
  {
    key: 'contrast',
    label: 'High Contrast',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="9"></circle><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none"></path></svg>
    ),
  },
];

// Used only if the cms-service / api-gateway aren't reachable yet, so the
// nav still renders something sensible during local frontend dev.
// const FALLBACK_MENU = [
  // { menuId: 1, menuName: 'Home', pageId: 1, children: [] },
  // {
  //   menuId: 2,
  //   menuName: 'About Us',
  //   pageId: 2,
  //   children: [
  //     { menuId: 11, menuName: 'Vision', pageId: 11, children: [] },
  //     { menuId: 12, menuName: 'Mission', pageId: 12, children: [] },
  //     { menuId: 13, menuName: 'Director', pageId: 13, children: [] },
  //   ],
  // },
  // {
  //   menuId: 3,
  //   menuName: 'Courses',
  //   pageId: 3,
  //   children: [
  //     { menuId: 21, menuName: 'O Level', pageId: 21, children: [] },
  //     { menuId: 22, menuName: 'A Level', pageId: 22, children: [] },
  //     { menuId: 23, menuName: 'B Level', pageId: 23, children: [] },
  //   ],
  // },
  // {
  //   menuId: 4,
  //   menuName: 'Examinations',
  //   pageId: 4,
  //   children: [
  //     { menuId: 31, menuName: 'Notifications', pageId: 31, children: [] },
  //     { menuId: 32, menuName: 'Results', pageId: 32, children: [] },
  //   ],
  // },
  // { menuId: 5, menuName: 'Downloads', pageId: 5, children: [] },
  // { menuId: 6, menuName: 'Contact Us', pageId: 6, children: [] },
// ];

export default function Header({ lang, setLang, adjustSize, theme, changeTheme, t }) {
  const [headerItem, setHeaderItem] = useState([]);

  useEffect(() => {
    let cancelled = false;
    api
      .getHeaderItems()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setHeaderItem(data);
      })
      .catch((err) => console.warn('Falling back to static menu:', err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* ============ UTILITY BAR ============ */}
      <div className="utility-bar">
        <div className="container">
          <span>Ministry of Electronics &amp; Information Technology, Government of India</span>
          <div className="right-tools">
            <div className="lang-toggle">
              <button
                type="button"
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
              >
                English
              </button>
              <button
                type="button"
                className={lang === 'hi' ? 'active' : ''}
                onClick={() => setLang('hi')}
              >
                हिंदी
              </button>
            </div>
            <div className="font-adjust" aria-label="Adjust text size">
              <button type="button" onClick={() => adjustSize(-1)}>A-</button>
              <button type="button" onClick={() => adjustSize(0)}>A</button>
              <button type="button" onClick={() => adjustSize(1)}>A+</button>
            </div>
            <div className="theme-toggle" aria-label="Change theme">
              {THEMES.map((th) => (
                <button
                  key={th.key}
                  type="button"
                  title={th.label}
                  aria-label={th.label}
                  className={theme === th.key ? 'active' : ''}
                  onClick={() => changeTheme(th.key)}
                >
                  {th.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ HEADER ============ */}
      <header className="site-header">
        <div className="container identity-row">
          <div className="identity-left">
            <img className="nielit-logo" src="https://www.nielit.in/images/NIELIT_logo.jpg" alt="NIELIT logo" />
            <div className="gov-text-left">
              <div className="hi-line1">राष्ट्रीय इलेक्ट्रॉनिकी एवं सूचना प्रौद्योगिकी संस्थान</div>
              <div className="en-line1">National Institute of Electronics &amp; Information Technology</div>
            </div>
          </div>

          <div className="identity-right">
            <div className="gov-text-right">
              <div className="hi-line2">इलेक्ट्रॉनिकी एवं सूचना प्रौद्योगिकी मंत्रालय, भारत सरकार</div>
              <div className="en-line2">Ministry of Electronics &amp; Information Technology, Government of India</div>
            </div>
            <img
              className="emblem"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjFxtxssl_v6vejCp6TB2aO8YTvvLRYyltNNGIB7Aw8A&s=10"
              alt="Emblem of India"
            />
          </div>
        </div>

        <div className="nav-bar">
          <div className="container nav-inner">
            <nav className="main-nav">
              {headerItem.map((item) => (
                <div className={`nav-item${item.children?.length ? ' has-children' : ''}`} key={item.menuId}>
                  <NavLink to={pathFor(item)} className={item.pageId === 1 ? 'active' : ''}>
                    {item.menuName}
                    {item.children?.length > 0 && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"></path></svg>
                    )}
                  </NavLink>
                  {item.children?.length > 0 && (
                    <div className="dropdown">
                      {item.children.map((child) => (
                        <NavLink key={child.menuId} to={pathFor(child)}>{child.menuName}</NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="header-actions">
              <Link className="btn btn-ghost" to="/studentLogin">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6v-.5A2.5 2.5 0 0 1 11.5 3H17a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5A2.5 2.5 0 0 1 9 18.5V18"></path><path d="M13 12H3m0 0 3.5-3.5M3 12l3.5 3.5"></path></svg>
                <span className='text-white'>{t.btnLogin}</span>
              </Link>
              <a className="btn btn-solid" href="#process">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="9" cy="8" r="3.2"></circle><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"></path><path d="M18 8v5m-2.5-2.5h5"></path></svg>
                <span>{t.btnReg}</span>
              </a>
            </div>
            <button className="mobile-nav-toggle" aria-label="Menu" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" width="18" height="18"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
