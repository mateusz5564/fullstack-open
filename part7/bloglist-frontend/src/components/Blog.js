import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import BlogLikeBtn from "./BlogLikeBtn";

const Blog = ({ blog, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDeleteBlog = blog => {
    dispatch(deleteBlog(blog));
  };

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDeleteBlog(blog);
    }
  };

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
      <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      <BlogLikeBtn blog={blog} />
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
  user: PropTypes.object.isRequired,
};

export default Blog;
