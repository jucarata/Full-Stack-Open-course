import { useState } from 'react'

// Components
const Title = ({title}) => <h1>{title}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({statistics}) => {
  if(statistics.total > 0){
    return (
      <>
        <Title title={"Statistics"}/>
        <table>
          <tbody>
            <StatisticLine text={"Good comments: "} value={statistics.good}/>
            <StatisticLine text={"Neutral comments: "} value={statistics.neutral}/>
            <StatisticLine text={"Bad comments: "} value={statistics.bad}/>
            <StatisticLine text={"Total comments: "} value={statistics.total}/>
            <StatisticLine text={"Average: "} value={statistics.average}/>
            <StatisticLine text={"Positive: "} value={statistics.positive}/>
          </tbody>
        </table>
      </>
    )
  } else{
    return (
      <>
        <Title title={"Statistics"}/>
        <p>No feedback given</p>
      </>
    )
  }
  
}


// Main component
const App = () => {
  // A complex state
  const [statistics, setStatistics] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    average: 0,
    positive: "0%"
  })

  // Event handling
  const handleGoodComment = () => {
    const good = statistics.good + 1
    const total = good + statistics.neutral + statistics.bad

    const average = ((good * 1) + (statistics.neutral * 0) + (statistics.bad * -1))/total
    const positive = (good * 100)/total

    const newStatistics = {
      ...statistics,
        good: good,
        total: total,
        average: average,
        positive: positive + "%"
    }

    setStatistics(newStatistics)
  }

  // Event handling
  const handleNeutralComment = () => {
    const neutral = statistics.neutral + 1
    const total = neutral + statistics.good + statistics.bad

    const average = ((statistics.good * 1) + (neutral * 0) + (statistics.bad * -1))/total
    const positive = (statistics.good * 100)/total

    const newStatistics = {
      ...statistics,
        neutral: neutral,
        total: total,
        average: average,
        positive: positive + "%"
    }

    setStatistics(newStatistics)
  }

  // Event handling
  const handleBadComment = () => {
    const bad = statistics.bad + 1
    const total = bad + statistics.good + statistics.neutral

    const average = ((statistics.good * 1) + (statistics.neutral * 0) + (bad * -1))/total
    const positive = (statistics.good * 100)/total

    const newStatistics = {
      ...statistics,
        bad: bad,
        total: total,
        average: average,
        positive: positive + "%"
    }

    setStatistics(newStatistics)
  }

  return (
    <div>
      <Title title={"Give feedback"}/>
      <Button onClick={handleGoodComment} text={"Good"}/>
      <Button onClick={handleNeutralComment} text={"Neutral"}/>
      <Button onClick={handleBadComment} text={"Bad"}/>

      <Statistics statistics={statistics}/>
    </div>
  )
}

export default App