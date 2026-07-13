import { useEffect, useState } from "react";
import { getGames } from "../lib/googleSheet";

export default function Games() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function load() {
      setGames(await getGames());
    }

    load();
  }, []);

  return (
    <div className="page">
      <h1>Games</h1>

      {games.map((game) => (
        <div key={game.id}>
          <h3>
            {game.away} @ {game.home}
          </h3>

          <p>
            {game.awayScore} - {game.homeScore}
          </p>

          <p>{game.status}</p>
        </div>
      ))}
    </div>
  );
}