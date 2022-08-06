
import { useReducer } from "react";
import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { StateContext } from "../context/stateContext";
import { MemoryRouter } from "react-router-dom";

import { reducer } from "../utils/reducer";

const { fetchData, ViewChargers } = require("../pages/ViewChargers");

// chargerList when at location.pathname / or /chargers (getChargers API called)
const allChargers = [
  {
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
  },
  {
    id: 3,
    name: "Ash's Jest Charger 1",
    instructions: "Go to basement and plug in",
    price: 2500,
    status: "active",
    createdAt: "2022-08-04T22:46:31.487Z",
    updatedAt: "2022-08-04T22:46:31.487Z",
    AddressId: 2,
    UserId: 2,
    PlugId: 1,
    Address: {
      id: 2,
      address: "123 Pitt Street",
      city: "Melbourne",
      postcode: "3000",
      state: "Victoria",
      UserId: 2,
    },
    Host: {
      id: 2,
      firstName: "Ashley",
      lastName: "Thompson",
      email: "ash@test.com",
      username: "Ash",
      password: "$2b$10$9049epa84J7iL7Fj0QqSvu16QJYyW3N4FnZeQBL7aKN8cOhy6RUlC",
      createdAt: "2022-08-04T22:46:31.261Z",
      updatedAt: "2022-08-04T22:46:31.261Z",
    },
    Plug: {
      id: 1,
      plugName: "typeOne",
      createdAt: "2022-08-04T22:46:31.273Z",
      updatedAt: "2022-08-04T22:46:31.273Z",
    },
    imageUrl:
      "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T114205Z&X-Amz-Expires=3600&X-Amz-Signature=69aa22eb13c837c4701bdc83634de833d984a8ce29c46ec1005f3222ee7c3c10&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    id: 4,
    name: "Ash's Charger",
    instructions: "Go to basement and plug in",
    price: 3500,
    status: "active",
    AddressId: 2,
    UserId: 2,
    PlugId: 1,
    Host: {
      id: 2,
      firstName: "Ashley",
      lastName: "Thompson",
      email: "ash@test.com",
      username: "Ash",
    },
    Address: {
      id: 2,
      address: "123 Pitt Street",
      city: "Melbourne",
      postcode: "3000",
      state: "Victoria",
      UserId: 2,
    },
    Plug: {
      id: 1,
      plugName: "typeOne",
      createdAt: "2022-08-04T22:46:31.273Z",
      updatedAt: "2022-08-04T22:46:31.273Z",
    },
    imageUrl:
      "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T115025Z&X-Amz-Expires=3600&X-Amz-Signature=fc7f1cf9bf9c3c760c652c7ca12e322252528d9cda4ae2e53654053ac9e25177&X-Amz-SignedHeaders=host&x-id=GetObject",
  },

  {
    id: 7,
    name: "Dolore sunt vitae",
    instructions:
      "Non numquam assumenda asperiores consequatur modi. Esse et officia nihil libero cupiditate omnis quasi reiciendis.",
    price: 3904,
    status: "active",
    AddressId: 5,
    UserId: 5,
    PlugId: 1,
    Host: {
      id: 5,
      firstName: "Marta",
      lastName: "Terry",
      email: "Gulgowski.Agnes@Barton.net",
      username: "Roob_Richmond",
    },
    Address: {
      id: 5,
      address: "113 Pitt Street",
      city: "Melbourne",
      postcode: "3000",
      state: "Victoria",
      UserId: 5,
    },
    Plug: {
      id: 1,
      plugName: "typeOne",
      createdAt: "2022-08-04T22:46:31.273Z",
      updatedAt: "2022-08-04T22:46:31.273Z",
    },
    imageUrl:
      "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T115025Z&X-Amz-Expires=3600&X-Amz-Signature=fc7f1cf9bf9c3c760c652c7ca12e322252528d9cda4ae2e53654053ac9e25177&X-Amz-SignedHeaders=host&x-id=GetObject",
  },

  {
    id: 8,
    name: "Nobis ipsa",
    instructions:
      "Beatae modi et doloremque inventore blanditiis rem magnam. Fugiat rerum sapiente sed omnis accusantium. Reiciendis sit autem aliquam sint ipsum.",
    price: 2022,
    status: "active",
    AddressId: 6,
    UserId: 6,
    PlugId: 1,
    Host: {
      id: 6,
      firstName: "Kelly",
      lastName: "Olson",
      email: "Margaret_Runolfsdottir@hotmail.com",
      username: "Emelia_Lesch",
    },
    Address: {
      id: 6,
      address: "113 Pitt Street",
      city: "Melbourne",
      postcode: "3000",
      state: "Victoria",
      UserId: 6,
    },
    Plug: {
      id: 1,
      plugName: "typeOne",
      createdAt: "2022-08-04T22:46:31.273Z",
      updatedAt: "2022-08-04T22:46:31.273Z",
    },
    imageUrl:
      "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T115025Z&X-Amz-Expires=3600&X-Amz-Signature=fc7f1cf9bf9c3c760c652c7ca12e322252528d9cda4ae2e53654053ac9e25177&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
];

// chargerList when at location.pathname /chargers/mychargers level (getMyChargers API called)
const myChargers = [
  {
    id: 3,
    name: "Ash's Jest Charger 1",
    instructions: "Go to basement and plug in",
    price: 2500,
    status: "active",
    createdAt: "2022-08-04T22:46:31.487Z",
    updatedAt: "2022-08-04T22:46:31.487Z",
    AddressId: 2,
    UserId: 2,
    PlugId: 1,
    Address: {
      id: 2,
      address: "123 Pitt Street",
      city: "Melbourne",
      postcode: "3000",
      state: "Victoria",
      UserId: 2,
    },
    Host: {
      id: 2,
      firstName: "Ashley",
      lastName: "Thompson",
      email: "ash@test.com",
      username: "Ash",
      password: "$2b$10$9049epa84J7iL7Fj0QqSvu16QJYyW3N4FnZeQBL7aKN8cOhy6RUlC",
      createdAt: "2022-08-04T22:46:31.261Z",
      updatedAt: "2022-08-04T22:46:31.261Z",
    },
    Plug: {
      id: 1,
      plugName: "typeOne",
      createdAt: "2022-08-04T22:46:31.273Z",
      updatedAt: "2022-08-04T22:46:31.273Z",
    },
    imageUrl:
      "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T114205Z&X-Amz-Expires=3600&X-Amz-Signature=69aa22eb13c837c4701bdc83634de833d984a8ce29c46ec1005f3222ee7c3c10&X-Amz-SignedHeaders=host&x-id=GetObject",
  },

  {
    id: 4,
    name: "Ash's Jest Charger 2",
    instructions: "Go to basement and plug in",
    price: 3500,
    status: "active",
    createdAt: "2022-08-04T22:46:31.487Z",
    updatedAt: "2022-08-04T22:46:31.487Z",
    AddressId: 2,
    UserId: 2,
    PlugId: 1,
    Address: {
      id: 2,
      address: "123 Pitt Street",
      city: "Melbourne",
      postcode: "3000",
      state: "Victoria",
      UserId: 2,
    },
    Host: {
      id: 2,
      firstName: "Ashley",
      lastName: "Thompson",
      email: "ash@test.com",
      username: "Ash",
      password: "$2b$10$9049epa84J7iL7Fj0QqSvu16QJYyW3N4FnZeQBL7aKN8cOhy6RUlC",
      createdAt: "2022-08-04T22:46:31.261Z",
      updatedAt: "2022-08-04T22:46:31.261Z",
    },
    Plug: {
      id: 1,
      plugName: "typeOne",
      createdAt: "2022-08-04T22:46:31.273Z",
      updatedAt: "2022-08-04T22:46:31.273Z",
    },
    imageUrl:
      "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T114205Z&X-Amz-Expires=3600&X-Amz-Signature=69aa22eb13c837c4701bdc83634de833d984a8ce29c46ec1005f3222ee7c3c10&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
  {
    id: 5,
    name: "Ash's Jest Charger 3",
    instructions: "Go to basement and plug in",
    price: 4500,
    status: "pending",
    createdAt: "2022-08-04T22:46:31.487Z",
    updatedAt: "2022-08-04T22:46:31.487Z",
    AddressId: 2,
    UserId: 2,
    PlugId: 2,
    Address: {
      id: 2,
      address: "123 Pitt Street",
      city: "Melbourne",
      postcode: "3000",
      state: "Victoria",
      UserId: 2,
    },
    Host: {
      id: 2,
      firstName: "Ashley",
      lastName: "Thompson",
      email: "ash@test.com",
      username: "Ash",
      password: "$2b$10$9049epa84J7iL7Fj0QqSvu16QJYyW3N4FnZeQBL7aKN8cOhy6RUlC",
      createdAt: "2022-08-04T22:46:31.261Z",
      updatedAt: "2022-08-04T22:46:31.261Z",
    },
    Plug: {
      id: 2,
      plugName: "typeOne",
      createdAt: "2022-08-04T22:46:31.273Z",
      updatedAt: "2022-08-04T22:46:31.273Z",
    },
    imageUrl:
      "https://iev.s3.ap-southeast-2.amazonaws.com/uploads/turtle.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA5CKPHQXR7I23MRHX%2F20220805%2Fap-southeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220805T114205Z&X-Amz-Expires=3600&X-Amz-Signature=69aa22eb13c837c4701bdc83634de833d984a8ce29c46ec1005f3222ee7c3c10&X-Amz-SignedHeaders=host&x-id=GetObject",
  },
];

jest.mock("../services/chargerServices", () => ({
  // Mock data values of chargerList at location / or /chargers
  getChargers: async () => allChargers,
  // Mock data values of chargerList at location / or /chargers/mychargers
  getMyChargers: async () => myChargers,
}));

// Mock the App.js component
const TestApp = () => {
  const initialState = {
    location: {
      pathname: "/chargers",
    },
    chargerList: [],
  };

  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ store, dispatch }}>
      <MemoryRouter>
        <ViewChargers />
      </MemoryRouter>
    </StateContext.Provider>
  );
};

describe("ViewChargers component", () => {

  it("renders chargers details", async () => {

    // Use the asynchronous version of act to render resolved await
    const result = await act(async () => render(<TestApp />));

    const names = result.container.querySelectorAll("h5");
    const city = result.container.querySelectorAll("h6");
    const prices = result.container.querySelectorAll("p");

    // renders the correct amount of returned chargers in chargerList
    expect(names).toHaveLength(5);

    // render the correct details at the correct positions
    expect(names[0].textContent).toBe("Super Charger Test 1");
    expect(names[1].textContent).toBe("Ash's Jest Charger 1");

    expect(city[0].textContent).toBe("Sydney");
    expect(city[1].textContent).toBe("Melbourne");

    expect(prices[0].textContent).toBe("A$30.00");
    expect(prices[1].textContent).toBe("A$25.00");
  });
});
