const { application } = require("express");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let newBlog = new Blog(initialBlogs[0]);
  await newBlog.save();
  newBlog = new Blog(initialBlogs[1]);
  await newBlog.save();
});

test("return blogs in json format", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("return all blogs", async () => {
  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(initialBlogs.length);
});

test("creates a new blog", async () => {
  const newBlog = {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const res = await api.get("/api/blogs");
  expect(res.body).toHaveLength(initialBlogs.length + 1);

  const titles = res.body.map(blog => blog.title);
  expect(titles).toContain("TDD harms architecture");
});

test("deletes a blog by id", async () => {
  const blogsBefore = await api.get("/api/blogs").expect(200);
  const idToDelete = blogsBefore.body[0]._id;

  await api.delete(`/api/blogs/${idToDelete}`).expect(204);

  const blogsAfter = await api.get("/api/blogs").expect(200);
  const ids = blogsAfter.body.map(blog => blog._id);
  expect(ids).not.toContain(idToDelete);
});

test("updated a blog by id", async () => {
  const blogsBefore = await api.get("/api/blogs").expect(200);
  const idToUpdate = blogsBefore.body[0]._id;

  await api.put(`/api/blogs/${idToUpdate}`).send({ likes: 22 }).expect(200);

  const blogsAfter = await api.get("/api/blogs").expect(200);
  const updatedBlog = blogsAfter.body.find(blog => blog._id === idToUpdate);
  expect(updatedBlog).toHaveProperty("likes", 22);
});

afterAll(() => {
  mongoose.connection.close();
});