import { useEffect, useState } from "react";
import { getTeams } from "../lib/googleSheet";
import TeamCard from "../components/teamcard";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function load() {
      setTeams(await getTeams());
    }

    load();
  }, []);

  return (
    <div className="page">
      <h1>Teams</h1>

      {teams.map((team) => (
        <TeamCard key={team.short} team={team} />
      ))}
    </div>
  );
}