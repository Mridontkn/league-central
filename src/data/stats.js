// ---------------------------------------------------------------------------
// PLAYER STATS
// `sampleStats` is the fallback shown until the Stats tab is reachable.
// `transformStats` converts raw CSV rows into the same shape.
// `computePlayerStats` derives points (G+A) and sorts the leaderboard.
// ---------------------------------------------------------------------------

export const sampleStats = [
  { id: "p1", name: "Jordan Vance", team: "THR", gp: 15, g: 14, a: 12, sv: undefined },
  { id: "p2", name: "Casey Okafor", team: "ICE", gp: 16, g: 11, a: 13, sv: undefined },
  { id: "p3", name: "Milo Ferreira", team: "WLV", gp: 15, g: 9, a: 11, sv: undefined },
  { id: "p4", name: "Riley Basson", team: "GRZ", gp: 17, g: 10, a: 8, sv: undefined },
  { id: "p5", name: "Theo Marchetti", team: "STM", gp: 16, g: 6, a: 9, sv: undefined },
  { id: "p6", name: "Sasha Winters", team: "RVN", gp: 15, g: 5, a: 6, sv: 0.918 },
];

function toNum(v) {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : 0;
}

function toPct(v) {
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : undefined;
}

export function transformStats(rows) {
  return rows.map((r) => ({
    id: r.id || r.name,
    name: (r.name || "").trim(),
    team: (r.team || "").trim(),
    gp: toNum(r.gp),
    g: toNum(r.g),
    a: toNum(r.a),
    sv: toPct(r.sv),
  }));
}
// Formats a 0–1 save percentage the way hockey stat sheets do: ".918"
export function formatSavePct(sv) {
  if (sv === undefined || sv === null || Number.isNaN(sv)) return "—";
  return sv.toFixed(3).replace(/^0/, "");
}

export function computePlayerStats(stats) {
  return stats
    .map((p) => ({ ...p, pts: p.g + p.a }))
    .sort((a, b) => b.pts - a.pts || b.g - a.g || a.name.localeCompare(b.name));
}
