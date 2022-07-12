import { v4 as uuid } from "uuid";
import patients from "../../data/patients";
import { NewEntry, NewPatient, Patient, PublicPatient } from "../types";

const getEntries = (): Array<Patient> => {
  return patients;
};

const getPublicEntries = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getEntry = (id: string): Patient | undefined => {
  return patients.find(item => item.id === id);
};

const addEntry = (patient: NewPatient): Patient => {
  const patientWithId = {
    id: uuid(),
    ...patient,
  };
  patients.push(patientWithId);

  return patientWithId;
};

const addHealthEntry = (patientId: string, healthEntry: NewEntry): Patient => {
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) {
    throw new Error("Patient not found!");
  }

  const entryWithId = {
    id: uuid(),
    ...healthEntry,
  };

  patient.entries.push(entryWithId);

  return patient;
};

export default {
  addEntry,
  getEntries,
  getEntry,
  addHealthEntry,
  getPublicEntries,
};
