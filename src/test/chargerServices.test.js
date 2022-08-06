const ievAPI = require("../config/api");
const { getChargers, getCharger, getMyChargers, addCharger,updateCharger, deleteCharger, updateChargerStatus } = require("../services/chargerServices");

jest.mock("../config/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
}));

describe("getChargers function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("call a axios get API request", async () => {

    // Mock axios get request
    const apiSpy = jest.spyOn(ievAPI, "get");

    await getChargers();
    expect(apiSpy).toHaveBeenCalledTimes(1);
  });

  
});

describe("addCharger function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("call a axios post API request", async () => {

    // Mock axios get request
    const apiSpy = jest.spyOn(ievAPI, "post");

    await addCharger();
    expect(apiSpy).toHaveBeenCalledTimes(1);
  });

  
});

describe("updateCharger function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("call a axios put API request", async () => {

    // Mock axios get request
    const apiSpy = jest.spyOn(ievAPI, "put");

    await updateCharger();
    expect(apiSpy).toHaveBeenCalledTimes(1);
  });

  
});

describe("deleteCharger function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("call a axios delete API request", async () => {

    // Mock axios get request
    const apiSpy = jest.spyOn(ievAPI, "delete");

    await deleteCharger();
    expect(apiSpy).toHaveBeenCalledTimes(1);
  });

  
});

describe("updateChargerStatus function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("call a axios patch API request", async () => {

    // Mock axios get request
    const apiSpy = jest.spyOn(ievAPI, "patch");

    await updateChargerStatus();
    expect(apiSpy).toHaveBeenCalledTimes(1);
  });

  
});

describe("getCharger function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("call a axios get API request", async () => {

    // Mock axios get request
    const apiSpy = jest.spyOn(ievAPI, "get");

    await getCharger();
    expect(apiSpy).toHaveBeenCalledTimes(1);
  });

  
});

describe("getMyChargers function", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("call a axios get API request", async () => {

    // Mock axios get request
    const apiSpy = jest.spyOn(ievAPI, "get");

    await getMyChargers();
    expect(apiSpy).toHaveBeenCalledTimes(1);
  });

  
});

