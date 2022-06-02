import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createAnecdote } from "../services/anecdotes";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const content = e.target.content.value;
    createAnecdote(content).then(data => {
      dispatch(addAnecdote(data));
    });
    dispatch(setNotification(`you added '${content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
