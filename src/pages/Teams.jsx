import { useEffect, useState } from "react";
import { getTeams } from "../lib/googleSheet";
import TeamCard from "../components/TeamCard";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function loadTeams() {
      const data = await getTeams();

      console.log(data);

      setTeams(data);
    }

    loadTeams();
  }, []);

return (
  <div style={{ color: "white", padding: 20 }}>
    <h1>Teams Debug</h1>

    <p>Number of teams: {teams.length}</p>

    <pre>{JSON.stringify(teams, null, 2)}</pre>
  </div>
);
}