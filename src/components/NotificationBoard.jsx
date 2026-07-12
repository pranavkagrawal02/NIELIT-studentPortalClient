import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../config/apiClient.js';

const VISIBLE_LIMIT = 8;

// Map API badgeColor -> CSS stripe classes you have defined
const STRIPE_MAP = {
  green: 'green',
  orange: 'orange',
  pink: 'pink',
  blue: 'blue',
  teal: 'teal',
  gray: 'gray',
  primary: 'blue', // API sends "primary" but CSS has no .stripe.primary
};

function stripeClass(badgeColor) {
  return STRIPE_MAP[badgeColor] || 'gray';
}

// DB has duplicate rows (same notice inserted twice with different ids) —
// keep the first occurrence of each title + date combination.
function dedupe(items) {
  const seen = new Set();
  return items.filter((n) => {
    const key = `${n.title}__${n.notificationDate}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function NotificationBoard() {
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;
    api
      .getNotificationItems()
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          setNotifications(dedupe(data.filter((n) => n.isActive)));
        }
      })
      .catch((err) => console.warn('Failed to load notifications:', err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  // Tabs built dynamically from whatever categories exist in the data
  const categories = useMemo(() => {
    const unique = [...new Set(notifications.map((n) => n.category))];
    return ['All', ...unique];
  }, [notifications]);

  const filtered = useMemo(() => {
    const list =
      activeTab === 'All'
        ? notifications
        : notifications.filter((n) => n.category === activeTab);
    // API already sorts (date DESC NULLS LAST, displayOrder ASC) but keep it
    // stable on the client too, in case of client-side re-filtering.
    return [...list].sort((a, b) => {
      const da = a.notificationDate ? new Date(a.notificationDate).getTime() : -Infinity;
      const db = b.notificationDate ? new Date(b.notificationDate).getTime() : -Infinity;
      if (db !== da) return db - da;
      return a.displayOrder - b.displayOrder;
    });
  }, [notifications, activeTab]);

  const visible = showAll ? filtered : filtered.slice(0, VISIBLE_LIMIT);
  const newCount = notifications.filter((n) => n.isNew).length;

  return (
    <section className="split-section">
      <div className="container">
        <div className="notif-card">
          <div className="notif-head">
            <div className="bell">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.7 21a2 2 0 0 1-3.4 0" />
              </svg>
            </div>
            <h3>Notifications &amp; Announcements</h3>
            {newCount > 0 && <span className="new-count">{newCount} New</span>}
          </div>

          <div className="notif-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={activeTab === cat ? 'active' : ''}
                onClick={() => {
                  setActiveTab(cat);
                  setShowAll(false);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="notif-list">
            {visible.length === 0 && (
              <div className="notif-item old">
                <span className="stripe gray"></span>
                <div className="body">
                  <p>No notifications available in this category.</p>
                </div>
              </div>
            )}

            {visible.map((n) => (
              <div key={n.notificationId} className={`notif-item${n.isNew ? '' : ' old'}`}>
                <span className={`stripe ${stripeClass(n.badgeColor)}`}></span>
                <div className="body">
                  <p>
                    {n.pageId ? (
                      <Link to={`/page/${n.pageId}`}>{n.title}</Link>
                    ) : (
                      n.title
                    )}
                    {n.isNew && <span className="tag-new">NEW</span>}
                  </p>
                  <time dateTime={n.notificationDate || undefined}>
                    {[formatDate(n.notificationDate), n.description]
                      .filter(Boolean)
                      .join(' — ')}
                  </time>
                </div>
              </div>
            ))}
          </div>

          {filtered.length > VISIBLE_LIMIT && (
            <a
              href="#"
              className="view-all"
              onClick={(e) => {
                e.preventDefault();
                setShowAll((s) => !s);
              }}
            >
              {showAll ? '← Show Less' : `View All (${filtered.length}) →`}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default NotificationBoard;