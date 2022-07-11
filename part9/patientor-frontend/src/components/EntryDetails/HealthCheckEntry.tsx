import { HealthCheckEntry as HealthCheckEntryType } from "../../types";

import HealingIcon from "@material-ui/icons/Healing";
import FavoriteIcon from "@material-ui/icons/Favorite";

const HealthCheckEntry: React.FC<{ entry: HealthCheckEntryType }> = ({ entry }) => {
  return (
    <div>
      <p>
        {entry.date} <HealingIcon />
      </p>
      <p>{entry.description}</p>
      <FavoriteIcon style={{ color: entry.healthCheckRating > 1 ? "red" : "green" }} />
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntry;
