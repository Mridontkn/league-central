import { useEffect, useState } from "react";
import { getStandings } from "../lib/googleSheet";

const PLAYOFF_SPOTS = 8;

export default function Standings() {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setStandings(await getStandings());
      setLoading(false);
    }

    load();
  }, []);

  const west = standings.filter(
    (team) => team.conference === "Western"
  );

  const east = standings.filter(
    (team) => team.conference === "Eastern"
  );

  function renderConference(title, standings) {
    return (
      <>
        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>{title}</h2>

        <div className="standings-table">
          <div className="standings-row head">
            <span className="rank">#</span>
            <span className="team">Team</span>
            <span className="cell">W</span>
            <span className="cell">L</span>
            <span className="cell">OTL</span>
            <span className="cell">GP</span>
            <span className="cell">PTS</span>
          </div>

          {standings.map((team, index) => (
            <div
              key={team.rank}
              className={`standings-row${
                index === PLAYOFF_SPOTS - 1 ? " standings-cutoff" : ""
              }`}
            >
              <span className="rank">{team.rank}</span>

              <div className="team">
                <span className="label">{team.team}</span>
              </div>

              <span className="cell">{team.w}</span>
              <span className="cell">{team.l}</span>
              <span className="cell">{team.otl}</span>
              <span className="cell">{team.gp}</span>
              <span className="cell pts">{team.pts}</span>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Standings</h1>
        <p>Top {PLAYOFF_SPOTS} clubs make the playoffs</p>
      </div>

      {loading && <div className="empty-state">Loading standings…</div>}

      {!loading && (
        <>
          {renderConference("Western Conference", west)}
          {renderConference("Eastern Conference", east)}
        </>
      )}

      {!loading && west.length === 0 && east.length === 0 && (
        <div className="empty-state">No standings found.</div>
      )}
    </div>
  );
}