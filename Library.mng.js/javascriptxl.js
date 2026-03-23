const XLSX = require("xlsx");

function loadDataset() {
  const workbook = XLSX.readFile("books.xlsx");
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet);

  books = data.map((row, index) => ({
    id: index + 1,
    title: row.title || "Unknown",
    author: row.author || "Unknown",
    genre: row.genre || "General",
    content: row.description || "No content"
  }));
}

// Call this at start
// loadDataset();