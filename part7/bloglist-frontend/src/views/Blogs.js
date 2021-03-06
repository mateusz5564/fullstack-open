import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, getAllBlogs } from "../reducers/blogReducer";
import Toggable from "../components/Toggable";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";

const Blogs = () => {
  const user = useSelector(state => state.auth);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const newBlogToggleBtnRef = useRef();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const handleCreateBlog = blog => {
    dispatch(createBlog(blog));
    newBlogToggleBtnRef.current.toggleVisibility();
  };

  const blogsList = () => {
    return (
      <div id="blogs-list">
        {sortedBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    );
  };

  return (
    <>
      <Toggable ref={newBlogToggleBtnRef} label="new blog">
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Toggable>
      {blogsList()}
    </>
  );
};

export default Blogs;
