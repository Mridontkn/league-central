import { useEffect, useState } from "react";
import { getTeams, getStats } from "../lib/googleSheet";
import { computePlayerStats, formatSavePct } from "../data/stats";
import { getTeam } from "../data/teams";

export default function Stats() {
  const [teams, setTeams] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [t, s] = await Promise.all([getTeams(), getStats()]);
      setTeams(t);
      setStats(s);
      setLoading(false);
    }

    load();
  }, []);

  const leaders = computePlayerStats(stats);

  return (
    <div className="page">
      <div className="page-head">
        <h1>Stats</h1>
        <p>League scoring leaders</p>
      </div>

      {loading && <div className="empty-state">Loading stats…</div>}

      {!loading && leaders.length > 0 && (
        <div className="standings-table">
          <div className="standings-row head">
            <span className="rank">#</span>
            <span className="team">Player</span>
            <span className="cell">GP</span>
            <span className="cell">G</span>
            <span className="cell">A</span>
            <span className="cell">PTS</span>
            <span className="cell">SV%</span>
          </div>

          {leaders.map((player, index) => {
            const team = getTeam(teams, player.team);

            return (
              <div
                className="standings-row"
                key={player.id}
                style={{ "--team-color": team?.color }}
              >
                <span className="rank">{index + 1}</span>
                <div className="team">
                  <span className="crest">{player.team}</span>
                  <span className="label">
                    {player.name}
                    <span className="sub">
                      {team ? `${team.city} ${team.name}` : player.team}
                    </span>
                  </span>
                </div>
                <span className="cell">{player.gp}</span>
                <span className="cell">{player.g}</span>
                <span className="cell">{player.a}</span>
                <span className="cell pts">{player.pts}</span>
                <span className="cell">{formatSavePct(player.sv)}</span>
              </div>
            );
          })}
        </div>
      )}

      {!loading && leaders.length === 0 && (
        <div className="empty-state">No stats yet.</div>
      )}
    </div>
  );
}
