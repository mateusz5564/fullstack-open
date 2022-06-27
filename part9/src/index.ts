/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import { calculateBMI } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

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

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.send({ error: "parameters missing" });
  } else if (daily_exercises.some((hour: number) => typeof hour !== "number") || typeof target !== 'number') {
    res.send({ error: "malformatted parameters" });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.send(result);
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log("Server listening on port" + PORT);
});
