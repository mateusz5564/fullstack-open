import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import Button from "@mui/material/Button";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

const BlogLikeBtn = ({ blog }) => {
  const dispatch = useDispatch();

  const handleLikeBlog = blog => {
    dispatch(likeBlog(blog));
  };

  return (
    <Button
      variant="contained"
      startIcon={<ThumbUpOffAltIcon />}
      onClick={() => handleLikeBlog(blog)}
      className="like-btn"
    >
      like
    </Button>
  );
};

export default BlogLikeBtn;
