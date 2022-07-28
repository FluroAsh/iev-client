import ievAPI from "../config/api";

export async function getUserBookings(username) {
  try {
    const response = await ievAPI.get(`/bookings/user/${username}?type=bookings`);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.err);
  }
}

export async function getUserBookingRequests(username) {
  try {
    const response = await ievAPI.get(`/bookings/user/${username}?type=requests`);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.err);
  }
}
