import React from "react";
import { Router } from "react-router-dom";
import {
  fireEvent,
  getByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";

import { SearchBar } from "../layouts/SearchBar";

const searchQuery = "Melbourne";

describe("Searching functionality", () => {
  it("submits user input when focused and Enter key is pressed", async () => {
    render(<SearchBar />);
    const searchBar = await screen.findByPlaceholderText("Where to...?");
    console.log(searchBar);
  });

  //
});

// fireEvent.userEvent(screen.getByPlaceholderText("Where to?"), "Melbourne");
// console.log(history.location.pathname);
// expect(history,location.pathname).toBe('/search?location=Melbourne')
