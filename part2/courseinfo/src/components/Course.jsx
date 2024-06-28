const Header = ({ course }) => <h2>{course}</h2>
  
const Total = ({ sum }) => <p><strong>Number of exercises {sum}</strong></p>
  
const Part = ({ part }) => <p>{part.name} {part.exercises}</p>
  
const Content = ({ parts }) => 
<>
    {parts.map(part => 
        <Part key={part.id} part={part} />
    )}
</>


const Course = ({course}) => {

    const {id, name, parts} = course
  
    const totalExercises = parts.reduce((sum, part) => sum+= part.exercises, 0)
  
    return(
      <>
          <Header course={name}/>
          <Content parts={parts}/>
          <Total sum={totalExercises}/>
      </>
    )
}

export default Course