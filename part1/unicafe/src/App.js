import { useState } from "react"

const StatisticLine = ({ statistic, value, unit='' }) => <div>{statistic} {value} {unit}</div>

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good * 1 + bad * -1) / (good + neutral + bad);
  const positive = good/(good + neutral + bad) * 100;
  return (
    <div>
      <h2>statistics</h2>
      <StatisticLine statistic="good" value={good} />
      <StatisticLine statistic="neutral" value={neutral} />
      <StatisticLine statistic="bad" value={bad} />
      <StatisticLine statistic="all" value={all} />
      <StatisticLine statistic="average" value={average} />
      <StatisticLine statistic="positive" value={positive} unit="%" />
    </div>
  );
}

const Button = ({ handleClick, label }) => <button onClick={handleClick}>{label}</button>

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
      <Button handleClick={() => setGood(good + 1)} label="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} label="neutral" />
      <Button handleClick={() => setBad(bad + 1)} label="bad" />
      {showStatistics()}
    </div>
  );
}

export default App;
