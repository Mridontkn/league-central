import Papa from "papaparse";

// Fetches a Google Sheet tab that's been published to the web as CSV and
// returns an array of row objects keyed by column header.
export async function fetchSheetRows(csvUrl) {
  const res = await fetch(csvUrl, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Sheet request failed (${res.status})`);
  }
  const text = await res.text();
  const { data, errors } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });
  if (errors?.length) {
    console.warn("CSV parse warnings:", errors);
  }
  return data;
}
