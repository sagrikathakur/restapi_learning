import express from "express";
import dotenv from "dotenv";
import stoneRoutes from "./routes/stoneRoutes.js";
import veggieRoutes from "./routes/veggieRoutes.js";

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
app.use("/veggies", veggieRoutes);

// Error-handling middleware for invalid/empty JSON request bodies
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON format. Please check your request body.",
    });
  }
  next();
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

export default app;