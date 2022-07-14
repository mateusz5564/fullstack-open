import { NewEntry, Gender, NewPatient, HealthCheckRating } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isObject = (obj: any): boolean => {
  return typeof obj === "object" && !Array.isArray(obj) && obj !== null;
};

const parseStringProperty = (property: unknown, propertyName: string): string => {
  if (!property || !isString(property)) {
    throw new Error(`Invalid or missing name ${propertyName}`);
  }

  return property;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Invalid or missing date");
  }

  return date;
};

const isSsn = (ssn: string): boolean => {
  const reg = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])([0-9]\d\+|\d\d-|[0-9]\dA)\d{3}[\dA-Z]$/;
  return reg.test(ssn);
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error("Invalid or missing ssn");
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Invalid or missing gender");
  }

  return gender;
};

const parseEntryType = (type: any): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
  const types = ["Hospital", "HealthCheck", "OccupationalHealthcare"];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!type || !types.includes(type)) {
    throw new Error("Invalid or missing entry type");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return type;
};

const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  if (!isObject(discharge)) {
    throw new Error("Discharge must be an object");
  }

  const date = parseDate(discharge.date);
  const criteria = parseStringProperty(discharge.criteria, "criteria");

  return {
    date,
    criteria,
  };
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error("Missing or invalid healthcheck rating!");
  }

  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseStringProperty(object.name, "name"),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseStringProperty(object.occupation, "occupation"),
    entries: [],
  };

  return newPatient;
};

export const toNewEntry = (object: any): NewEntry => {
  const type = parseEntryType(object.type);
  const baseEntry = {
    date: parseDate(object.date),
    type,
    specialist: parseStringProperty(object.specialist, "specialist"),
    description: parseStringProperty(object.description, "description"),
  } as NewEntry;

  if (baseEntry.type === "Hospital") {
    const discharge = parseDischarge(object.discharge);
    return {
      ...baseEntry,
      discharge,
    };
  } else if (baseEntry.type === "HealthCheck") {
    return {
      ...baseEntry,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
  } else {
    return {
      ...baseEntry,
      employerName: parseStringProperty(object.employerName, "employerName"),
    };
  }

  return baseEntry;
};
