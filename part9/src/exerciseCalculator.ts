interface ExercisesStats {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface RatingMsg {
  1: string;
  2: string;
  3: string;
}

interface ExercisesInput {
  target: number;
  hours: Array<number>;
}

const parseExArguments = (args: Array<string>): ExercisesInput => {
  if (process.argv.length < 4) throw new Error("it requires at least 2 arguments");
  const target = Number(process.argv[2]);
  const hours = process.argv.slice(3).map(arg => Number(arg));

  if (!isNaN(target) && hours.every(arg => !isNaN(arg))) {
    return {
      target,
      hours,
    };
  } else {
    throw new Error("average target hours and exercise hours must be numbers!");
  }
};

const calculateTrainingDays = (hours: Array<number>): number => {
  return hours.reduce((acc, curr) => (curr > 0 ? acc + 1 : acc), 0);
};

const calculateAverage = (hours: Array<number>): number => {
  const totalHours = hours.reduce((acc, curr) => acc + curr, 0);
  return totalHours / hours.length;
};

const getRating = (averageHours: number, target: number): [number, string] => {
  const completion = (averageHours / target) * 100;
  let rating: number;

  if (completion > 90) {
    rating = 3;
  } else if (completion > 60 && completion <= 90) {
    rating = 2;
  } else {
    rating = 1;
  }

  const ratingMsg: RatingMsg = {
    1: "cool that you are trying, but you need more effort",
    2: "not too bad but could be better",
    3: "awesome, keep it up!",
  };

  return [rating, ratingMsg[rating as keyof RatingMsg]];
};

const calculateExercises = (hours: Array<number>, target: number): ExercisesStats => {
  const average = calculateAverage(hours);
  const [rating, ratingDescription] = getRating(average, target);

  return {
    periodLength: hours.length,
    trainingDays: calculateTrainingDays(hours),
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const args = parseExArguments(process.argv);
  const { target, hours } = args;
  console.log(calculateExercises(hours, target));
} catch (err) {
  console.log(err);
}
