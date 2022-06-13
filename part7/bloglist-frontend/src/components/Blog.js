import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, user, remove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      remove(blog);
    }
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      <button onClick={() => likeBlog(blog)} className="like-btn">
        like
      </button>
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button className="remove-btn" onClick={handleDelete}>
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
  likeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Blog;
