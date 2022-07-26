import ievAPI from "../config/api";

export async function getUserBookings(username) {
  try {
    const response = await ievAPI.get(`/bookings/user/${username}`);
    return response.data;
  } catch (err) {
    throw Error(err || err.response.data.error);
  }
}
