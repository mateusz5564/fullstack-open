import { v4 as uuid } from 'uuid';
import patients from "../../data/patients";
import { NewPatient, Patient, PatientNoSsn } from "../types";

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNoSsnEntries = (): Array<PatientNoSsn> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addEntry = (patient: NewPatient): Patient => {
  const patientWithId = {
    id: uuid(),
    ...patient,
  };
  patients.push(patientWithId);

  return patientWithId;
};

export default {
  addEntry,
  getEntries,
  getNoSsnEntries,
};
