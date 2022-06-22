import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    handleCreateBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <Stack alignItems="flex-start" mb={2}>
          <TextField
            label="title"
            data-testid="title-input"
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />

          <TextField
            label="author"
            data-testid="author-input"
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />

          <TextField
            label="url"
            data-testid="url-input"
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Stack>
        <Button variant="contained" data-testid="add-blog-button" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
