please do the following steps:

1. install dependencies
2. run `node server.js` to start the server
3. run `npm run dev` to start the server in development mode

put your neon credentials and PORT in .env
create your .gitignore file and add `node_modules` and .env to it

Create a Blog Post
POST http://localhost:3000/api/v1/BlogPosts

Fetch All Blog Posts
GET http://localhost:3000/api/v1/BlogPosts

Fetch a Single Blog Post
GET http://localhost:3000/api/v1/BlogPosts/:id

Update a Blog Post
PUT http://localhost:3000/api/v1/BlogPosts/:id

Delete a Blog Post
DELETE http://localhost:3000/api/v1/BlogPosts/:id

Delete All Blog Posts
DELETE http://localhost:3000/api/v1/BlogPosts
