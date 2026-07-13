import Scorebug from "../components/Scorebug";
import NewsCard from "../components/newscard";
import { lastResult, nextGame } from "../data/games";
import { news } from "../data/news";
import { getStandings } from "../data/standings";

function Home() {
  const featured = nextGame() || lastResult();
  const top3 = getStandings().slice(0, 3);
  const latestNews = news.slice(0, 2);

  return (
    <div className="page">
      <div className="hero">
        <span className="eyebrow">Season in progress</span>
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
          <Scorebug game={featured} fullNames />
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
              className="standings-row"
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
