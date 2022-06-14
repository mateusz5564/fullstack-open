import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleLikeBlog, user, handleDeleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDeleteBlog(blog);
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      <button onClick={() => handleLikeBlog(blog)} className="like-btn">
        like
      </button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button className="remove-btn" onClick={onDelete}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
};

export default Blog;
