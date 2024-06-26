import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Quote = ({quote}) => <p>{quote}</p>
const Vote = ({number}) => <p>has {number} votes</p>
const Title = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
    'The best way to get a project done faster is to start sooner',
    'Plan to throw one (implementation) away; you will, anyhow.',
    'The price of reliability is the pursuit of the utmost simplicity. It is a price which the very rich may find hard to pay.'
  ]

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))

  const randomAnecdote = (max) => () => {
    const newIndex = Math.floor(Math.random() * max)
    console.log("Anecdote number ", newIndex)
    setSelected(newIndex)
  }

  const vote = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  return (
    <div>
      <Title text={"Anecdote of the day"}/>
      <Quote quote={anecdotes[selected]}/>
      <Vote number={votes[selected]}/>
      <Button onClick={vote} text={"Vote"}/>
      <Button onClick={randomAnecdote(anecdotes.length)} text={"Next anecdote"}/>

      <Title text={"Anecdote with most votes"}/>
      <Quote quote={anecdotes[votes.indexOf(Math.max(...votes))]}/>
    </div>
  )
}

export default App