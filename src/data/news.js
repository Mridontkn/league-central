// ---------------------------------------------------------------------------
// NEWS
// `sampleNews` is the fallback shown until a Google Sheet is wired up.
// `transformNews` converts raw CSV rows into the same shape, newest first.
// ---------------------------------------------------------------------------

export const sampleNews = [
  {
    id: "n1",
    date: "2026-07-11",
    tag: "Recap",
    title: "Thunderhawks light the lamp five times in rout of Storm",
    excerpt: "Northgate's top line combined for four goals as the Thunderhawks moved into first place outright.",
  },
  {
    id: "n2",
    date: "2026-07-09",
    tag: "Standings",
    title: "Icemen climb into a playoff spot with comeback win over Wolves",
    excerpt: "Port Bellamy erased a two-goal deficit in the third period to edge Cedar Falls 4-3.",
  },
  {
    id: "n3",
    date: "2026-07-05",
    tag: "League",
    title: "Second half schedule released",
    excerpt: "All six clubs will see updated matchups starting next week — check the Games tab for dates.",
  },
];

export function transformNews(rows) {
  return rows
    .filter((r) => r.title?.trim())
    .map((r, index) => ({
      id: r.id?.trim() || `news-${index}`,
      date: (r.date || "").trim(),
      tag: (r.tag || "News").trim(),
      title: (r.title || "").trim(),
      excerpt: (r.excerpt || "").trim(),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}