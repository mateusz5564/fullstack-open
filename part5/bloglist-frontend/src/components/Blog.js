import { useState } from "react";

const Blog = ({ blog, likeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
        </>
      )}
    </div>
  );
};

export default Blog;
