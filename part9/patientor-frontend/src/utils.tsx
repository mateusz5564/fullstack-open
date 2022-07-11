const assertNever = (arg: never): never => {
  throw new Error("Error, unwanted argument: " + JSON.stringify(arg));
};

export { assertNever };
