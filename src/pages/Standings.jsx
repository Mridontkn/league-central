import { useLeague } from "../context/LeagueDataContext.jsx";
import { PLAYOFF_SPOTS } from "../data/standings";

export default function Standings() {
  const { standings } = useLeague();

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">Season Standings</span>
        <h1>Standings</h1>
        <p>Top {PLAYOFF_SPOTS} clubs make the playoffs.</p>
      </div>

      <div className="standings-table">
        <div className="standings-row head">
          <span></span>
          <span>Club</span>
          <span className="cell">GP</span>
          <span className="cell">W</span>
          <span className="cell">L</span>
          <span className="cell">OTL</span>
          <span className="cell">PTS</span>
        </div>

        {standings.map((t, i) => (
          <div
            key={t.short}
            className={`standings-row${i === PLAYOFF_SPOTS - 1 ? " standings-cutoff" : ""}`}
            style={{ "--team-color": t.color }}
          >
            <span className="rank stat">{i + 1}</span>
            <span className="team">
              <span className="crest" style={{ "--team-color": t.color }}>
                {t.short}
              </span>
              <span className="label">{t.name}</span>
            </span>
            <span className="cell">{t.gp}</span>
            <span className="cell">{t.w}</span>
            <span className="cell">{t.l}</span>
            <span className="cell">{t.otl}</span>
            <span className="cell pts">{t.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
