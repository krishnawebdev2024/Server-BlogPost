import express from 'express';
import { queryDB } from '../database/db.js';

const blogPostsRouter = express.Router();

blogPostsRouter.get('/', async (req, res) => {
    try {
        const blogPosts = await queryDB('SELECT * FROM blog_posts');
        res.json(blogPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({error:'Error retrieving blog posts'});
    }
}); 

blogPostsRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const blogPost = await queryDB('SELECT * FROM blog_posts WHERE id = $1', [id]);
        if (blogPost.length === 0) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json(blogPost[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving blog post' });
    }
});

blogPostsRouter.post('/', async (req, res) => {
    const { date, title, image_url, blogPost } = req.body;
    try {
        const newBlogPost = await queryDB(
            'INSERT INTO blog_posts (date, title, image_url, blogPost) VALUES ($1, $2, $3, $4) RETURNING *',
            [date, title, image_url, blogPost]
        );
        res.json(newBlogPost[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating blog post' });
    }
});

blogPostsRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { date, title, image_url, blogPost } = req.body;
    try {
        const updatedBlogPost = await queryDB(
            'UPDATE blog_posts SET date = $1, title = $2, image_url = $3, blogPost = $4 WHERE id = $5 RETURNING *',
            [date, title, image_url, blogPost, id]
        );
        if (updatedBlogPost.length === 0) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json(updatedBlogPost[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating blog post' });
    }
});

blogPostsRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlogPost = await queryDB(
            'DELETE FROM blog_posts WHERE id = $1 RETURNING *',
            [id]
        );
        if (deletedBlogPost.length === 0) {
            res.status(404).json({ error: 'Blog post not found' });
        } else {
            res.json(deletedBlogPost[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting blog post' });
    }
});

//delete all the contents from the table
blogPostsRouter.delete('/', async (req, res) => {
    try {
        const deletedBlogPosts = await queryDB('DELETE FROM blog_posts');
        res.json(deletedBlogPosts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting blog posts' });
    }
});

// Error handling for invalid IDs
blogPostsRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ error: 'Invalid ID' });
    }
    next();
});

// Error handling for invalid requests


// Export the router

export default blogPostsRouter;