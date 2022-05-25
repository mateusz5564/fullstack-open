import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const config = {
  headers: { Authorization: token },
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newBlog => {
  const request = axios.post(baseUrl, newBlog, config);
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
    config
  );
  return request.then(response => response.data);
};

export default { create, getAll, setToken, update };
