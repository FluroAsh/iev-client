import ievAPI from "../config/api";

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

export async function createUserBookingRequest(bookings) {
  try {
    await ievAPI.post("/booking/new", bookings);
    return { message: "Booking request successfully sent" };
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// Host response
export async function rejectUserRequest(data) {
  try {
    const response = await ievAPI.put("/booking/request?response=reject", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

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

// User response
export async function confirmBooking(data) {
  try {
    const response = await ievAPI.put("/booking/request?response=pay", data);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

export async function cancelBooking(data) {
  try {
    const response = await ievAPI.put("/booking/request?response=cancel", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}
