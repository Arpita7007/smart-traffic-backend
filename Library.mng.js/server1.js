// ===============================
// 📚 Library Management Backend
// ===============================

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ===============================
// 🧠 In-Memory Database
// ===============================

let users = [];
let books = [];
let dictionary = [];
let readingSessions = [];

// ===============================
// 📦 Sample Data (Replace with dataset later)
// ===============================

books = [
  {
    id: 1,
    title: "The AI Revolution",
    author: "John Smith",
    genre: "Technology",
    content: "Artificial intelligence is transforming the world..."
  },
  {
    id: 2,
    title: "Mystery of the Night",
    author: "Jane Doe",
    genre: "Mystery",
    content: "It was a dark and stormy night..."
  },
  {
    id: 3,
    title: "Learning Node.js",
    author: "Dev Guru",
    genre: "Programming",
    content: "Node.js is a powerful runtime environment..."
  }
];

users = [
  {
    id: 1,
    name: "Arpita",
    preferences: ["Technology", "Programming"],
    readingHistory: [1]
  }
];

// ===============================
// 🛠️ Utility Functions
// ===============================

// Recommendation Logic
function recommendBooks(userId) {
  const user = users.find(u => u.id == userId);
  if (!user) return [];

  return books.filter(book =>
    user.preferences.includes(book.genre) &&
    !user.readingHistory.includes(book.id)
  );
}

// Simple Summary (truncate)
function summarize(text) {
  return text.split(" ").slice(0, 20).join(" ") + "...";
}

// Chat with Book (keyword matching)
function chatWithBook(bookId, question) {
  const book = books.find(b => b.id == bookId);
  if (!book) return "Book not found";

  if (question.toLowerCase().includes("ai")) {
    return "This book discusses artificial intelligence concepts.";
  }

  if (question.toLowerCase().includes("story")) {
    return "This book contains an engaging storyline.";
  }

  return "Sorry, I don't have an answer for that.";
}

// ===============================
// 👤 User Routes (CRUD)
// ===============================

app.get("/users", (req, res) => res.json(users));

app.post("/users", (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  users = users.map(u =>
    u.id == req.params.id ? { ...u, ...req.body } : u
  );
  res.json({ message: "User updated" });
});

app.delete("/users/:id", (req, res) => {
  users = users.filter(u => u.id != req.params.id);
  res.json({ message: "User deleted" });
});

// ===============================
// 📖 Book Routes (CRUD)
// ===============================

app.get("/books", (req, res) => res.json(books));

app.post("/books", (req, res) => {
  const book = { id: Date.now(), ...req.body };
  books.push(book);
  res.json(book);
});

app.put("/books/:id", (req, res) => {
  books = books.map(b =>
    b.id == req.params.id ? { ...b, ...req.body } : b
  );
  res.json({ message: "Book updated" });
});

app.delete("/books/:id", (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.json({ message: "Book deleted" });
});

// ===============================
// 🤖 Recommendation API
// ===============================

app.get("/recommend/:userId", (req, res) => {
  const recs = recommendBooks(req.params.userId);
  res.json(recs);
});

// ===============================
// 📚 Personalized Dictionary (CRUD)
// ===============================

app.get("/dictionary/:userId", (req, res) => {
  const userWords = dictionary.filter(d => d.userId == req.params.userId);
  res.json(userWords);
});

app.post("/dictionary", (req, res) => {
  const entry = { id: Date.now(), ...req.body };
  dictionary.push(entry);
  res.json(entry);
});

app.put("/dictionary/:id", (req, res) => {
  dictionary = dictionary.map(d =>
    d.id == req.params.id ? { ...d, ...req.body } : d
  );
  res.json({ message: "Updated" });
});

app.delete("/dictionary/:id", (req, res) => {
  dictionary = dictionary.filter(d => d.id != req.params.id);
  res.json({ message: "Deleted" });
});

// ===============================
// 💬 Chat with Book
// ===============================

app.post("/chat", (req, res) => {
  const { bookId, question } = req.body;
  const answer = chatWithBook(bookId, question);
  res.json({ answer });
});

// ===============================
// 📝 Auto Summary
// ===============================

app.post("/summary", (req, res) => {
  const { text } = req.body;
  const summary = summarize(text);
  res.json({ summary });
});

// ===============================
// 🔊 Text-to-Speech (Mock)
// ===============================

app.post("/tts", (req, res) => {
  const { text } = req.body;

  // Mock response (real TTS can use gtts, say.js etc.)
  res.json({
    message: "TTS generated",
    audioUrl: "https://example.com/audio.mp3",
    text
  });
});

// ===============================
// 📊 Reading Analytics
// ===============================

app.post("/reading-session", (req, res) => {
  const session = { id: Date.now(), ...req.body };
  readingSessions.push(session);
  res.json(session);
});

app.get("/analytics/:userId", (req, res) => {
  const sessions = readingSessions.filter(
    s => s.userId == req.params.userId
  );

  const totalTime = sessions.reduce((sum, s) => sum + s.timeSpent, 0);
  const booksCompleted = [...new Set(sessions.map(s => s.bookId))].length;

  res.json({
    totalTimeSpent: totalTime,
    booksCompleted
  });
});

// ===============================
// ⚠️ Error Handling Middleware
// ===============================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ===============================
// 🚀 Server Start
// ===============================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});