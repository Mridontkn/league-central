import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { fetchSheetRows } from "../lib/googleSheet";
import { TEAMS_CSV_URL, GAMES_CSV_URL, NEWS_CSV_URL, REFRESH_MS } from "../data/sheetConfig";
import { sampleTeams, transformTeams } from "../data/teams";
import { sampleGames, transformGames } from "../data/games";
import { sampleNews, transformNews } from "../data/news";
import { computeStandings } from "../data/standings";

const LeagueDataContext = createContext(null);

async function loadSource(url, transform, fallback) {
  if (!url) return { data: fallback, isLive: false, error: null };
  try {
    const rows = await fetchSheetRows(url);
    const data = transform(rows);
    if (!data.length) throw new Error("Sheet returned no rows");
    return { data, isLive: true, error: null };
  } catch (err) {
    console.warn("Falling back to sample data:", err.message);
    return { data: fallback, isLive: false, error: err.message };
  }
}

export function LeagueDataProvider({ children }) {
  const [state, setState] = useState({
    teams: sampleTeams,
    games: sampleGames,
    news: sampleNews,
    loading: true,
    isLive: false,
    lastUpdated: null,
  });

  const load = useCallback(async () => {
    const [t, g, n] = await Promise.all([
      loadSource(TEAMS_CSV_URL, transformTeams, sampleTeams),
      loadSource(GAMES_CSV_URL, transformGames, sampleGames),
      loadSource(NEWS_CSV_URL, transformNews, sampleNews),
    ]);
    setState({
      teams: t.data,
      games: g.data,
      news: n.data,
      loading: false,
      isLive: t.isLive || g.isLive || n.isLive,
      lastUpdated: new Date(),
    });
  }, []);

  useEffect(() => {
    load();
    const anyConfigured = TEAMS_CSV_URL || GAMES_CSV_URL || NEWS_CSV_URL;
    if (!anyConfigured) return;
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  const value = {
    ...state,
    standings: computeStandings(state.teams),
    refresh: load,
  };

  return (
    <LeagueDataContext.Provider value={value}>
      {children}
    </LeagueDataContext.Provider>
  );
}

export function useLeague() {
  const ctx = useContext(LeagueDataContext);
  if (!ctx) {
    throw new Error("useLeague must be used inside a LeagueDataProvider");
  }
  return ctx;
}
