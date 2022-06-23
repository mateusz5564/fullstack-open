const calculateBMI = (height: number, weight: number) => {
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

console.log(calculateBMI(180, 74));
