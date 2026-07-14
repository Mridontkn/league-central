// ---------------------------------------------------------------------------
// GAMES
// `sampleGames` is the fallback shown until a Google Sheet is wired up.
// `transformGames` converts raw CSV rows into the same shape.
// ---------------------------------------------------------------------------

export const sampleGames = [
  { id: "g1", date: "2026-07-06", home: "THR", away: "STM", homeScore: 5, awayScore: 2, status: "final" },
  { id: "g2", date: "2026-07-08", home: "WLV", away: "ICE", homeScore: 3, awayScore: 4, status: "final" },
  { id: "g3", date: "2026-07-10", home: "GRZ", away: "RVN", homeScore: 6, awayScore: 1, status: "final" },
  { id: "g4", date: "2026-07-15", home: "THR", away: "WLV", time: "8:30 PM", status: "upcoming" },
  { id: "g5", date: "2026-07-17", home: "ICE", away: "GRZ", time: "9:00 PM", status: "upcoming" },
  { id: "g6", date: "2026-07-17", home: "STM", away: "RVN", time: "9:00 PM", status: "upcoming" },
];

function toNum(v) {
  if (v === undefined || v === null || v === "") return undefined;
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : undefined;
}

export function transformGames(rows) {
  return rows
    .filter((r) => r.id?.trim())
    .map((r) => ({
      id: r.id.trim(),
      date: (r.date || "").trim(),
      home: (r.home || "").trim().toUpperCase(),
      away: (r.away || "").trim().toUpperCase(),
      homeScore: toNum(r.homeScore),
      awayScore: toNum(r.awayScore),
      status: (r.status || "upcoming").trim().toLowerCase(),
      time: r.time ? r.time.trim() : undefined,
    }));
}

export function nextGame(games) {
  return games.find((g) => g.status === "upcoming");
}

export function lastResult(games) {
  return [...games].reverse().find((g) => g.status === "final");
}
