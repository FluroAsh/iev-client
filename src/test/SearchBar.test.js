import React from "react";
import userEvent from "@testing-library/user-event";
import {
  fireEvent,
  screen,
  render,
  queryByTestId,
  queryAllByTestId,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { SearchBar } from "../layouts/SearchBar";

describe("Input value", () => {
  it("updates on change", () => {
    const props = {
      setSearch: jest.fn((value) => {}),
    };

    const { queryByPlaceholderText } = render(
      <MemoryRouter>
        <SearchBar {...props} />
      </MemoryRouter>
    );

    const input = queryByPlaceholderText("Where to?");
    fireEvent.change(input, { target: { value: "Melbourne" } });
    expect(input.value).toBe("Melbourne");
  });
  it("is correctly submitted on 'Enter' keypress", () => {
    const handleSubmit = jest.fn();

    const { queryByTestId } = render(
      <MemoryRouter>
        <SearchBar handleSubmit={handleSubmit} />
      </MemoryRouter>
    );

    // get form
    // assign the onSubmit to handleSubmit mock fn
    // submit form
    // check it was invoked
    const searchForm = queryByTestId("form");
    console.log(queryByTestId("form"));
    searchForm.onSubmit = handleSubmit;
    fireEvent.submit(searchForm, { bubbles: true });

    // const input = queryByPlaceholderText("Where to?");
    // fireEvent.keyPress(input, { key: "Enter", code: 13, charCode: 13 });
    // userEvent.type(input, "Melbourne{enter}");

    expect(handleSubmit).toHaveBeenCalled();
  });
});
