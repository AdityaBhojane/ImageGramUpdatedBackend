# ImageGram Updated Backend

This is the backend server for the **ImageGram** project, a social media application that allows users to upload and share images, post comments, and interact with content. The backend is built with **Node.js**, **Express**, and **MongoDB** to provide RESTful API endpoints for user authentication, image management, comments, and posts.

## Features
- **User Authentication**: Sign up and sign-in functionality for users.
- **Post Creation**: Create posts with image upload functionality.
- **Comment System**: Add comments to posts, with the ability to reply to existing comments (nested comment system).
- **MongoDB Integration**: All data is stored in a MongoDB database, including user information, posts, and comments.
- **Express API**: RESTful API endpoints to manage users, posts, and comments.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (either local or MongoDB Atlas)
- Postman or similar API testing tool

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AdityaBhojane/ImageGramUpdatedBackend.git
   cd ImageGramUpdatedBackend
   npm install
   npm run start ( run command )
   ```
## Create a .env file at the root of the project and add your environment variables:
```bash
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-jwt-secret>
```

### API Endpoints
1) User Sign Up
    - POST /api/v1/users/signup
    - Request Body: { "username": "string", "email": "string", "password": "string" }
    - Description: Register a new user.

2) User Sign In
    - POST /api/v1/users/signin
    - Request Body: { "email": "string", "password": "string" }
    - Description: Sign in an existing user and receive a JWT token.

3) Create Post
    - POST /api/v1/posts
    - Request Body: { "title": "string", "imageUrl": "string", "content": "string" }
    - Description: Create a new post with an image.

4) Add Comment
    - POST /api/v1/comment
    - Request Body: { "onModel": "post|comment", "commentableId": "string", "content": "string" }
    - Description: Add a comment to a post or another comment.

### Technologies Used
- Node.js: JavaScript runtime for building the backend server.
- Express: Web framework for Node.js.
- MongoDB: NoSQL database for storing user, post, and comment data.
- JWT (JSON Web Tokens): For secure authentication.
- Mongoose: MongoDB object modeling for Node.js.


### Contributing
- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Commit your changes (git commit -m 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Create a new Pull Request.