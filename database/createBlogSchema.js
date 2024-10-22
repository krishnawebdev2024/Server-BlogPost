import { queryDB } from './db.js';

// Function to create BlogPosts table if it doesn't exist
export const createBlogSchema = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blog_posts (
            id SERIAL PRIMARY KEY,         
            date TIMESTAMP NOT NULL,       
            title VARCHAR(255) NOT NULL,   
            image_url TEXT,                
            blogPost TEXT NOT NULL         
        );
    `;

    try {
        await queryDB(createTableQuery);
        console.log('BlogPosts table is ready.');
    } catch (err) {
        console.error('Error creating BlogPosts table:', err);
    }
};
