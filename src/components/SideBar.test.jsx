import { render, screen, waitFor } from "@testing-library/react";
import Sidebar from "./SideBar";
import { supabase } from "../lib/supabaseClient";

jest.mock("../lib/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

test("signs out a non-owner session without exposing admin controls", async () => {
  supabase.auth.getSession.mockResolvedValue({
    data: { session: { user: { id: "another-user" } } },
  });
  supabase.auth.onAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: jest.fn() } },
  });
  supabase.auth.signOut.mockResolvedValue({ error: null });

  render(<Sidebar />);

  await waitFor(() => expect(supabase.auth.signOut).toHaveBeenCalledTimes(1));
  expect(screen.getByRole("button", { name: "Admin login" })).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "Admin logout" })).not.toBeInTheDocument();
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Admin access is restricted to the site owner.",
  );
});
