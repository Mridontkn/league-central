import NewsCard from "../components/newscard";
import { useLeague } from "../context/LeagueDataContext.jsx";

function News() {
  const { news } = useLeague();

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">HCA Wire</span>
        <h1>News</h1>
      </div>

      {news.length === 0 ? (
        <div className="empty-state">No stories yet.</div>
      ) : (
        <div className="page" style={{ gap: 12 }}>
          {news.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default News;
