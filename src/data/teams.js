// ---------------------------------------------------------------------------
// TEAMS
// `sampleTeams` is the fallback shown until (or unless) a Google Sheet is
// wired up in sheetConfig.js. `transformTeams` converts raw CSV rows from
// the sheet into the same shape.
// ---------------------------------------------------------------------------

export const sampleTeams = [
  { short: "THR", name: "Thunderhawks", city: "Northgate", color: "#2fb4ff", w: 11, l: 3, otl: 1 },
  { short: "ICE", name: "Icemen", city: "Port Bellamy", color: "#f5a623", w: 9, l: 5, otl: 2 },
  { short: "WLV", name: "Wolves", city: "Cedar Falls", color: "#a78bfa", w: 8, l: 6, otl: 1 },
  { short: "GRZ", name: "Grizzlies", city: "Kettleman", color: "#34d399", w: 7, l: 7, otl: 3 },
  { short: "STM", name: "Storm", city: "Harborview", color: "#f87171", w: 5, l: 9, otl: 2 },
  { short: "RVN", name: "Ravens", city: "Old Mill", color: "#94a3b8", w: 3, l: 11, otl: 1 },
];

function toNum(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
}

export function transformTeams(rows) {
  return rows
    .filter((r) => r.short?.trim())
    .map((r) => ({
      short: r.short.trim().toUpperCase(),
      name: (r.name || "").trim(),
      city: (r.city || "").trim(),
      color: (r.color || "").trim() || "#2fb4ff",
      w: toNum(r.w),
      l: toNum(r.l),
      otl: toNum(r.otl),
    }));
}

export function getTeam(teams, short) {
  return teams.find((t) => t.short === short);
}
