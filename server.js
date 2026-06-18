import express from "express";
import dotenv from "dotenv";
import stoneRoutes from "./routes/stoneRoutes.js";

dotenv.config();

// server instance
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// basic route
app.get("/", (req, res) => {
  res.send("server is ");
});

// API Routes
app.use("/stones", stoneRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;