import express from "express";
import { toNewPatient } from "../utils";

const router = express.Router();

import patientService from "../services/patients";

router.get("/", (_req, res) => {
  return res.json(patientService.getPublicEntries());
});

router.get("/:id", (req, res) => {
  try {
    const patient = patientService.getEntry(req.params.id);
    if (patient) {
      return res.json(patient);
    } else {
      return res.status(404).send("Patient not found!");
    }
  } catch (err) {
    let errorMsg = "Something went wrong";

    if (err instanceof Error) {
      errorMsg += ` ${err.message}`;
    }

    return res.status(400).send(errorMsg);
  }
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
