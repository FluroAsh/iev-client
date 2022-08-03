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
    console.log("bookings", bookings);
    return { message: "Booking request successfully sent" };
  } catch (err) {
    console.log(err.message);
    throw Error(err.response.data.error);
  }
}

// Host response
export async function rejectUserRequest(data) {
  try {
    await ievAPI.put("/booking/request?response=reject", data);
    return { message: `Booking ${data.BookingId} successfully rejected` };
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

export async function approveUserRequest(data) {
  try {
    await ievAPI.put("/booking/request?response=approve", data);
    return { message: `Booking ${data.BookingId} successfully approved` };
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// User response
export async function confirmBooking(data) {
  try {
    await ievAPI.put("/booking/request?response=pay", data);
    return { message: `Booking ${data.BookingId} successfully confirmed` };
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

export async function cancelBooking(data) {
  try {
    await ievAPI.put("/booking/request?response=cancel", data);
    return { message: `Booking ${data.BookingId} successfully cancelled` };
  } catch (err) {
    throw Error(err.response.data.error);
  }
}
