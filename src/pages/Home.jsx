import { useEffect, useState } from "react";
import { getTeams, getGames, getNews } from "../lib/googleSheet";

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function load() {
      setTeams(await getTeams());
      setGames(await getGames());
      setNews(await getNews());
    }

    load();
  }, []);

  return (
    <div className="page">
      <h1>🏒 League Central</h1>

      <h2>Latest News</h2>
      {news.slice(0, 2).map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}

      <h2>Today's Games</h2>
      {games.slice(0, 2).map((game) => (
        <p key={game.id}>
          {game.away} @ {game.home}
        </p>
      ))}

      <h2>Teams</h2>
      <p>{teams.length} Teams</p>
    </div>
  );
}