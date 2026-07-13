import { useEffect, useState } from "react";
import { getNews } from "../lib/googleSheet";
import NewsCard from "../components/newscard";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setNews(await getNews());
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="page">
      <div className="page-head">
        <h1>News</h1>
        <p>Recaps, notes, and league updates</p>
      </div>

      {loading && <div className="empty-state">Loading news…</div>}

      {!loading && news.length === 0 && (
        <div className="empty-state">No news yet — check back soon.</div>
      )}

      {news.map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
