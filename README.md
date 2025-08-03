# 📊 Netflix Data Analysis Project

This project uses Google Apps Script to analyze Netflix dataset directly inside Google Sheets. It performs **seven types of analyses** and summarizes them in a clean dashboard.

---

## 🔍 Analyses Included

1. **Movies vs TV Shows**
2. **Top Genres**
3. **Top Content by Country**
4. **Content per Year**
5. **Duration Bucketing**
6. **Top Directors**
7. **Ratings Distribution**

---

## 🧠 Tech Used

- Google Sheets
- Google Apps Script (JavaScript)
- Basic Spreadsheet Functions (for charting and pivoting)

---

## 🛠️ How It Works

1. Paste your Netflix dataset into a Google Sheet.
2. Open **Extensions > Apps Script** and paste `Code.gs` content.
3. Run `analyzeNetflixDataset()` function.
4. A new sheet **“Analysis Summary”** will be created with results.

---

## 📁 Dataset Assumptions

The sheet must have these headers:

```
show_id | type | title | director | cast | country | date_added | release_year | rating | duration | listed_in | description
```

Each column must match exactly for accurate results.

---

## 📈 Output

- Clean summary of top items in each category (top 10 shown).
- Ready to create charts and dashboards in Google Sheets.
- Ideal for portfolio projects or practice with real data.

---

## 📎 Files

- `Code.gs` – All-in-one script for data processing
- `README.md` – This file

---

## ✍️ Author

Made with 💻 by **Nikhil Singh**

[GitHub Profile](https://github.com/NikhilSingh-76)

---
