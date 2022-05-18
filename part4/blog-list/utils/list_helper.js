const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, current) => acc + current.likes, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null;

  let favoriteBlog = blogs[0];

  blogs.forEach(blog => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog;
    }
  });

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};

module.exports = {
  dummy,
  favoriteBlog,
  totalLikes,
};
