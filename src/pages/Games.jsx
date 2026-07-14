import { useEffect, useState } from "react";
import { getTeams, getGames } from "../lib/googleSheet";
import Scorebug from "../components/Scorebug";

function groupByWeek(games) {
  const groups = new Map();

  for (const game of games) {
    const week = game.week ?? 0;

    if (!groups.has(week)) {
      groups.set(week, []);
    }

    groups.get(week).push(game);
  }

  return [...groups.entries()].sort((a, b) => a[0] - b[0]);
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

  const grouped = groupByWeek(games);

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

{grouped.map(([week, weekGames]) => (
  <section key={week}>
    <div className="section-head">
      <span className="eyebrow">Week {week}</span>
    </div>

          <div className="page" style={{ gap: "12px" }}>
            {weekGames.map((game) => (
              <Scorebug key={game.id} game={game} teams={teams} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
