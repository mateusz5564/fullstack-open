const listHelper = require("../utils/list_helper");
const { listWithOneBlog, blogs } = require("./blogsMock");

describe("most likes", () => {
  test("of empty list is null", () => {
    const result = listHelper.mostLikes([]);
    expect(result).toBe(null);
  });

  test("when has only one blog equals the author of this blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
