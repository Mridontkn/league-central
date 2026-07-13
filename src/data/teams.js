// ---------------------------------------------------------------------------
// HCA TEAMS
// Edit this list to match your league. Each team needs a unique `short`
// code (3 letters, used everywhere as the team's tag) and a `color` (used
// for crest backgrounds and accent bars throughout the app).
//
// `w` / `l` / `otl` are updated by you after each game — standings are
// calculated automatically from these numbers (see standings.js).
// ---------------------------------------------------------------------------

export const teams = [
  {
    short: "THR",
    name: "Thunderhawks",
    city: "Northgate",
    color: "#2fb4ff",
    w: 11,
    l: 3,
    otl: 1,
  },
  {
    short: "ICE",
    name: "Icemen",
    city: "Port Bellamy",
    color: "#f5a623",
    w: 9,
    l: 5,
    otl: 2,
  },
  {
    short: "WLV",
    name: "Wolves",
    city: "Cedar Falls",
    color: "#a78bfa",
    w: 8,
    l: 6,
    otl: 1,
  },
  {
    short: "GRZ",
    name: "Grizzlies",
    city: "Kettleman",
    color: "#34d399",
    w: 7,
    l: 7,
    otl: 3,
  },
  {
    short: "STM",
    name: "Storm",
    city: "Harborview",
    color: "#f87171",
    w: 5,
    l: 9,
    otl: 2,
  },
  {
    short: "RVN",
    name: "Ravens",
    city: "Old Mill",
    color: "#94a3b8",
    w: 3,
    l: 11,
    otl: 1,
  },
];

export function getTeam(short) {
  return teams.find((t) => t.short === short);
}
