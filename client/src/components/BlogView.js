import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import '../styles/BlogView.css';

const BlogView = () => {
  const { id } = useParams();
  const { currentBlog, fetchBlogById, loading } = useContext(BlogContext);

  useEffect(() => {
    if (id) {
      fetchBlogById(id);
    }
  }, [id, fetchBlogById]);

  if (loading) {
    return <div className="loading">Loading blog...</div>;
  }

  return (
    <div className="blog-view">
      <div className="blog-view-header">
        <Link to="/" className="back-link">
          &larr; Back to Blogs
        </Link>
        <Link to={`/edit/${id}`} className="btn btn-secondary">
          Edit
        </Link>
      </div>

      <article className="blog-content">
        <h1>{currentBlog.title}</h1>
        
        <div className="blog-meta">
          <div className="blog-tags">
            {currentBlog.tags && currentBlog.tags.split(',').map((tag, index) => (
              <span key={index} className="tag">
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
        
        <div className="blog-body">
          {currentBlog.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogView;
