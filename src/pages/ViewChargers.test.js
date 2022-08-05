// const { getChargers, getMyChargers } = require("../services/chargerServices");

import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Navbar } from "../layouts/Navbar";

const { fetchData, ViewChargers } = require("./ViewChargers");
const { App } = require("../");

// const {ViewChargers} = require("../layouts/Navbar")
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

jest.mock("../services/chargerServices", async () => {
  const getChargers = jest.fn().mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue(allChargers),
  });
  const getMyChargers = jest.fn().mockResolvedValue({
    status: 200,
    json: jest.fn().mockResolvedValue(myChargers),
  });
  return {getChargers, getMyChargers}
});

// chargerServices.getMyChargers.mockResolvedValue(myChargers);

describe("Charger component", () => {
  // afterEach(async () => {
  //   getChargers.mockRestore();
  // });

  it("renders all charger cards at root route", async () => {
    // mock the fetch results to be successful

    const dispatch = jest.fn();
    const setError = jest.fn();
    const setLoading = jest.fn();

    fetchData("/chargers", dispatch, setError, setLoading);

    // expect(dispatch).toHaveBeenCalled();
    // expect(dispatch).toHaveBeenCalledWith({
    //   type: "setChargerList",
    //   data: chargers,
    // })

    // jest.spyOn(global, ).mockResolvedValue({
    //   status: 200,
    //   json: jest.fn().mockResolvedValue(allChargers),
    // });

    // Use the asynchronous version of act to apply resolved promises
    const result = await act(async () => render(<ViewChargers />));
    const names = result.container.querySelectorAll("h6");
    const prices = result.container.querySelectorAll("p");

    expect(names[0].textContent).toBe("Super Charger Test 1");
    expect(names[1].textContent).toBe("Ash's Jest Charger 1");
    expect(prices[0].textContent).toBe("A$30.00");
    expect(prices[1].textContent).toBe("A$25.00");
  });
});
