# Blog Editor Application

A full-stack MERN application that allows users to write, edit, save, and publish blogs with an auto-save draft feature.

## Features

- Blog Editor with title, content, and tags fields
- Save as Draft functionality
- Publish functionality
- Auto-Save Draft (every 5 seconds of inactivity)
- Display list of All Blogs (published & drafts separately)
- Edit and update existing drafts/posts

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **State Management**: React Context API
- **Styling**: CSS

## Project Structure

```
blogsite/
├── client/             # Frontend React application
└── server/             # Backend Express application
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory with the following content:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/blogsite
   ```

4. Start the server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and go to `http://localhost:3000`

## API Endpoints

- `POST /api/blogs/save-draft` - Save or update a draft
- `POST /api/blogs/publish` - Save and publish an article
- `GET /api/blogs` - Retrieve all blogs
- `GET /api/blogs/:id` - Retrieve a blog by ID
