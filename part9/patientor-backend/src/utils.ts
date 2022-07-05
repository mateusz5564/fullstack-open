import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Invalid or missing name");
  }

  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid or missing date");
  }

  return date;
};

const isSsn = (ssn: string): boolean => {
  const reg = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([0-9]\d\+|\d\d-|[0-9]\dA)\d{3}[\dA-Z]$/;
  return reg.test(ssn);
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error("Invalid or missing ssn");
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error("Invalid or missing occupation");
  }

  return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error("Invalid or missing gender");
  }

  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };

  return newPatient;
};
