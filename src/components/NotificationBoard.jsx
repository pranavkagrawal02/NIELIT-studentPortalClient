import React, { useState } from "react";
import NotificationTabs from "./NotificationTabs";
import NotificationCard from "./NotificationCard";
import "./styles/NotificationBoard.css";

const data = {
  newCount: 4,

  categories: [
    {
      id: 1,
      name: "Exam Notice",
    },
    {
      id: 2,
      name: "Admit Card Notice",
    },
    {
      id: 3,
      name: "Practical Admit Card Notice",
    },
    {
      id: 4,
      name: "Result Notice",
    },
    {
      id: 5,
      name: "Other Notices",
    },
  ],

  notifications: [
    {
      id: 1,
      categoryId: 1,
      title: "Exam application window opens for Institute Candidates",
      date: "05 Apr 2026",
      description: "Last date to apply: 15 Apr 2026",
      isNew: true,
      color: "pink",
    },
    {
      id: 2,
      categoryId: 1,
      title: "Last date for Online Registration Application (Institute Candidate)",
      date: "31 May 2026",
      description: "",
      isNew: true,
      color: "pink",
    },
    {
      id: 3,
      categoryId: 1,
      title: "May 2026 STC — Computer Applications Associate (CAA) application window",
      date: "05 Apr 2026",
      description: "Last date: 18 Apr 2026",
      isNew: true,
      color: "blue",
    },
    {
      id: 4,
      categoryId: 1,
      title: "May 2026 STC — Certified Data Entry & Office Assistant (Upskilling)",
      date: "05 Apr 2026",
      description: "Last date: 20 Apr 2026",
      isNew: true,
      color: "blue",
    },
    {
      id: 5,
      categoryId: 2,
      title: "July 2026 IT, C-Level admit card available",
      date: "03 Jul 2026",
      description: "",
      isNew: true,
      color: "green",
    },
    {
      id: 6,
      categoryId: 3,
      title: "Practical admit card released",
      date: "01 Jul 2026",
      description: "",
      isNew: true,
      color: "orange",
    },
    {
      id: 7,
      categoryId: 4,
      title: "January 2026 results declared",
      date: "21 Apr 2026",
      description: "",
      isNew: true,
      color: "green",
    },
    {
      id: 8,
      categoryId: 5,
      title: "No other notification available",
      date: "",
      description: "",
      isNew: false,
      color: "gray",
    },
  ],
};

export default function NotificationBoard() {
  const [activeTab, setActiveTab] = useState(data.categories[0].id);

  const filteredNotifications = data.notifications.filter(
    (item) => item.categoryId === activeTab
  );
  const newCount = filteredNotifications.filter(
    (item) => item.isNew
  ).length;
  return (
    <section className="split-section">
      <div className="container">
        <div className="notif-card">

          <div className="notif-head">
          <div className="bell">
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
    >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.7 21a2 2 0 0 1-3.4 0"></path>
    </svg>
</div>

            <h3 style={{ flex: 1 }}>
              Important Notifications
            </h3>

            <span className="new-count">
               {newCount > 0 ? `${newCount} New` : "Up to date"}
            </span>
          </div>

          <NotificationTabs
            tabs={data.categories}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="notif-list">
            {filteredNotifications.map((item) => (
              <NotificationCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

          <a className="view-all" href="#">
            View All Notifications →
          </a>

        </div>
      </div>
    </section>
  );
}