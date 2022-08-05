import React from "react";
import { Router } from "react-router-dom";
import {
  fireEvent,
  getByPlaceholderText,
  render,
  screen,
} from "@testing-library/react";
import { createMemoryHistory } from "history";

import App from "../App";
import { Navbar } from "../layouts/Navbar";

describe("Searching functionality", () => {
  // ⚠️ Doeesn't work... yet!
  it("Should navigate to /searchlocation with users search query", () => {
    // need to use createMemoryHistory to track
    const history = createMemoryHistory();
    console.log(history.location);

    const router = (
      <Router history={history}>
        <App />
      </Router>
    );

    console.log(router);

    fireEvent.submit(getByText("Where to?"), "Melbourne"); // 💥
    expect(history.location.pathnamename).toBe("/search?location=Melbourne");
  });
});

// fireEvent.userEvent(screen.getByPlaceholderText("Where to?"), "Melbourne");
// console.log(history.location.pathname);
// expect(history,location.pathname).toBe('/search?location=Melbourne')
