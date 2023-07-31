import React from "react";
import { render, act, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";
import AppContext from "./AppContext";

global.fetch = jest.fn();

const membersData = [
  { name: "john" }
];

const statusesData = [
  { name: "john" }
];

const statusTypesData = [
  { name: "john" }
];

const mockApiResponse = (data) => {
  return Promise.resolve({
    json: () => Promise.resolve(data),
  });
};

describe("App", () => {
  beforeEach(() => {
    global.fetch.mockReset();
  });

  it("renders error message when data fetching fails", async () => {
    global.fetch.mockRejectedValueOnce("Failed to fetch");

    // let getByText;
    // await act(async () => {
    //   const { getByText: getByTextAsync } = render(<App />);
    //   getByText = getByTextAsync;
    // });

    expect(screen.getByText("Error fetching data. Please try again later.")).toBeInTheDocument();
  });

  });