import ievAPI from '../config/api';

export async function searchLocation(location) {
  try {
    const response = await ievAPI.get(`/search?location=${location}`);
    return response.data;
  } catch (err) {
    console.log(err.response.data);
  }
}
