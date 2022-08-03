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
    console.log("Sent!");
    return { message: "Booking request successfully sent" };
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// host
// send confirm request

// send reject request
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

// user/booker
// send pay request

// send cancel request
