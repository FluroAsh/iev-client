import { useReducer, useState } from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { StateContext } from "../context/stateContext";
import { MemoryRouter } from "react-router-dom";

import { reducer } from "../utils/reducer";
import { ViewCharger } from "../pages/ViewCharger";

// chargerList when at location.pathname / or /chargers (getChargers API called)
const charger = {
  id: 1,
  name: "Super Charger Test 1",
  instructions: "Go to basement and plug in",
  price: 3000,
  status: "active",
  AddressId: 1,
  UserId: 1,
  PlugId: 1,
  Host: {
    id: 1,
    firstName: "Kim",
    lastName: "Stocker",
    email: "kim@test.com",
    username: "Kim",
  },
  Address: {
    id: 1,
    address: "1 George Street",
    city: "Sydney",
    postcode: "2000",
    state: "New South Wales",
    UserId: 1,
  },
  Plug: {
    id: 1,
    plugName: "typeOne",
    createdAt: "2022-08-04T22:46:31.273Z",
    updatedAt: "2022-08-04T22:46:31.273Z",
  },
  imageUrl:
    "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T115025Z&X-Amz-Expires=3600&X-Amz-Signature=fc7f1cf9bf9c3c760c652c7ca12e322252528d9cda4ae2e53654053ac9e25177&X-Amz-SignedHeaders=host&x-id=GetObject",
};

jest.mock("../services/chargerServices", () => ({
  // Mock data values of a charger detail received from getCharger axios API call function
  getCharger: async () => charger,
}));

describe("ViewCharger page and ChargerDetail component", () => {
  it("renders a charger details in the eye of a host", async () => {
    // Mock the App.js component
    const TestApp = () => {
      const [charger, setCharger] = useState();
      const initialState = {
        loggedInUser: "Kim",
      };

      const [store, dispatch] = useReducer(reducer, initialState);

      return (
        <StateContext.Provider value={{ store, dispatch }}>
          <MemoryRouter>
            <ViewCharger />
          </MemoryRouter>
        </StateContext.Provider>
      );
    };
    // Use the asynchronous version of act to render resolved await
    const result = await act(async () => render(<TestApp />));

    const name = result.container.querySelectorAll("h5");
    const priceCityStatus = result.container.querySelectorAll("h6");
    const buttons = result.container.querySelectorAll("button");

    // render the correct details at the correct positions
    expect(name[0].textContent).toBe("Super Charger Test 1");
    expect(priceCityStatus[0].textContent).toBe("A$30.00");
    expect(priceCityStatus[1].textContent).toBe("Sydney");
    expect(priceCityStatus[2].textContent).toBe("Charger Status: Active");

    // render the correct button depends on the loggedInUser and Host user
    // render Edit button as host is the same with loggedInUser
    expect(buttons[0].textContent).toBe("Edit");
    expect(buttons[1].textContent).toBe("Delete");
  });


  it("renders a charger details in the eye of a user (not owner)", async () => {
    // Mock the App.js component
    const TestApp = () => {
      const [charger, setCharger] = useState();
      const initialState = {
        loggedInUser: "Ash",
      };

      const [store, dispatch] = useReducer(reducer, initialState);

      return (
        <StateContext.Provider value={{ store, dispatch }}>
          <MemoryRouter>
            <ViewCharger />
          </MemoryRouter>
        </StateContext.Provider>
      );
    };
    // Use the asynchronous version of act to render resolved await
    const result = await act(async () => render(<TestApp />));

    const name = result.container.querySelectorAll("h5");
    const priceCityStatus = result.container.querySelectorAll("h6");
    const buttons = result.container.querySelectorAll("button");

    // render the correct details at the correct positions
    expect(name[0].textContent).toBe("Super Charger Test 1");
    expect(priceCityStatus[0].textContent).toBe("A$30.00");
    expect(priceCityStatus[1].textContent).toBe("Sydney");
    expect(priceCityStatus[2].textContent).toBe("Charger Status: Active");

    // render Book button as loggedInUser is Ash not Kim(owner)
    expect(buttons[0].textContent).toBe("Book");
  });
});
