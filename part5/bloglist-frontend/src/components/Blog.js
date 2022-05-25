import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
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
