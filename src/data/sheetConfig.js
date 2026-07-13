// ---------------------------------------------------------------------------
// GOOGLE SHEET CONNECTION
//
// Set up your sheet once:
//   1. Create a Google Sheet with three tabs named Teams, Games, News.
//      Use the exact column headers below (order doesn't matter, names do).
//
//      Teams tab:  short | name | city | color | w | l | otl
//        - short  3-letter team code, must be unique (e.g. THR)
//        - color  a hex color for that team's accent (e.g. #2fb4ff)
//        - w/l/otl  wins / losses / OT-shootout losses, updated by you
//
//      Games tab:  id | date | home | away | homeScore | awayScore | status | time
//        - date    YYYY-MM-DD
//        - home/away  team short codes
//        - status  "final" | "upcoming" | "live"
//        - homeScore/awayScore  leave blank until the game is final
//        - time    only needed for upcoming games, e.g. "8:30 PM"
//
//      News tab:  id | date | tag | title | excerpt
//
//   2. For EACH tab: File > Share > Publish to web > pick that specific
//      sheet (not "Entire Document") > format CSV > Publish.
//   3. Paste each resulting link below. Leave any URL as "" to fall back
//      to the sample data bundled in src/data/ instead.
// ---------------------------------------------------------------------------

export const TEAMS_CSV_URL = "";
export const GAMES_CSV_URL = "";
export const NEWS_CSV_URL = "";

export const REFRESH_MS = 60_000; // how often the live site re-checks the sheet
