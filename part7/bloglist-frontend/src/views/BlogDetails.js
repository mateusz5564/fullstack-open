import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addNewComment, getAllBlogs } from "../reducers/blogReducer";
import BlogLikeBtn from "../components/BlogLikeBtn";

const Blog = () => {
  const [comment, setComment] = useState("");
  const blogs = useSelector(state => state.blogs);
  const params = useParams();
  const dispatch = useDispatch();

  const blog = blogs.find(blog => blog.id === params.blogId);

  useEffect(() => {
    if (!blog) {
      dispatch(getAllBlogs());
    }
  }, []);

  const handleAddComment = e => {
    e.preventDefault();
    dispatch(addNewComment(blog.id, comment));
    setComment("");
  };

  if (blogs.length > 0 && !blog) {
    return <div>Blog not found</div>;
  }

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <BlogLikeBtn blog={blog} />
      </p>
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="add your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
