import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../reducers/blogReducer";
import BlogLikeBtn from "./BlogLikeBtn";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

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
    <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
        <Button variant="outlined" onClick={toggleDetails}>
          {showDetails ? "hide" : "view"}
        </Button>
        <BlogLikeBtn blog={blog} />
      </Stack>
      {showDetails && (
        <>
          <p>
            <a href={blog.url}>{blog.url}</a>
          </p>
          <p>likes {blog.likes}</p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button className="remove-btn" onClick={onDelete}>
              remove
            </button>
          )}
        </>
      )}
    </Paper>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
