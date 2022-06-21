import axios from "axios";
import authHeader from "./authHeader";

const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const getOne = id => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

const create = newBlog => {
  const request = axios.post(baseUrl, newBlog, {
    headers: authHeader(),
  });
  return request.then(response => response.data);
};

const update = blogToUpdate => {
  const {
    id,
    user: { id: user },
    likes,
    author,
    title,
    url,
  } = blogToUpdate;

  const request = axios.put(
    `${baseUrl}/${id}`,
    { user, likes: likes + 1, author, title, url },
    {
      headers: authHeader(),
    }
  );
  return request.then(response => response.data);
};

const addComment = (id, content) => {
  const request = axios.post(
    `${baseUrl}/${id}/comments`,
    { content },
    {
      headers: authHeader(),
    }
  );
  return request.then(response => response.data);
};

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: authHeader(),
  });
  return request.then(response => response.data);
};

export default { addComment, create, getAll, getOne, remove, update };
