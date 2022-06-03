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
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      );
    },
    addAnecdote(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setAnecdotes, updateAnecdote, addAnecdote } = anecdoteSlice.actions;

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.postAnecdote(content);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteForAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteForAnecdote(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;