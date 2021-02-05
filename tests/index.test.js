import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../pages/index";

describe("HomePage", () => {
  it("renders without crashing", async () => {
    render(<HomePage user={{ first_name: "Florian", last_name: "Séran" }} />);
    expect(screen.getByTitle("title")).toBeInTheDocument();
    expect(screen.getByTitle("title")).toHaveTextContent("Hello 👋");
    await waitFor(() => screen.getByTitle("greetings"));
    expect(screen.getByTitle("greetings")).toHaveTextContent(
      "My name is Florian Séran!"
    );
  });
});
