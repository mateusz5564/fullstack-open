const router = require("express").Router();
const Blog = require("../models/blog");

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

router.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  response.json(blog);
})

router.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = request.user;
  const blog = new Blog({ likes: 0, ...request.body, user: user.id });

  const savedBlog = await blog.save();
  savedBlog.populate("user", { username: 1, name: 1 });

  user.blogs.push(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

router.delete("/:id", async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  if (blogToDelete.user && blogToDelete.user.toString() !== request.user.id) {
    return response.status(401).json({
      error: "only the creator can delete a blog",
    });
  }

  await Blog.deleteOne({ _id: request.params.id });

  response.status(204).end();
});

router.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  });

  response.json(updatedBlog);
});

module.exports = router;
