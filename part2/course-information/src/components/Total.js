const Total = ({ parts }) => {
  return (
    <p style={{ fontWeight: "bold" }}>
      total of {parts.reduce((acc, part) => (acc += part.exercises), 0)} exercises
    </p>
  );
};

export default Total;
