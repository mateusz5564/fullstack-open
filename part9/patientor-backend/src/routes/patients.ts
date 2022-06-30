/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
const router = express.Router();

import patientService from "../services/patients";

router.get("/", (_req, res) => {
  return res.json(patientService.getNoSsnEntries());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientService.addEntry({ name, dateOfBirth, ssn, gender, occupation });

  res.json(newPatient);
});

export default router;
