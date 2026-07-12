import "./styles/NotificationTabs.css";

export default function NotificationTabs({
  tabs = [],
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="notif-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={activeTab === tab.id ? "active" : ""}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}