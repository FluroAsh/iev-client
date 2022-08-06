import ievAPI from "../config/api";

export async function addVehicle(data) {
    try {
      const response = await ievAPI.post("/vehicle/new", data);
      // console.log("ADD CHARGER DATA AFTER SUBMIT", response.data)
      return response.data;
    } catch (err) {
      // console.log("Axios ERROR----");
      // console.log(err.message);
      // throw Error(err.response.data.error);
      return err.message
  
    }
  }