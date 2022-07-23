import ievAPI from "../config/api";

// TODO: handle all error response
export async function addCharger(data) {
  try {
    const response = await ievAPI.post("/charger/new", data);
    //console.log(response.data)
    return response.data;
  } catch (err) {
    console.log("Axios ERROR----");
    console.log(err.message);
  }
}

export async function updateCharger(data) {
  try {
    const response = await ievAPI.put("/charger/:id", data);
    //console.log(response.data)
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    console.log("Axios ERROR----");
    console.log(err.message);
  }
}

export async function deleteCharger() {
  try {
    const response = await ievAPI.delete("/charger/:id");
    //console.log(response.data)
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    console.log("Axios ERROR----");
    console.log(err.message);
  }
}

export async function getCharger() {
  try {
    const response = await ievAPI.get("/charger/:id");
    //console.log(response.data)
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    console.log("Axios ERROR----");
    console.log(err.message);
  }
}

export async function getChargers() {
  try {
    const response = await ievAPI.get("/chargers");
    console.log("THIS IS RESPONSE DATA", response.data);
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    console.log("Axios ERROR----");
    console.log(err.message);
  }
}

export async function getMyChargers() {
  try {
    const response = await ievAPI.get("/chargers/mychargers");
    console.log(response.data)
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    console.log("Axios ERROR----");
    console.log(err.message);
  }
}
