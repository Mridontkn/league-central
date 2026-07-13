import { useEffect, useState } from "react";
import { getTeams } from "../lib/googleSheet";
import { computeStandings } from "../data/standings";
import TeamCard from "../components/teamcard";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setTeams(await getTeams());
      setLoading(false);
    }

    load();
  }, []);

  const ranked = computeStandings(teams);

  return (
    <div className="page">
      <div className="page-head">
        <h1>Teams</h1>
        <p>{teams.length ? `${teams.length} clubs in the league` : "\u00A0"}</p>
      </div>

      {loading && <div className="empty-state">Loading teams…</div>}

      {!loading && ranked.length === 0 && (
        <div className="empty-state">No teams yet.</div>
      )}

      {ranked.map((team) => (
        <TeamCard key={team.short} team={team} />
      ))}
    </div>
  );
}
