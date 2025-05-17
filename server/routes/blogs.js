const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Get all blogs
router.get('/', blogController.getBlogs);

// Get blog by ID
router.get('/:id', blogController.getBlogById);

// Save or update draft
router.post('/save-draft', blogController.saveDraft);

// Publish blog
router.post('/publish', blogController.publishBlog);

module.exports = router;
