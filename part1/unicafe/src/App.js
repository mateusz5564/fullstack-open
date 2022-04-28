import { useState } from "react";

const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = (state, setState) => () => setState(state + 1);
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / all;
  const positivePercent = good / all * 100;

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleButtonClick(good, setGood)}>good</Button>
      <Button onClick={handleButtonClick(neutral, setNeutral)}>neutral</Button>
      <Button onClick={handleButtonClick(bad, setBad)}>bad</Button>

      <h2>statistics</h2>
      <p>good {good} </p>
      <p>neutral {neutral} </p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positivePercent}%</p>
    </div>
  );
};

export default App;
