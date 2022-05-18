const listHelper = require("../utils/list_helper");
const { listWithOneBlog, blogs } = require("./blogsMock");

describe("most blogs", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostBlogs([]);
    expect(result).toBe(null);
  });

  test("when has only one blog equals the author of this blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
