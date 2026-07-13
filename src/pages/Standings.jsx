import { useEffect, useState } from "react";
import { getTeams } from "../lib/googleSheet";

export default function Standings() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getTeams();

      data.sort((a, b) => {
        const ptsA = Number(a.W) * 2 + Number(a.otl);
        const ptsB = Number(b.W) * 2 + Number(b.otl);

        return ptsB - ptsA;
      });

      setTeams(data);
    }

    load();
  }, []);

  return (
    <div className="page">
      <h1>Standings</h1>

      {teams.map((team, index) => {
        const pts = Number(team.W) * 2 + Number(team.otl);

        return (
          <div key={team.short}>
            {index + 1}. {team.city} {team.name} — {pts} pts
          </div>
        );
      })}
    </div>
  );
}