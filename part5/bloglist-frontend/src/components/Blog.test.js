import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    id: "628b8f2664771994e1da95f4",
    title: "Awesome blog",
    author: "Adam Smith",
    url: "www.as.pl/blogs/awesome-blog",
    likes: 2,
    user: {
      id: "6287650031e7ebf178478370",
      name: "mateusz",
      username: "matteusz5564",
    },
  };

  const user = {
    name: "mateusz2",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdGV1c3o1NTY0IiwiaWQiOiI2MjhmNWNlZjUxM2IxYzdjOTMxZjI5MzciLCJpYXQiOjE2NTM1NzMyNzB9.Cwz5TZaocdzDDrFFbB6obXBtV2ekUqRlgq_EIYPDmTc",
    username: "mateusz5564",
  };

  beforeEach(() => {
    render(<Blog blog={blog} user={user} likeBlog={() => true} remove={() => true} />);
  });

  test("initially displays only the blog's title and author", () => {
    const element = screen.getByText("Awesome blog Adam Smith");
    expect(element).toBeDefined();
  });

  test("shows the blog's url and numer of likes when the button controlling the shown details has been clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const urlElement = screen.getByText("www.as.pl/blogs/awesome-blog");
    const likesElement = screen.getByText("likes 2");

    expect(urlElement).toBeDefined();
    expect(likesElement).toBeDefined();
  });
});
