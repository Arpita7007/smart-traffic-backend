# 🚦 Smart Traffic Management System (Backend)

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-Framework-blue)
![Status](https://img.shields.io/badge/Project-Working-brightgreen)

---

## 📌 Project Overview

The Smart Traffic Management System is a backend prototype designed to simulate real-time traffic monitoring and intelligent traffic signal control.

It uses simulated camera inputs and AI-based logic to:

* Detect vehicles
* Calculate traffic density
* Dynamically adjust signal timings
* Prioritize emergency vehicles

This project demonstrates how smart city systems can improve traffic efficiency and reduce congestion.

---

## 🚀 Features

* 📸 Real-time traffic monitoring (simulated)
* 🚗 Vehicle detection & counting (mock AI)
* 📊 Traffic density classification (Low / Medium / High)
* 🚦 Dynamic signal timing system
* 🚑 Emergency vehicle prioritization
* 📈 Traffic analytics dashboard
* 🔄 Auto real-time updates every 10 seconds

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Multer (file upload handling)
* REST API architecture
* In-memory database
* JavaScript (ES6)

---

## 📂 Project Structure

smart-traffic-backend/
│── server.js
│── package.json
│── package-lock.json
│── .gitignore
│── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

git clone https://github.com/Arpita7007/smart-traffic-backend.git
cd smart-traffic-backend

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Run Server

node server.js

### 🌐 Server runs at:

http://localhost:3000

---

## 📡 API Endpoints

### 🔹 Upload Traffic Data

POST /upload

Body (form-data):

* file → image/video
* intersectionId → A1 / B1

---

### 🔹 Get Traffic Data

GET /traffic/:intersectionId

---

### 🔹 Update Signal Timing

POST /signal/update

Body:
{
"intersectionId": "A1",
"timing": 50
}

---

### 🔹 Emergency Vehicle Priority

POST /emergency

Body:
{
"intersectionId": "A1"
}

---

### 🔹 Dashboard Analytics

GET /dashboard

---

## 🧠 How It Works

1. Camera input is simulated via uploads
2. Vehicles are detected using mock AI logic
3. Traffic density is calculated
4. Signal timing is adjusted dynamically
5. Emergency vehicles override signals
6. System updates every 10 seconds

---

## 🧪 Testing

* Use Postman for API testing
* Use browser:

  * http://localhost:3000/traffic/A1
  * http://localhost:3000/dashboard

---

## 🔮 Future Enhancements

* Real AI integration (OpenCV / YOLO)
* MongoDB database integration
* Frontend dashboard (React)
* WebSockets for real-time updates
* Cloud deployment (AWS / Render)

---

## 👩‍💻 Author

Arpita Sharma

---

## ⭐ Project Status

✅ Completed (Prototype)
🚀 Ready for demo and presentation
