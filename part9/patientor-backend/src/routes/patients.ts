import express from "express";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

import patientService from "../services/patients";

router.get("/", (_req, res) => {
  return res.json(patientService.getEntries());
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

    return res.status(400).send({error: errorMsg});
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

    res.status(400).send({error: errorMsg});
  }
});

router.post("/:id/entries", (req, res) => {
  console.log(req.body);
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addHealthEntry(req.params.id, newEntry);

    res.json(updatedPatient);
  } catch (err) {
    let errorMsg = "Something went wrong!";
    console.log(err);

    if (err instanceof Error) {
      errorMsg += ` ${err.message}`;
    }

    res.status(400).send({error: errorMsg});
  }
});

export default router;
