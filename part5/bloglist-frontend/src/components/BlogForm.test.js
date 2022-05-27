import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("the event handler responsible for adding new blogs receives right arguments", async () => {
    const mockHandler = jest.fn();
    render(<BlogForm createBlog={mockHandler} />);
    const createButton = screen.getByText("create");
    const titleInput = screen.getByTestId("title_input");
    const authorInput = screen.getByTestId("author_input");
    const urlInput = screen.getByTestId("url_input");

    const user = userEvent.setup();
    await user.type(titleInput, "Test Title");
    await user.type(authorInput, "Adam Smith");
    await user.type(urlInput, "www.google.pl");
    await user.click(createButton);

    expect(mockHandler.mock.calls[0][0]).toEqual({ title: "Test Title", author: "Adam Smith", url: "www.google.pl" });
  });
});
