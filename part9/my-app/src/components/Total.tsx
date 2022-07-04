import { Course } from "../types";

const Total = ({ data }: { data: Array<Course> }) => {
  return <p>Number of exercises {data.reduce((sum, current) => sum + current.exerciseCount, 0)}</p>;
};

export default Total;
