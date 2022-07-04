import { Course } from "../types";

const Content = ({ data }: { data: Array<Course> }) => {
  return (
    <>
      {data.map(item => (
        <p key={item.name}>
          {item.name} {item.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;
