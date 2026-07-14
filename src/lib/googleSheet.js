import Papa from "papaparse";
import { sampleTeams, transformTeams } from "../data/teams";
import { sampleGames, transformGames } from "../data/games";
import { sampleNews, transformNews } from "../data/news";
import { sampleStats, transformStats } from "../data/stats";

// All tabs live in the same published HCA spreadsheet.
const SHEETS = {
  teams:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=0&single=true&output=csv",

  games:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=403253795&single=true&output=csv",

  news:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=535605236&single=true&output=csv",

  stats:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=1368783779&single=true&output=csv",

  standings:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=1158642239&single=true&output=csv",
};

async function fetchSheet(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Sheet fetch failed: ${response.status}`);
  }

  const csv = await response.text();

  const result = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}

export async function getTeams() {
  try {
    const rows = await fetchSheet(SHEETS.teams);
    const teams = transformTeams(rows);
    return teams.length ? teams : sampleTeams;
  } catch (err) {
    console.warn("Falling back to sample teams:", err);
    return sampleTeams;
  }
}

export async function getGames() {
  try {
    const rows = await fetchSheet(SHEETS.games);
    const games = transformGames(rows);
    return games.length ? games : sampleGames;
  } catch (err) {
    console.warn("Falling back to sample games:", err);
    return sampleGames;
  }
}

export async function getNews() {
  try {
    const rows = await fetchSheet(SHEETS.news);
    const news = transformNews(rows);
    return news.length ? news : sampleNews;
  } catch (err) {
    console.warn("Falling back to sample news:", err);
    return sampleNews;
  }
}

export async function getStats() {
  try {
    const rows = await fetchSheet(SHEETS.stats);
    const stats = transformStats(rows);
    return stats.length ? stats : sampleStats;
  } catch (err) {
    console.warn("Falling back to sample stats:", err);
    return sampleStats;
  }
}

export async function getStandings() {
  try {
    const rows = await fetchSheet(SHEETS.standings);

    return rows.map((row) => ({
      rank: Number(row.Rank),
      team: row.Team,
      conference: row.Conference,
      gp: Number(row.GP),
      w: Number(row.W),
      l: Number(row.L),
      otl: Number(row.OTL),
      pts: Number(row.PTS),
      gf: Number(row.GF),
      ga: Number(row.GA),
      diff: Number(row.DIFF),
    }));
  } catch (err) {
    console.warn("Failed to load standings:", err);
    return [];
  }
}