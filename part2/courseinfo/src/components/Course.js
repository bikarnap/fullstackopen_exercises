const Header = (props) => <h2>{props.course}</h2>

const Part = (props) => <p>{props.part} {props.exercises}</p>

const Content = (props) => (
  <div>
    {props.parts.map(part =>
      <Part
        key={part.id}
        part={part.name}
        exercises={part.exercises}
      />
    )}
  </div>
)

const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (sum, exercises) => sum + exercises.exercises, 0);
  return (
    <p><strong>total of {totalExercises} exercises</strong></p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;