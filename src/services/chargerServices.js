import ievAPI from "../config/api";

// TODO: handle all error response
export async function addCharger(data) {
  try {
    const response = await ievAPI.post("/charger/new", data);
    // console.log("ADD CHARGER DATA AFTER SUBMIT", response.data)
    return response.data;
  } catch (err) {
    // console.log("Axios ERROR----");
    // console.log(err.message);
    // throw Error(err.response.data.error);
    return err.message

  }
}

export async function updateCharger(data, id) {
  try {
    const response = await ievAPI.put(`/charger/${id}`, data);
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    // throw Error(err.response.data.error);
    return err.message

  }
}

export async function updateChargerStatus(data, id) {
  try {
    await ievAPI.patch(`/charger/${id}`, data);
    return { message: "Charger successfully updated!" };
  } catch (err) {
    // throw Error(err.response.data.error);
    return err.message

  }
}

export async function deleteCharger(id) {
  try {
    await ievAPI.delete(`/charger/${id}`);
    return { message: `Charger ${id} successfully deleted` };
  } catch (err) {
    // throw Error(err.response.data.error);
    return err.message

  }
}

export async function getCharger(id) {
  try {
    const response = await ievAPI.get(`/charger/${id}`);
    // console.log("THIS IS RESPONSE DATA", response.data);
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    // throw Error(err.response.data.error);
    return err.message
  }
}

export async function getChargers() {
  try {
    const response = await ievAPI.get("/chargers");
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    return err.message;
  }
}

export async function getMyChargers() {
  try {
    const response = await ievAPI.get("/chargers/mychargers");
    // console.log(response.data)
    // TODO: Check what comes back from the data to handle messages
    return response.data;
  } catch (err) {
    return err.message;
  }
}
