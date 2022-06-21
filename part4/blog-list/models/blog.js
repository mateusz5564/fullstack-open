const { request } = require("express");
const mongoose = require("mongoose");
const User = require("./user");

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  author: String,
  likes: Number,
  comments: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.pre("deleteOne", async function () {
  const blog = await this.model.findOne(this.getQuery()).populate("user");
  const user = await blog.model("User").findOne({ _id: blog.user.id });
  const blogIndex = user.blogs.findIndex(id => id.toString() === blog.id);
  user.blogs.splice(blogIndex, 1);
  await user.save();
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", schema);
