import express, {json} from 'express';
import dotenv from "dotenv";

import blogPostsRoutes from './routes/blogPostsRoutes.js';

import {createBlogSchema} from './database/createBlogSchema.js';

dotenv.config();
const app = express();
app.use(json());

app.use("/api/v1/BlogPosts", blogPostsRoutes);
// Connect to the database
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get("*", (req, res) => { 
    res.status(404).json({ error: "Not found" });
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    createBlogSchema();  // Create BlogPosts table if it doesn't exist
    
})
