import { useSelector, useDispatch } from "react-redux";
import { voteForAnecdote, addNote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const vote = id => {
    dispatch(voteForAnecdote(id));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addNote(e.target.content.value));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
