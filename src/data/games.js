// ---------------------------------------------------------------------------
// HCA GAMES
// Add one entry per game. Use team `short` codes from teams.js.
//
// status: "final" | "upcoming" | "live"
// For "final" games, include homeScore / awayScore.
// For "upcoming" games, leave scores out and set a `time` string.
// ---------------------------------------------------------------------------

export const games = [
  {
    id: "g1",
    date: "2026-07-06",
    home: "THR",
    away: "STM",
    homeScore: 5,
    awayScore: 2,
    status: "final",
  },
  {
    id: "g2",
    date: "2026-07-08",
    home: "WLV",
    away: "ICE",
    homeScore: 3,
    awayScore: 4,
    status: "final",
  },
  {
    id: "g3",
    date: "2026-07-10",
    home: "GRZ",
    away: "RVN",
    homeScore: 6,
    awayScore: 1,
    status: "final",
  },
  {
    id: "g4",
    date: "2026-07-15",
    home: "THR",
    away: "WLV",
    time: "8:30 PM",
    status: "upcoming",
  },
  {
    id: "g5",
    date: "2026-07-17",
    home: "ICE",
    away: "GRZ",
    time: "9:00 PM",
    status: "upcoming",
  },
  {
    id: "g6",
    date: "2026-07-17",
    home: "STM",
    away: "RVN",
    time: "9:00 PM",
    status: "upcoming",
  },
];

export function nextGame() {
  return games.find((g) => g.status === "upcoming");
}

export function lastResult() {
  return [...games].reverse().find((g) => g.status === "final");
}
