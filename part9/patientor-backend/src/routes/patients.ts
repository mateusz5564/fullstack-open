import express from "express";
import { toNewPatient } from "../utils";

const router = express.Router();

import patientService from "../services/patients";

router.get("/", (_req, res) => {
  return res.json(patientService.getNoSsnEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    patientService.addEntry(newPatient);

    res.json(newPatient);
  } catch (err) {
    let errorMsg = "Something went wrong!";

    if (err instanceof Error) {
      errorMsg += ` ${err.message}`;
    }

    res.status(400).send(errorMsg);
  }
});

export default router;
