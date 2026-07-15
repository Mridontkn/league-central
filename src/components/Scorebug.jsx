import { getTeam } from "../data/teams";

function Crest({ team }) {
  return (
    <div className="crest" style={{ "--team-color": team.color }}>
      {team.short}
    </div>
  );
}

function TeamSide({ team, full }) {
  return (
    <div className="scorebug-team" style={{ "--team-color": team.color }}>
      <Crest team={team} />
      <div className="names">
        <span className="name-short">{team.short}</span>
        {full && <span className="name-full">{team.city} {team.name}</span>}
      </div>
    </div>
  );
}

export default function Scorebug({ game, teams, fullNames = false }) {
  const home = getTeam(teams, game.home);
  const away = getTeam(teams, game.away);
  if (!home || !away) return null;

  const isFinal = game.status === "final";
  const isLive = game.status === "live";
  const homeWin = isFinal && game.homeScore > game.awayScore;

const dateLabel = `Week ${game.week}`;

  return (
    <div className="scorebug">
      <div className={`scorebug-status${isLive ? " is-live" : ""}`}>
        {isLive ? (
  <span className="live-flag">
    <span className="dot" /> Live
  </span>
) : isFinal ? (
  <span>Final · Week {game.week}</span>
) : (
  <span>Week {game.week}</span>
)}
      </div>

      <div className="scorebug-body">
        <TeamSide team={away} full={fullNames} />

        {isFinal || isLive ? (
          <div className="scorebug-score">
            <span className={`num ${homeWin ? "lose" : "win"}`}>
              {game.awayScore}
            </span>
            <span className="sep">–</span>
            <span className={`num ${homeWin ? "win" : "lose"}`}>
              {game.homeScore}
            </span>
          </div>
        ) : (
          <div className="scorebug-vs">VS</div>
        )}

        <TeamSide team={home} full={fullNames} />
      </div>
    </div>
  );
}
