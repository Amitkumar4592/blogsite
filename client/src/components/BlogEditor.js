import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import '../styles/BlogEditor.css';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    currentBlog,
    setCurrentBlog,
    fetchBlogById,
    saveDraft,
    publishBlog,
    autoSaveDraft,
    resetCurrentBlog,
    autoSaveStatus
  } = useContext(BlogContext);

  const [typingTimeout, setTypingTimeout] = useState(null);

  // Fetch blog if ID is provided
  useEffect(() => {
    if (id) {
      fetchBlogById(id);
    } else {
      resetCurrentBlog();
    }
  }, [id, fetchBlogById, resetCurrentBlog]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentBlog(prev => ({ ...prev, [name]: value }));

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout for auto-save
    const newTimeout = setTimeout(() => {
      autoSaveDraft({
        id: currentBlog.id,
        title: currentBlog.title,
        content: name === 'content' ? value : currentBlog.content,
        tags: currentBlog.tags
      });
    }, 5000); // Auto-save after 5 seconds of inactivity

    setTypingTimeout(newTimeout);
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentBlog.title || currentBlog.content) {
        autoSaveDraft(currentBlog);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [currentBlog, autoSaveDraft]);

  // Handle save draft
  const handleSaveDraft = async () => {
    if (!currentBlog.title && !currentBlog.content) {
      alert('Please add a title or content before saving');
      return;
    }

    const savedBlog = await saveDraft(currentBlog);
    if (savedBlog && !currentBlog.id) {
      navigate(`/edit/${savedBlog._id}`);
    }
  };

  // Handle publish
  const handlePublish = async () => {
    if (!currentBlog.title || !currentBlog.content) {
      alert('Please add both title and content before publishing');
      return;
    }

    const publishedBlog = await publishBlog(currentBlog);
    if (publishedBlog) {
      navigate('/');
    }
  };

  return (
    <div className="blog-editor">
      <div className="editor-header">
        <h2>{id ? 'Edit Blog' : 'Create New Blog'}</h2>
        <div className="auto-save-status">
          {autoSaveStatus && <span>{autoSaveStatus}</span>}
        </div>
      </div>

      <div className="editor-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={currentBlog.title}
            onChange={handleInputChange}
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={currentBlog.content}
            onChange={handleInputChange}
            placeholder="Write your blog content here..."
            rows="15"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={currentBlog.tags}
            onChange={handleInputChange}
            placeholder="tag1, tag2, tag3"
          />
        </div>

        <div className="editor-actions">
          <button 
            className="btn btn-secondary" 
            onClick={handleSaveDraft}
          >
            Save as Draft
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
