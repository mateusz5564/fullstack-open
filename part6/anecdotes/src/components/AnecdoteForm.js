import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const content = e.target.content.value;
    createAnecdote(content);
    setNotification(`you added '${content}'`, 5);
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
