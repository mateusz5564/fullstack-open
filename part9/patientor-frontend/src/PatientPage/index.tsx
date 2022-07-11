import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { addPatient, setDiagnosisList } from "../state/reducer";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ diagnoses, patients }, dispatch] = useStateValue();

  if (!id) {
    return null;
  }

  const patient: Patient = patients[id];

  const fetchPatient = async () => {
    try {
      if (Object.keys(patients).includes(id) && Object.keys(diagnoses).length > 0) {
        return;
      }
      const { data: patientsData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      const { data: diagnosesData } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
      dispatch(setDiagnosisList(diagnosesData));
      dispatch(addPatient(patientsData));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    void fetchPatient();
  }, []);

  if (!patient || !Object.keys(diagnoses).length) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Patient {patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>entries</h3>
      {patient.entries.map(entry => (
        <div key={entry.id}>
          <p>
            {entry.date} {entry.description}
          </p>
          {entry.diagnosisCodes && (
            <ul>
              {entry.diagnosisCodes.map(code => (
                <li key={code}>
                  {code} {diagnoses[code].name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
