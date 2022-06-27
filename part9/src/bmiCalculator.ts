interface BMIInputs {
  height: number;
  weight: number;
}

const parseBMIArguments = (args: Array<string>): BMIInputs => {
  if (args.length != 4) throw new Error("incorrect number of arguments");

  if (!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))) {
    return {
      height: Number(process.argv[2]),
      weight: Number(process.argv[3]),
    };
  } else {
    throw new Error("Provided arguments were not numbers!");
  }
};

export const calculateBMI = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 18.5) {
    return "Underweight (Unhealthy)";
  } else if (bmi >= 18.5 && bmi <= 22.9) {
    return "Normal range (Healthy)";
  } else if (bmi > 22.9 && bmi <= 24.9) {
    return "Overweight I (At risk)";
  } else if (bmi > 24.9 && bmi <= 29.9) {
    return "Overweight II (Moderately obese)";
  } else {
    return "Overweight III (Severely obese)";
  }
};

try {
  const args = parseBMIArguments(process.argv);
  const {height, weight} = args;
  const bmi = calculateBMI(height, weight);
  console.log(bmi);
} catch (error) {
  console.log(error)
}
