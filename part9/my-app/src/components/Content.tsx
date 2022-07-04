import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ data }: { data: Array<CoursePart> }) => {
  return (
    <>
      {data.map(item => (
        <Part key={item.name} part={item} />
      ))}
    </>
  );
};

export default Content;
