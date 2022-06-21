import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllBlogs } from "../reducers/blogReducer";
import BlogLikeBtn from "../components/BlogLikeBtn";

const Blog = () => {
  const blogs = useSelector(state => state.blogs);
  const params = useParams();
  const dispatch = useDispatch();

  const blog = blogs.find(blog => blog.id === params.blogId);

  useEffect(() => {
    if (!blog) {
      dispatch(getAllBlogs());
    }
  }, []);

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
    </div>
  );
};

export default Blog;
