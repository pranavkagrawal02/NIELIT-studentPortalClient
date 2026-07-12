import React from 'react'
import { useEffect, useState } from "react"
import { api } from '../config/apiClient.js';
import { NavLink } from '../utils/NavLink.jsx';

function groupFooterSections(items) {
  const active = items.filter((item) => item.isActive);

  // Parent sections = pageId === null, sorted by their own menuOrder
  const parents = active
    .filter((item) => item.pageId === null)
    .sort((a, b) => a.menuOrder - b.menuOrder)
    .map((parent) => ({ ...parent, links: [] }));

  if (!parents.length) return [];

  // If the API ever returns a nested structure, prefer it
  const hasNestedChildren = parents.some((p) => Array.isArray(p.children) && p.children.length);
  if (hasNestedChildren) {
    parents.forEach((p) => {
      p.links = [...p.children]
        .filter((c) => c.isActive)
        .sort((a, b) => a.menuOrder - b.menuOrder);
    });
    return parents;
  }

  // Flat list: children arrive in blocks, one block per parent,
  // and menuOrder restarts (1, 2, 3...) at the start of each block.
  const children = active.filter((item) => item.pageId !== null);
  let parentIndex = 0;
  let prevOrder = -Infinity;

  children.forEach((child) => {
    // menuOrder reset => this child belongs to the next parent section
    if (child.menuOrder <= prevOrder && parentIndex < parents.length - 1) {
      parentIndex += 1;
    }
    parents[parentIndex].links.push(child);
    prevOrder = child.menuOrder;
  });

  parents.forEach((p) => p.links.sort((a, b) => a.menuOrder - b.menuOrder));
  return parents;
}

function Footer() {
  const [footerItems, setFooterItems] = useState([]);
  const footerSections = groupFooterSections(footerItems);

  useEffect(() => {
    let cancelled = false;
    api
      .getFooterItems()
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setFooterItems(data);
      })
      .catch((err) => console.warn('Falling back to static menu:', err.message));
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
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

          {footerSections.map((section) => (
            <div key={section.menuId}>
              <h5>{section.menuName}</h5>
              <ul>
                {section.links.map((link) => (
                  <li key={link.menuId}>
                    <NavLink to={link.link}>→ {link.menuName}</NavLink>
                  </li>
                ))}
              </ul>
              {section.menuName === 'Policies' && (
                <div style={{ marginTop: 16, fontSize: '12.3px', color: '#8A9AB8', display: 'flex', gap: 8 }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" style={{ flex: 'none', marginTop: 2 }} fill="none" stroke="var(--orange)" strokeWidth="2"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"></path><circle cx="12" cy="9.5" r="2.4"></circle></svg>
                  <span>NIELIT Bhawan, Plot No. 3, PSP Pocket, Sector-8, Dwarka, New Delhi – 110077</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© 2026 NIELIT. All rights reserved. Government of India.</span>
          <span>Last Updated: Jul 2026 | Total Visitors: {(164758432).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer