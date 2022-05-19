const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

router.post("/", async (request, response) => {
  const newBlog = new Blog(request.body);

  const result = await newBlog.save();
  response.status(201).json(result);
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
