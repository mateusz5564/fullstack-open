import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";

const BlogLikeBtn = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLikeBlog = blog => {
    dispatch(likeBlog(blog));
  };

  return (
    <button onClick={() => handleLikeBlog(blog)} className="like-btn">
      like
    </button>
  );
};

export default BlogLikeBtn;
