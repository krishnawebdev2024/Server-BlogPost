import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import blogPostsRoutes from "./routes/blogPostsRoutes.js";

import { createBlogSchema } from "./database/createBlogSchema.js";

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(json());

app.use("/api/v1/BlogPosts", blogPostsRoutes);
// Connect to the database
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  createBlogSchema(); // Create BlogPosts table if it doesn't exist
});
