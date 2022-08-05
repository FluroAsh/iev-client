import ievAPI from "../config/api";

export async function createStripeSession(booking) {
  try {
    const response = await ievAPI.post("/create-checkout-session", booking);
    //TODO: handle response redirect
    return response.data;
  } catch (err) {
    console.log(err);
    // throw Error(err.response.data.error);
  }
}
