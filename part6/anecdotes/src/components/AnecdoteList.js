import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = [...useSelector(state => state.anecdotes)];
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteForAnecdote(id));
    dispatch(setNotification(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      {(filter ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) : anecdotes)
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
