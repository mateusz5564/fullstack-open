import { OccupationalHealthcareEntry as OccupationalHealthcareEntryType } from "../../types";
import WorkIcon from "@material-ui/icons/Work";

const OccupationalHelthcareEntry: React.FC<{ entry: OccupationalHealthcareEntryType }> = ({
  entry,
}) => {
  return (
    <div>
      <p>
        {entry.date} <WorkIcon /> {entry.employerName}
      </p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalHelthcareEntry;
