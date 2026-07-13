import Papa from "papaparse";

const SHEETS = {
  teams:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=0&single=true&output=csv",

  games:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=403253795&single=true&output=csv",

  news:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTAB8s0NiI8vGmRTdOw5vYP0avQF1QjTnsuZet1j86_8kRXZWB-dmDr23BdGPdFc3jkZBfGqTIYXknx/pub?gid=535605236&single=true&output=csv",
};

async function fetchSheet(url) {
  const response = await fetch(url);
  const csv = await response.text();

  const result = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data;
}

export function getTeams() {
  return fetchSheet(SHEETS.teams);
}

export function getGames() {
  return fetchSheet(SHEETS.games);
}

export function getNews() {
  return fetchSheet(SHEETS.news);
}