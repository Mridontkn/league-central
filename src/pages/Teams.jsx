import TeamCard from "../components/teamcard";
import { useLeague } from "../context/LeagueDataContext.jsx";

export default function Teams() {
  const { teams } = useLeague();

  return (
    <div className="page">
      <div className="page-head">
        <span className="eyebrow">The League</span>
        <h1>Teams</h1>
        <p>{teams.length} clubs competing this season.</p>
      </div>

      <div className="page" style={{ gap: 12 }}>
        {teams.map((team) => (
          <TeamCard key={team.short} team={team} />
        ))}
      </div>
    </div>
  );
}
