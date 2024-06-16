export async function allRows() {
  const SPREAD_SHEET_ID = useRuntimeConfig().public.SPREAD_SHEET_ID;
  const GOOGLE_API_KEY = useRuntimeConfig().public.GOOGLE_API_KEY;
  const sheetRange = "價格調整中心!A1:Q36";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREAD_SHEET_ID}/values/${sheetRange}?key=${GOOGLE_API_KEY}`;
  return await useFetch(url);
}
