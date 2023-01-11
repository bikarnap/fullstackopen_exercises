import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => (
  <div>
    <h2>statistics</h2>
    <div>good {good}</div>
    <div>neutral {neutral} </div>
    <div>bad {bad}</div>
    <div>all {good + neutral + bad}</div>
    <div>average {(good * 1 + bad * -1) / (good + neutral + bad)}</div>
    <div>positive {good/(good + neutral + bad) * 100} %</div>
  </div>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const showStatistics = () => {
    if (good === 0 && neutral === 0 && bad === 0)
      return <p>No feedback received yet, provide feedback using the buttons</p>
    return <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
    />
  }
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      {showStatistics()}
    </div>
  );
}

export default App;
