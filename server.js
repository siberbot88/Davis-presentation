import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import analyticsRoutes from "./src/routes/analytics.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/api/analytics", analyticsRoutes);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.use("/vendor/d3", express.static(path.join(__dirname, "node_modules/d3/dist")));
app.use(express.static(__dirname));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
