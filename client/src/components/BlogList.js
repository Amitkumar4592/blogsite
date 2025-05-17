import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import '../styles/BlogList.css';

const BlogList = () => {
  const { blogs, fetchBlogs, loading } = useContext(BlogContext);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Separate blogs into published and drafts
  const publishedBlogs = blogs.filter(blog => blog.status === 'published');
  const draftBlogs = blogs.filter(blog => blog.status === 'draft');

  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  return (
    <div className="blog-list-container">
      <div className="blog-list-header">
        <h2>My Blogs</h2>
        <Link to="/create" className="btn btn-primary">
          Create New Blog
        </Link>
      </div>

      <div className="blog-sections">
        {/* Published Blogs Section */}
        <div className="blog-section">
          <h3>Published Blogs</h3>
          {publishedBlogs.length === 0 ? (
            <p className="no-blogs">No published blogs yet.</p>
          ) : (
            <div className="blogs-grid">
              {publishedBlogs.map(blog => (
                <div key={blog._id} className="blog-card published">
                  <h4>{blog.title}</h4>
                  <p className="blog-excerpt">
                    {blog.content.substring(0, 100)}
                    {blog.content.length > 100 ? '...' : ''}
                  </p>
                  <div className="blog-tags">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="blog-meta">
                    <span>Published: {new Date(blog.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div className="blog-actions">
                    <Link to={`/edit/${blog._id}`} className="btn btn-secondary">
                      Edit
                    </Link>
                    <Link to={`/view/${blog._id}`} className="btn btn-primary">
                      View
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Draft Blogs Section */}
        <div className="blog-section">
          <h3>Draft Blogs</h3>
          {draftBlogs.length === 0 ? (
            <p className="no-blogs">No drafts available.</p>
          ) : (
            <div className="blogs-grid">
              {draftBlogs.map(blog => (
                <div key={blog._id} className="blog-card draft">
                  <h4>{blog.title || 'Untitled Draft'}</h4>
                  <p className="blog-excerpt">
                    {blog.content.substring(0, 100)}
                    {blog.content.length > 100 ? '...' : ''}
                  </p>
                  <div className="blog-tags">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="blog-meta">
                    <span>Last updated: {new Date(blog.updated_at).toLocaleDateString()}</span>
                  </div>
                  <div className="blog-actions">
                    <Link to={`/edit/${blog._id}`} className="btn btn-primary">
                      Continue Editing
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
