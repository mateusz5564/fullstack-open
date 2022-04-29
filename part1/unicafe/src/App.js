import { useState } from "react";

const Button = ({ onClick, children }) => <button onClick={onClick}>{children}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <>
      <td>{text}</td>
      <td>{value}</td>
    </>
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
      <table>
        <tbody>
          <tr>
            <StatisticLine text={"good"} value={good} />
          </tr>
          <tr>
            <StatisticLine text={"neutral"} value={neutral} />
          </tr>
          <tr>
            <StatisticLine text={"bad"} value={bad} />
          </tr>
          <tr>
            <StatisticLine text={"all"} value={all} />
          </tr>
          <tr>
            <StatisticLine text={"average"} value={average} />
          </tr>
          <tr>
            <StatisticLine text={"positive"} value={positivePercent} />
          </tr>
        </tbody>
      </table>
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
