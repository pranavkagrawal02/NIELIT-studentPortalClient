import "./styles/NotificationCard.css";

export default function NotificationCard({ item }) {
  return (
    <div className={`notif-item ${!item.isNew ? "old" : ""}`}>
      <div className={`stripe ${item.color}`}></div>

      <div className="body">
        <p>
          {item.title}

          {item.isNew && (
            <span className="tag-new">
              New
            </span>
          )}
        </p>

        <time>
          {item.date}
          {item.description && ` → ${item.description}`}
        </time>
      </div>
    </div>
  );
}