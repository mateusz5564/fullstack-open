import axios from "axios";

const baseUrl = "http://localhost:3001";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`);
  return response.data;
};

const createAnecdote = async content => {
  const response = await axios.post(`${baseUrl}/anecdotes`, { content, votes: 0 });
  return response.data;
};

export default { createAnecdote, getAll };
