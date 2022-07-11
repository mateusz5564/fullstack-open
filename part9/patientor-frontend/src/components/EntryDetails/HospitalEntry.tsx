import { HospitalEntry as HospitalEntryType } from "../../types";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

const HospitalEntry: React.FC<{ entry: HospitalEntryType }> = ({ entry }) => {
  return (
    <div>
      <p>
        {entry.date} <LocalHospitalIcon />
      </p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
      <p>
        discharge {entry.discharge.date}: {entry.discharge.criteria}
      </p>
    </div>
  );
};

export default HospitalEntry;
