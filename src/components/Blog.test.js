import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  title: "test",
  author: "test",
  url: "www.example.com",
  likes: 0,
};
const props = {
  handleLikeClick: () => null,
  handleRemoveClick: () => null,
  blog,
};
describe("<Blog />", () => {
  test("renders blogs content", () => {
    const { container } = render(<Blog {...props} />);
    const element = container.querySelector(".content");
    expect(element).toHaveStyle("display: none");
  });
  test("clicking the button shows the blogs url and likes", async () => {
    const { container } = render(<Blog {...props} />);
    const user = userEvent.setup();
    const button = screen.getByText("show");
    await user.click(button);
    const element = screen.getByText(blog.url);
    expect(element).toBeDefined();
    expect(container.querySelector(".content")).not.toHaveStyle(
      "display:'none'"
    );
  });
  test("like button clicked twice function to handle like clicks runs twice", async () => {
    const mockHandler = jest.fn();
    render(<Blog {...props} handleLikeClick={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("Like");
    await user.dblClick(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
