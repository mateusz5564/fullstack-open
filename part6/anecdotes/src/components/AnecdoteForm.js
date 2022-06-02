import { useDispatch } from "react-redux";
import { addNote } from "../reducers/anecdoteReducer";
import { setNotification, removeNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(addNote(content));
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
