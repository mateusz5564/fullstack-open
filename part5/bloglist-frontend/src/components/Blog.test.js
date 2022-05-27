import Blog from "./Blog";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";

test("<Blog /> initially displays only blog's title and author", () => {
  const blog = {
    title: "Awesome blog",
    author: "Adam Smith",
    url: "www.as.pl/blogs/awesome-blog",
    likes: 2,
  };

  render(<Blog blog={blog}/>);

  const element = screen.getByText("Awesome blog Adam Smith");
  expect(element).toBeDefined();
});