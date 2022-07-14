import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { addPatient, setDiagnosisList } from "../state/reducer";
import EntryDetails from "../components/EntryDetails";

import { styled } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddHealthEntryModal from "../AddHealthEntryModal";
import Button from "@material-ui/core/Button";
import { HospitalEntryFormValues } from "../AddHealthEntryModal/AddHealthEntryForm";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ diagnoses, patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = () => setModalOpen(true);

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

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

  const submitNewHealthEntry = async ({
    type,
    date,
    specialist,
    description,
    diagnosisCodes,
    dischargeDate,
    dischargeCriteria,
  }: HospitalEntryFormValues) => {
    try {
      const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, {
        type,
        date,
        specialist,
        description,
        diagnosisCodes,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      });

      dispatch(addPatient(data));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
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
        <StyledPaper key={entry.id}>
          <EntryDetails entry={entry} />
        </StyledPaper>
      ))}
      <AddHealthEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        onSubmit={submitNewHealthEntry}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

const StyledPaper = styled(Paper)({
  padding: "1px 12px",
  margin: "12px 0",
});

export default PatientPage;
