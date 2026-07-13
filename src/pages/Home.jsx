import Scorebug from "../components/Scorebug";
import NewsCard from "../components/newscard";
import { useLeague } from "../context/LeagueDataContext.jsx";
import { nextGame, lastResult } from "../data/games";
import { PLAYOFF_SPOTS } from "../data/standings";

function Home() {
  const { teams, games, news, standings, loading, isLive } = useLeague();
  const featured = nextGame(games) || lastResult(games);
  const top3 = standings.slice(0, 3);
  const latestNews = news.slice(0, 2);

  return (
    <div className="page">
      <div className="hero">
        <span className="eyebrow">
          {loading ? "Loading…" : isLive ? "Live from the sheet" : "Season in progress"}
        </span>
        <h1>Every goal. Every stat.<br />One league.</h1>
        <p className="tagline">
          The home base for HCA — standings, scores and news for every club
          in the league.
        </p>
      </div>

      {featured && (
        <div>
          <div className="section-head">
            <span className="eyebrow">
              {featured.status === "upcoming" ? "Next Up" : "Last Result"}
            </span>
          </div>
          <Scorebug game={featured} teams={teams} fullNames />
        </div>
      )}

      <div>
        <div className="section-head">
          <h2>Standings</h2>
          <a className="see-all" href="/standings">Full table</a>
        </div>
        <div className="standings-table">
          {top3.map((t, i) => (
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

      <div>
        <div className="section-head">
          <h2>Latest News</h2>
          <a className="see-all" href="/news">All news</a>
        </div>
        <div className="page" style={{ gap: 12 }}>
          {latestNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
