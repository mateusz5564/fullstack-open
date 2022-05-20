const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.reduce((acc, current) => acc + current.likes, 0);
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) return null;

  const { title, author, likes } = blogs.reduce((prevBlog, currentBlog) => {
    return currentBlog.likes > prevBlog.likes ? currentBlog : prevBlog;
  });

  return {
    title,
    author,
    likes,
  };
};

const mostBlogs = blogs => {
  if (blogs.length === 0) return null;

  const numberOfBlogsByAuthor = blogs.reduce((acc, current) => {
    !acc[current.author] ? (acc[current.author] = 1) : (acc[current.author] += 1);
    return acc;
  }, {});

  let authorWithMostBlogs = { author: "", blogs: 0 };

  for (author in numberOfBlogsByAuthor) {
    if (numberOfBlogsByAuthor[author] > authorWithMostBlogs.blogs) {
      authorWithMostBlogs = {
        author,
        blogs: numberOfBlogsByAuthor[author],
      };
    }
  }

  return authorWithMostBlogs;
};

const mostLikes = blogs => {
  if (blogs.length === 0) return null;

  const numberOfLikesByAuthor = blogs.reduce((acc, current) => {
    !acc[current.author]
      ? (acc[current.author] = current.likes)
      : (acc[current.author] += current.likes);
    return acc;
  }, {});

  let authorWithMostLikes = { author: "", likes: 0 };

  for (author in numberOfLikesByAuthor) {
    if (numberOfLikesByAuthor[author] > authorWithMostLikes.likes) {
      authorWithMostLikes = {
        author,
        likes: numberOfLikesByAuthor[author],
      };
    }
  }

  return authorWithMostLikes;
};

module.exports = {
  dummy,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes,
};