// Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateUserPage from "../pages/create-user";

const server = setupServer(
  rest.post("/api/create_user", (req, res, ctx) => {
    return res(ctx.json(req.body));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("CreateUserPage", () => {
  it("create user success", async () => {
    render(<CreateUserPage />);

    const firstName = "John";
    const lastName = "Doe";

    userEvent.type(screen.getByPlaceholderText("First name"), firstName);
    userEvent.type(screen.getByPlaceholderText("Last name"), lastName);

    fireEvent.click(screen.getByTestId("submit"));

    await waitFor(() => screen.getByRole("success"));

    expect(await screen.getByRole("success")).toHaveTextContent(
      `${firstName.toUpperCase()} ${lastName.toUpperCase()} was created 🎉`
    );
  });
});

test("create user error", async () => {
  server.use(
    rest.post("/api/create_user", (req, res, ctx) => {
      return res(ctx.status(400));
    })
  );
  render(<CreateUserPage />);

  const firstName = "John";

  await userEvent.type(screen.getByPlaceholderText("First name"), firstName);

  fireEvent.click(screen.getByTestId("submit"));

  await waitFor(() => screen.getByRole("alert"));
});
