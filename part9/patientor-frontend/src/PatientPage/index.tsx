import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  if (!id) {
    return null;
  }

  const patient: Patient = patients[id];
  
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (Object.keys(patients).includes(id)) {
          return;
        }
        const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch({ type: "ADD_PATIENT", payload: data });
      } catch (err) {
        console.log(err);
      }
    };

    if (!patient) {
      void fetchPatient();
    }
  }, []);
  
  if(!patient) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Patient {patient.name}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientPage;
