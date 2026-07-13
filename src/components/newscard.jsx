export default function NewsCard({ item }) {
  const dateLabel = new Date(item.date + "T00:00:00").toLocaleDateString(
    undefined,
    { month: "short", day: "numeric" }
  );

  return (
    <div className="news-card">
      <div className="row">
        <span className="tag">{item.tag}</span>
        <span className="date">{dateLabel}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.excerpt}</p>
    </div>
  );
}
