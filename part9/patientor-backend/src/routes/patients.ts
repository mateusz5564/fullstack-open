import express from 'express';
const router = express.Router();

import patientService from "../services/patients";

router.get("/", (_req, res) => {
  return res.json(patientService.getNoSsnEntries());
});

export default router;