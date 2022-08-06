import ievAPI from "../config/api";

// User/Host -> Get User/Hosts' bookings
export async function getUserBookings(username) {
  try {
    const response = await ievAPI.get(
      `/bookings/user/${username}?type=bookings`
    );
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// Host ->  Get Hosts' requests (must have a station, otherwise error is returned)
export async function getUserBookingRequests(username) {
  try {
    const response = await ievAPI.get(
      `/bookings/user/${username}?type=requests`
    );
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// User/Host -> Create a new booking
export async function createUserBookingRequest(bookings) {
  try {
    const res = await ievAPI.post("/booking/new", bookings);
    return res.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// Host -> Reject a User booking request
export async function rejectUserRequest(data) {
  try {
    const response = await ievAPI.put("/booking/request?response=reject", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// Host -> Approve a User booking request
export async function approveUserRequest(data) {
  try {
    const response = await ievAPI.put(
      "/booking/request?response=approve",
      data
    );
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// User -> Confirm their original booking
export async function confirmBooking(data) {
  try {
    const response = await ievAPI.put("/booking/request?response=pay", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// User  -> Cancel a Users' booking
export async function cancelBooking(data) {
  try {
    const response = await ievAPI.put("/booking/request?response=cancel", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}
