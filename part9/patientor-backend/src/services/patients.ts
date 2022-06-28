import patients from "../../data/patients";
import { Patient, PatientNoSsn } from "../types";

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNoSsnEntries = (): Array<PatientNoSsn> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }));
};

export default {
  getEntries,
  getNoSsnEntries,
};
