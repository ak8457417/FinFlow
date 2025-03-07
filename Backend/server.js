// import express from "express";
// import cors from "cors";
// import { MongoClient } from "mongodb";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";
//
// dotenv.config();
// const app = express();
// const PORT = 5000;
//
// // Middleware
// app.use(cors());
// app.use(express.json());
//
// // MongoDB Connection
// const mongoURI = process.env.MONGO_URI;
// const dbName = process.env.DB_NAME;
// const collectionName = process.env.COLLECTION_NAME;
// let collection;
//
// async function connectDB() {
//     try {
//         const client = new MongoClient(mongoURI);
//         await client.connect();
//         console.log("✅ Connected to MongoDB");
//         const db = client.db(dbName);
//         collection = db.collection(collectionName);
//     } catch (error) {
//         console.error("❌ MongoDB connection error:", error);
//         process.exit(1);
//     }
// }
//
//
// // Gemini AI Initialization
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
//
// // Root Route
// app.get("/", (req, res) => {
//     res.send("🚀 Financial Advisor API is running!");
// });
//
// // API Route
// app.post("/api/generate-plan", async (req, res) => {
//     const { name, income, expenses, goal_description, goal_amount, timeframe } = req.body;
//
//     if (!name || !income || !expenses || !goal_description || !goal_amount || !timeframe) {
//         return res.status(400).json({ error: "All fields are required." });
//     }
//
//     const prompt = `
//     You are a financial advisor. Generate a detailed financial plan for ${name}:
//     - Monthly Income: ₹${income}
//     - Monthly Expenses: ₹${expenses}
//     - Goal: ${goal_description}
//     - Goal Amount: ₹${goal_amount}
//     - Timeframe: ${timeframe} years
//     `;
//
//     try {
//         const response = await model.generateContent(prompt);
//         const plan = response.response.candidates[0].content.parts[0].text; // ✅ Fixed response handling
//
//         const monthly_savings_needed = goal_amount / (timeframe * 12);
//
//         const data = {
//             name,
//             income,
//             expenses,
//             goal_description,
//             goal_amount,
//             timeframe,
//             monthly_saving_amount: monthly_savings_needed,
//             financial_plan: plan,
//         };
//
//         await collection.insertOne(data);
//         res.json(data);
//     } catch (error) {
//         console.error("❌ Error generating financial plan:", error);
//         res.status(500).json({ error: "Error generating financial plan." });
//     }
// });
//
// app.get("/api/get-plans", async (req, res) => {
//     try {
//         const plans = await collection.find().toArray(); // Retrieve all records
//         res.json(plans); // Send the array of plans as the response
//     } catch (error) {
//         console.error("❌ Error fetching financial plans:", error);
//         res.status(500).json({ error: "Error fetching financial plans." });
//     }
// });
//
// // Start Server After DB Connection
// async function startServer() {
//     await connectDB();
//     app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
// }
//
// startServer();


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import botRoutes from "./routes/botRoute.js";
// import taxRoutes from "./routes/taxRoute.js";
import userRoutes from "./routes/userRoute.js";
import finRoutes from "./routes/finRoute.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


// Database Connection
// connectDB();

// Routes
app.use("/user/api", userRoutes);
// Routes
app.use('/api/financial', finRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/final')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Root Route
app.get("/", (req, res) => {
    res.send("🚀 Financial Advisor API is running!");
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
