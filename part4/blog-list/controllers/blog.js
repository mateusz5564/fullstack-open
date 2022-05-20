const router = require("express").Router();
const Blog = require("../models/blog");
const User = require('../models/user');

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {'name': 1, 'username': 1})
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const newBlog = new Blog(request.body);

  const user = await User.findOne({});
  newBlog.user = user._id; 

  const createdBlog = await newBlog.save();

  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save();

  response.status(201).json(createdBlog);
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
