const Blog = require('../models/Blog');

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updated_at: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save or update draft
exports.saveDraft = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    
    // If id exists, update the existing draft
    if (id) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { 
          title, 
          content, 
          tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
          status: 'draft',
          updated_at: Date.now()
        },
        { new: true }
      );
      
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      
      return res.status(200).json(updatedBlog);
    }
    
    // Create a new draft
    const newBlog = new Blog({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: 'draft'
    });
    
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Publish blog
exports.publishBlog = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    
    // If id exists, update the existing blog and publish it
    if (id) {
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        { 
          title, 
          content, 
          tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
          status: 'published',
          updated_at: Date.now()
        },
        { new: true }
      );
      
      if (!updatedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      
      return res.status(200).json(updatedBlog);
    }
    
    // Create a new published blog
    const newBlog = new Blog({
      title,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      status: 'published'
    });
    
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
