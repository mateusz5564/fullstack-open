import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import { addBlog, deleteBlog, likeBlog, setBlogs } from "../reducers/blogReducer";
import { showNotification } from "../reducers/notificationReducer";
import Toggable from "../components/Toggable";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";

const Blogs = () => {
  const user = useSelector(state => state.auth);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const newBlogToggleBtnRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs => dispatch(setBlogs(blogs)));
  }, []);

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  const createBlog = async blog => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
    dispatch(showNotification("success", `a new blog ${newBlog.title} by ${newBlog.author} added`));
    newBlogToggleBtnRef.current.toggleVisibility();
  };

  const handleLikeBlog = async blog => {
    const updatedBlog = await blogService.update(blog);
    dispatch(showNotification("success", `you liked ${updatedBlog.title} by ${updatedBlog.author}`));
    dispatch(likeBlog(updatedBlog));
  };

  const handleDeleteBlog = async blog => {
    await blogService.remove(blog.id);
    dispatch(deleteBlog(blog));
  };

  const blogsList = () => {
    return (
      <div id="blogs-list">
        {sortedBlogs.map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeBlog={handleLikeBlog}
            handleDeleteBlog={handleDeleteBlog}
            user={user}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Toggable ref={newBlogToggleBtnRef} label="new blog">
        <BlogForm createBlog={createBlog} />
      </Toggable>
      {blogsList()}
    </>
  );
};

export default Blogs;
