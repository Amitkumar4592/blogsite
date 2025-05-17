import React, { createContext, useState, useEffect, useCallback } from 'react';

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [currentBlog, setCurrentBlog] = useState({
    id: '',
    title: '',
    content: '',
    tags: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');

  // Fetch all blogs
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      const data = await response.json();
      setBlogs(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a blog by ID
  const fetchBlogById = useCallback(async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
      const data = await response.json();
      setCurrentBlog({
        id: data._id,
        title: data.title,
        content: data.content,
        tags: data.tags.join(', '),
        status: data.status
      });
      setError(null);
    } catch (error) {
      setError('Failed to fetch blog');
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save draft
  const saveDraft = useCallback(async (blog) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs/save-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
      });
      const data = await response.json();
      
      // Update current blog with the saved data
      setCurrentBlog({
        id: data._id,
        title: data.title,
        content: data.content,
        tags: data.tags.join(', '),
        status: data.status
      });
      
      // Update blogs list if the blog is new
      if (!blog.id) {
        setBlogs(prevBlogs => [data, ...prevBlogs]);
      } else {
        // Update the blog in the list if it already exists
        setBlogs(prevBlogs => 
          prevBlogs.map(b => b._id === data._id ? data : b)
        );
      }
      
      setError(null);
      return data;
    } catch (error) {
      setError('Failed to save draft');
      console.error('Error saving draft:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Publish blog
  const publishBlog = useCallback(async (blog) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(blog)
      });
      const data = await response.json();
      
      // Update current blog with the published data
      setCurrentBlog({
        id: data._id,
        title: data.title,
        content: data.content,
        tags: data.tags.join(', '),
        status: data.status
      });
      
      // Update blogs list if the blog is new
      if (!blog.id) {
        setBlogs(prevBlogs => [data, ...prevBlogs]);
      } else {
        // Update the blog in the list if it already exists
        setBlogs(prevBlogs => 
          prevBlogs.map(b => b._id === data._id ? data : b)
        );
      }
      
      setError(null);
      return data;
    } catch (error) {
      setError('Failed to publish blog');
      console.error('Error publishing blog:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-save draft
  const autoSaveDraft = useCallback(async (blog) => {
    if (!blog.title && !blog.content) return null;
    
    try {
      setAutoSaveStatus('Saving...');
      const savedBlog = await saveDraft(blog);
      setAutoSaveStatus('Saved');
      
      // Reset auto-save status after 3 seconds
      setTimeout(() => {
        setAutoSaveStatus('');
      }, 3000);
      
      return savedBlog;
    } catch (error) {
      setAutoSaveStatus('Failed to save');
      console.error('Error auto-saving draft:', error);
      return null;
    }
  }, [saveDraft]);

  // Reset current blog
  const resetCurrentBlog = useCallback(() => {
    setCurrentBlog({
      id: '',
      title: '',
      content: '',
      tags: '',
      status: 'draft'
    });
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <BlogContext.Provider
      value={{
        blogs,
        currentBlog,
        loading,
        error,
        autoSaveStatus,
        setCurrentBlog,
        fetchBlogs,
        fetchBlogById,
        saveDraft,
        publishBlog,
        autoSaveDraft,
        resetCurrentBlog
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
