import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Dialog from "./components/Dialog";

test("404 page renders heading and current-year footer", () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );
  expect(screen.getByRole("heading", { level: 1, name: "404" })).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(`${new Date().getFullYear()} John Paul San Diego`))
  ).toBeInTheDocument();
});

test("dialog exposes dialog semantics and closes on Escape", () => {
  const onClose = jest.fn();
  render(
    <Dialog open onClose={onClose} ariaLabel="Test dialog">
      <button type="button">Inside</button>
    </Dialog>
  );
  expect(screen.getByRole("dialog", { name: "Test dialog" })).toBeInTheDocument();
  fireEvent.keyDown(document, { key: "Escape" });
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("dialog renders nothing when closed", () => {
  render(
    <Dialog open={false} onClose={() => {}} ariaLabel="Hidden dialog">
      <p>content</p>
    </Dialog>
  );
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
