import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeams, getGames, getNews } from "../lib/googleSheet";
import { nextGame, lastResult } from "../data/games";
import { computeStandings } from "../data/standings";
import Scorebug from "../components/Scorebug";
import NewsCard from "../components/newscard";

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [t, g, n] = await Promise.all([getTeams(), getGames(), getNews()]);
      setTeams(t);
      setGames(g);
      setNews(n);
      setLoading(false);
    }

    load();
  }, []);

  const featured = nextGame(games) || lastResult(games);
  const standings = computeStandings(teams).slice(0, 3);

  return (
    <div className="page">
      <div className="hero">
        <span className="eyebrow">HCA · League Central</span>
        <h1>League Central</h1>
        <p className="tagline">Scores, standings, and news for every club in the league.</p>
      </div>

      {!loading && featured && (
        <section>
          <div className="section-head">
            <h2>{featured.status === "upcoming" ? "Next Up" : "Latest Result"}</h2>
          </div>
          <Scorebug game={featured} teams={teams} fullNames />
        </section>
      )}

      <section>
        <div className="section-head">
          <h2>Standings</h2>
          <Link to="/standings" className="see-all">Full Table</Link>
        </div>

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
            <div className="standings-row" key={team.short} style={{ "--team-color": team.color }}>
              <span className="rank">{index + 1}</span>
              <div className="team">
                <span className="crest">{team.short}</span>
                <span className="label">{team.city} {team.name}</span>
              </div>
              <span className="cell">{team.w}</span>
              <span className="cell">{team.l}</span>
              <span className="cell">{team.otl}</span>
              <span className="cell">{team.gp}</span>
              <span className="cell pts">{team.pts}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>Latest News</h2>
          <Link to="/news" className="see-all">See All</Link>
        </div>

        {news.slice(0, 2).map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </section>

      {loading && <div className="empty-state">Loading league data…</div>}
    </div>
  );
}
