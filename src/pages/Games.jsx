import Scorebug from "../components/Scorebug";
import { useLeague } from "../context/LeagueDataContext.jsx";

function groupByDate(list) {
  return list.reduce((groups, game) => {
    (groups[game.date] ||= []).push(game);
    return groups;
  }, {});
}

export default function Games() {
  const { teams, games } = useLeague();
  const grouped = groupByDate(games);
  const dates = Object.keys(grouped).sort();

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Schedule &amp; Results</span>
        <h1>Games</h1>
      </div>

      {dates.length === 0 && (
        <div className="empty-state">No games scheduled yet.</div>
      )}

      {dates.map((date) => (
        <div key={date}>
          <div className="section-head">
            <h2>
              {new Date(date + "T00:00:00").toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
              })}
            </h2>
          </div>
          <div className="page" style={{ gap: 10 }}>
            {grouped[date].map((game) => (
              <Scorebug key={game.id} game={game} teams={teams} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
