import { CoursePart } from "../types";

const Total = ({ data }: { data: Array<CoursePart> }) => {
  return <p>Number of exercises {data.reduce((sum, current) => sum + current.exerciseCount, 0)}</p>;
};

export default Total;
