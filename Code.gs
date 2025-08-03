function analyzeNetflixDataset() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  const rows = data.slice(1); // Skip headers

  const typeCount = {};
  const genreCount = {};
  const countryCount = {};
  const yearCount = {};
  const durationBuckets = { "< 60 min": 0, "60–90 min": 0, "90–120 min": 0, "120+ min": 0 };
  const directorCount = {};
  const ratingCount = {};

  for (const row of rows) {
    const type = row[1];
    const title = row[2];
    const director = row[3];
    const country = row[5];
    const releaseYear = row[7];
    const rating = row[8];
    const durationStr = row[9];
    const genres = row[10];

    // 1. Type Count
    if (type) typeCount[type] = (typeCount[type] || 0) + 1;

    // 2. Genre Count
    if (genres) {
      const genreList = genres.split(',').map(g => g.trim());
      for (const g of genreList) {
        genreCount[g] = (genreCount[g] || 0) + 1;
      }
    }

    // 3. Country Count
    if (country) {
      const countryList = country.split(',').map(c => c.trim());
      for (const c of countryList) {
        countryCount[c] = (countryCount[c] || 0) + 1;
      }
    }

    // 4. Content per Year
    if (releaseYear && !isNaN(releaseYear)) {
      yearCount[releaseYear] = (yearCount[releaseYear] || 0) + 1;
    }

    // 5. Duration Buckets (Only for Movies with minutes)
    if (durationStr && typeof durationStr === 'string' && durationStr.includes('min')) {
      const minutes = parseInt(durationStr.replace('min', '').trim());
      if (!isNaN(minutes)) {
        if (minutes < 60) durationBuckets["< 60 min"]++;
        else if (minutes <= 90) durationBuckets["60–90 min"]++;
        else if (minutes <= 120) durationBuckets["90–120 min"]++;
        else durationBuckets["120+ min"]++;
      }
    }

    // 6. Top Directors
    if (director) {
      const directorList = director.split(',').map(d => d.trim());
      for (const d of directorList) {
        directorCount[d] = (directorCount[d] || 0) + 1;
      }
    }

    // 7. Ratings Distribution
    if (rating) {
      ratingCount[rating] = (ratingCount[rating] || 0) + 1;
    }
  }

  // Output results to a new sheet
  const outputSheet = getOrCreateSheet_("Analysis Summary");
  outputSheet.clear();

  writeSummary_(outputSheet, "Movies vs TV Shows", typeCount, 1);
  writeSummary_(outputSheet, "Top Genres", genreCount, 12);
  writeSummary_(outputSheet, "Top Countries", countryCount, 24);
  writeSummary_(outputSheet, "Content per Year", yearCount, 36);
  writeSummary_(outputSheet, "Duration Buckets", durationBuckets, 48);
  writeSummary_(outputSheet, "Top Directors", directorCount, 60);
  writeSummary_(outputSheet, "Ratings Distribution", ratingCount, 72);
}

// Utility: Get or create a new sheet
function getOrCreateSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name);
  return sheet || ss.insertSheet(name);
}

// Utility: Write summary table
function writeSummary_(sheet, title, dataObj, startRow) {
  sheet.getRange(startRow, 1).setValue("📊 " + title);
  const sorted = Object.entries(dataObj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 only
  const values = [["Item", "Count"], ...sorted];
  sheet.getRange(startRow + 1, 1, values.length, 2).setValues(values);
}