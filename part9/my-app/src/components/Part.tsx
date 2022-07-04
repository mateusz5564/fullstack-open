import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ part }: { part: CoursePart }) => {
  let element = null;
  switch (part.type) {
    case "normal":
      element = (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
        </div>
      );
      break;
    case "groupProject":
      element = (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
      break;
    case "submission":
      element = (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>submit to {part.exerciseSubmissionLink}</p>
        </div>
      );
      break;
    case "special":
      element = (
        <div>
          <h3>
            {part.name} {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
      break;
    default:
      assertNever(part);
      break;
  }

  return element;
};

export default Part;
