const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const BlogRouter = require("./controllers/blog");
const UserRouter = require("./controllers/user");
const LoginRouter = require("./controllers/login");
const { MONGODB_URI } = require("./utils/config");

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", BlogRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", LoginRouter);

module.exports = app;
