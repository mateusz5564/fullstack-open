import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newBlog => {
  console.log(token);
  const request = axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
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
      headers: { Authorization: token },
    }
  );
  return request.then(response => response.data);
};

const remove = id => {
  const request = axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  });
  return request.then(response => response.data);
};

export default { create, getAll, remove, setToken, update };
