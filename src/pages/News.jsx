import { useEffect, useState } from "react";
import { getNews } from "../lib/googleSheet";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function load() {
      setNews(await getNews());
    }

    load();
  }, []);

  return (
    <div className="page">
      <h1>News</h1>

      {news.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>

          <p>{item.excerpt}</p>

          <small>{item.date}</small>

          <hr />
        </div>
      ))}
    </div>
  );
}