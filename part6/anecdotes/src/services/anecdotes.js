import axios from "axios";

const baseUrl = "http://localhost:3001";

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`);
  return response.data;
};

const postAnecdote = async content => {
  const response = await axios.post(`${baseUrl}/anecdotes`, { content, votes: 0 });
  return response.data;
};

const voteForAnecdote = async anecdote => {
  const response = await axios.patch(`${baseUrl}/anecdotes/${anecdote.id}`, {votes: anecdote.votes + 1});
  return response.data;
};

export default { voteForAnecdote, postAnecdote, getAll };
