import express from "express";
import { calculateBMI } from "./bmiCalculator";

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({ error: "malformatted parameters" });
  } else {
    const bmi = calculateBMI(height, weight);
    res.send({ weight, height, bmi });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log("Server listening on port" + PORT);
});
