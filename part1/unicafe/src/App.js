import { useState } from "react";

const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / all;
  const positivePercent = `${(good / all) * 100} %`;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <h2>statistics</h2>
      <StatisticLine text={"good"} value={good} />
      <StatisticLine text={"neutral"} value={neutral} />
      <StatisticLine text={"bad"} value={bad} />
      <StatisticLine text={"all"} value={all} />
      <StatisticLine text={"average"} value={average} />
      <StatisticLine text={"positive"} value={positivePercent} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = (state, setState) => () => setState(state + 1);

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleButtonClick(good, setGood)}>good</Button>
      <Button onClick={handleButtonClick(neutral, setNeutral)}>neutral</Button>
      <Button onClick={handleButtonClick(bad, setBad)}>bad</Button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
