const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  } else {
    return null;
  }
};

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { name: 1, username: 1 });
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const token = getTokenFrom(request);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const newBlog = new Blog(request.body);
    const user = await User.findOne({ username: decodedToken.username });
    newBlog.user = user._id;

    const createdBlog = await newBlog.save();

    user.blogs = user.blogs.concat(createdBlog._id);
    await user.save();

    response.status(201).json(createdBlog);
  } catch (e) {
    if (e.name === "JsonWebTokenError") {
      response.status(401).json({ error: "unathorized, this action requires authorization" });
    }
  }
});

router.put("/:id", async (request, response) => {
  const newBlog = request.body;

  const result = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
  response.json(result);
});

router.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = router;
