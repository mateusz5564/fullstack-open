const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/", async (request, response) => {
  const users = await User.find({});
  return response.json(users);
});

router.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({ username, name, passwordHash });
  const result = await newUser.save();
  return response.status(201).json(result);
});

module.exports = router;
