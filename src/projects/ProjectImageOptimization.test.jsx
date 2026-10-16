import React from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProjectForm from "./AddProjectForm";
import EditProjectForm from "./EditProjectForm";
import { prepareProjectThumbnail, uploadProjectThumbnail } from "../lib/storage";
import { supabase } from "../lib/supabaseClient";

jest.mock("../lib/storage", () => ({
  prepareProjectThumbnail: jest.fn(),
  uploadProjectThumbnail: jest.fn(),
}));

jest.mock("../lib/supabaseClient", () => ({
  supabase: { from: jest.fn() },
}));

const mockInsert = jest.fn();
const mockUpdate = jest.fn();
const mockEq = jest.fn();

const createPreparedImage = () => ({
  blob: new Blob(["optimized"], { type: "image/webp" }),
  converted: true,
  objectName: "optimized-cover.webp",
  contentType: "image/webp",
  originalSize: 1000,
  optimizedSize: 500,
});

beforeEach(() => {
  jest.clearAllMocks();

  let objectUrlId = 0;
  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    writable: true,
    value: jest.fn(() => `blob:test-${++objectUrlId}`),
  });
  Object.defineProperty(URL, "revokeObjectURL", {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });

  mockInsert.mockResolvedValue({ error: null });
  mockUpdate.mockReturnValue({ eq: mockEq });
  mockEq.mockResolvedValue({ error: null });
  supabase.from.mockReturnValue({ insert: mockInsert, update: mockUpdate });
});

test("Add Project optimizes on selection and uploads the prepared image once", async () => {
  const prepared = createPreparedImage();
  const publicUrl = "https://example.com/optimized-cover.webp";
  let resolvePreparation;
  prepareProjectThumbnail.mockImplementation(
    () => new Promise((resolve) => { resolvePreparation = resolve; })
  );
  uploadProjectThumbnail.mockResolvedValue({ ...prepared, publicUrl });

  const { container } = render(<AddProjectForm />);
  fireEvent.change(screen.getByLabelText(/Project Name/), { target: { value: "Project" } });
  fireEvent.change(screen.getByLabelText(/Description/), { target: { value: "Description" } });
  fireEvent.change(screen.getByLabelText(/Tools Used/), { target: { value: "React" } });

  const file = new File(["original"], "cover.png", { type: "image/png" });
  fireEvent.change(container.querySelector('input[type="file"]'), {
    target: { files: [file] },
  });

  expect(prepareProjectThumbnail).toHaveBeenCalledWith(file);
  expect(uploadProjectThumbnail).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "Optimizing image…" })).toBeDisabled();

  await act(async () => { resolvePreparation(prepared); });
  expect(await screen.findByText("Image optimized automatically.")).toBeInTheDocument();
  expect(URL.createObjectURL).toHaveBeenCalledWith(prepared.blob);

  fireEvent.click(screen.getByRole("button", { name: /Publish Project/ }));

  await waitFor(() => expect(mockInsert).toHaveBeenCalledWith([
    expect.objectContaining({ image_url: publicUrl }),
  ]));
  expect(uploadProjectThumbnail).toHaveBeenCalledWith(prepared);
  expect(prepareProjectThumbnail).toHaveBeenCalledTimes(1);
  expect(uploadProjectThumbnail).toHaveBeenCalledTimes(1);
  expect(await screen.findByText("Project Added!")).toBeInTheDocument();
});

test("Edit Project optimizes a replacement on selection and saves that result", async () => {
  const prepared = createPreparedImage();
  const publicUrl = "https://example.com/optimized-cover.webp";
  const project = {
    id: 7,
    title: "Project",
    description: "Description",
    tools: "React",
    project_link: "",
    display_order: 1,
    genre: "Projects",
    image_url: "https://example.com/original.png",
  };
  prepareProjectThumbnail.mockResolvedValue(prepared);
  uploadProjectThumbnail.mockResolvedValue({ ...prepared, publicUrl });

  const { container } = render(<EditProjectForm project={project} />);
  const file = new File(["replacement"], "replacement.jpg", { type: "image/jpeg" });
  fireEvent.change(container.querySelector('input[type="file"]'), {
    target: { files: [file] },
  });

  expect(prepareProjectThumbnail).toHaveBeenCalledWith(file);
  expect(uploadProjectThumbnail).not.toHaveBeenCalled();
  expect(await screen.findByText("Image optimized automatically.")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Save Changes/ }));

  await waitFor(() => expect(mockEq).toHaveBeenCalledWith("id", project.id));
  expect(uploadProjectThumbnail).toHaveBeenCalledWith(prepared);
  expect(prepareProjectThumbnail).toHaveBeenCalledTimes(1);
  expect(uploadProjectThumbnail).toHaveBeenCalledTimes(1);
  expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({ image_url: publicUrl }));
  expect(await screen.findByText("Saved!")).toBeInTheDocument();
});
