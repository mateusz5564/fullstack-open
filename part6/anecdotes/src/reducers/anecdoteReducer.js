import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    voteForAnecdote(state, action) {
      const anecdoteToChange = state.find(anecdote => anecdote.id === action.payload);
      const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 };
      return state.map(anecdote =>
        anecdote.id === changedAnecdote.id ? changedAnecdote : anecdote
      );
    },
    addAnecdote(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const { setAnecdotes, voteForAnecdote, addAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
