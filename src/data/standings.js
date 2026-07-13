import { teams } from "./teams";

// Standard hockey points: 2 for a win, 1 for an OT/shootout loss.
export function getStandings() {
  return teams
    .map((t) => ({
      ...t,
      gp: t.w + t.l + t.otl,
      pts: t.w * 2 + t.otl,
    }))
    .sort((a, b) => b.pts - a.pts || b.w - a.w);
}

// Index (0-based) after which the playoff cutoff line is drawn.
export const PLAYOFF_SPOTS = 4;
