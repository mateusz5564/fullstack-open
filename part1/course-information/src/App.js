const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises1: 1,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises2: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises3: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3} />
    </div>
  );
};

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Content = props => {
  return (
    <>
      <p>
        {props.part1.name} {props.part1.exercises1}
      </p>
      <p>
        {props.part2.name} {props.part2.exercises2}
      </p>
      <p>
        {props.part3.name} {props.part3.exercises3}
      </p>
    </>
  );
};

const Total = props => {
  return (
    <p>
      Number of exercises {props.part1.exercises1 + props.part2.exercises2 + props.part3.exercises3}
    </p>
  );
};

export default App;
