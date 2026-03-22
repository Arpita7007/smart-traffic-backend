/**
 * SMART TRAFFIC MANAGEMENT SYSTEM (Prototype Backend)
 * Tech: Node.js + Express
 * Database: In-memory (for simplicity)
 */

const express = require("express");
const multer = require("multer");
const app = express();

app.use(express.json());

// ============================
// In-Memory Database
// ============================
const db = {
  intersections: {},
  signalLogs: [],
  emergencyEvents: []
};

// Sample Intersections
["A1", "B1"].forEach(id => {
  db.intersections[id] = {
    id,
    vehicleCount: 0,
    density: "LOW",
    signalTiming: 30,
    history: []
  };
});
// ============================
// File Upload Setup
// ============================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ============================
// Utility Functions
// ============================

/**
 * Mock Vehicle Detection (Simulates AI)
 */
function detectVehicles(fileBuffer) {
  // Simulate detection using random numbers
  return Math.floor(Math.random() * 50); // 0–50 vehicles
}

/**
 * Calculate Traffic Density
 */
function calculateDensity(count) {
  if (count < 10) return "LOW";
  if (count < 30) return "MEDIUM";
  return "HIGH";
}

/**
 * Dynamic Signal Timing Logic
 */
function calculateSignalTiming(density) {
  switch (density) {
    case "LOW": return 20;
    case "MEDIUM": return 40;
    case "HIGH": return 60;
    default: return 30;
  }
}

/**
 * Update Intersection Data
 */
function updateIntersection(id, count) {
  const intersection = db.intersections[id];
  if (!intersection) return null;

  intersection.vehicleCount = count;
  intersection.density = calculateDensity(count);
  intersection.signalTiming = calculateSignalTiming(intersection.density);

  intersection.history.push({
    time: new Date(),
    count
  });

  // Log signal update
  db.signalLogs.push({
    intersectionId: id,
    timing: intersection.signalTiming,
    time: new Date()
  });

  return intersection;
}

// ============================
// APIs
// ============================

/**
 * POST /upload
 * Upload image/video & process traffic
 */
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const { intersectionId } = req.body;

    if (!intersectionId || !db.intersections[intersectionId]) {
      return res.status(400).json({ error: "Invalid intersectionId" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const vehicleCount = detectVehicles(req.file.buffer);
    const updated = updateIntersection(intersectionId, vehicleCount);

    res.json({
      message: "Traffic processed",
      data: updated
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /traffic/:intersectionId
 * Get traffic data
 */
app.get("/traffic/:intersectionId", (req, res) => {
  const intersection = db.intersections[req.params.intersectionId];

  if (!intersection) {
    return res.status(404).json({ error: "Intersection not found" });
  }

  res.json(intersection);
});

/**
 * POST /signal/update
 * Manually update signal timing
 */
app.post("/signal/update", (req, res) => {
  const { intersectionId, timing } = req.body;

  const intersection = db.intersections[intersectionId];
  if (!intersection) {
    return res.status(404).json({ error: "Intersection not found" });
  }

  intersection.signalTiming = timing;

  db.signalLogs.push({
    intersectionId,
    timing,
    time: new Date()
  });

  res.json({ message: "Signal updated", intersection });
});

/**
 * POST /emergency
 * Trigger emergency vehicle priority
 */
app.post("/emergency", (req, res) => {
  const { intersectionId } = req.body;

  const intersection = db.intersections[intersectionId];
  if (!intersection) {
    return res.status(404).json({ error: "Intersection not found" });
  }

  // Override signal to max green
  intersection.signalTiming = 90;

  const event = {
    intersectionId,
    time: new Date(),
    priority: "EMERGENCY"
  };

  db.emergencyEvents.push(event);

  res.json({
    message: "Emergency priority activated",
    event
  });
});

/**
 * GET /dashboard
 * Analytics Data
 */
app.get("/dashboard", (req, res) => {
  const analytics = Object.values(db.intersections).map(i => ({
    id: i.id,
    totalVehicles: i.history.reduce((sum, h) => sum + h.count, 0),
    density: i.density,
    currentSignal: i.signalTiming
  }));

  res.json({
    intersections: analytics,
    signalLogs: db.signalLogs,
    emergencyEvents: db.emergencyEvents
  });
});

// ============================
// Real-Time Simulation
// ============================
setInterval(() => {
  Object.keys(db.intersections).forEach(id => {
    const randomCount = Math.floor(Math.random() * 50);
    updateIntersection(id, randomCount);
  });

  console.log("🔄 Real-time traffic updated...");
}, 10000); // every 10 sec

// ============================
// Start Server
// ============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});