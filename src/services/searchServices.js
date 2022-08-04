import ievAPI from "../config/api";
import axios from "axios";

export async function searchLocation(location) {
  try {
    const response = await ievAPI.get(`/search?location=${location}`);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// TODO: for reverse geocoding --> https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
// https://developers.google.com/maps/documentation/geocoding/start#reverse
export async function geocodeLocation(city) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&components=country:AU`
    );
    return response.data.results[0].geometry.location;
  } catch (err) {
    throw Error(err);
  }
}
