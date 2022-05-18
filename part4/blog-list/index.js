const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const BlogRouter = require("./controllers/blog");
const { PORT, MONGODB_URI } = require('./utils/config');
const { info } = require('./utils/logger.js');

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', BlogRouter)

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
