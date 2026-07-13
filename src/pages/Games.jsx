import { useEffect, useState } from "react";
import { getTeams, getGames } from "../lib/googleSheet";
import Scorebug from "../components/Scorebug";

function groupByDate(games) {
  const groups = new Map();
  for (const game of games) {
    if (!groups.has(game.date)) groups.set(game.date, []);
    groups.get(game.date).push(game);
  }
  return [...groups.entries()].sort(([a], [b]) => (a < b ? -1 : 1));
}

function formatGroupDate(date) {
  return new Date(date + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function Games() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [t, g] = await Promise.all([getTeams(), getGames()]);
      setTeams(t);
      setGames(g);
      setLoading(false);
    }

    load();
  }, []);

  const grouped = groupByDate(games);

  return (
    <div className="page">
      <div className="page-head">
        <h1>Games</h1>
        <p>Full schedule and results</p>
      </div>

      {loading && <div className="empty-state">Loading games…</div>}

      {!loading && grouped.length === 0 && (
        <div className="empty-state">No games scheduled yet.</div>
      )}

      {grouped.map(([date, dayGames]) => (
        <section key={date}>
          <div className="section-head">
            <span className="eyebrow">{formatGroupDate(date)}</span>
          </div>

          <div className="page" style={{ gap: "12px" }}>
            {dayGames.map((game) => (
              <Scorebug key={game.id} game={game} teams={teams} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
