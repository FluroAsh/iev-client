import ievAPI from "../config/api";

// Creates new user if data does not already exist
export async function signUp(data) {
  try {
    const response = await ievAPI.post("/auth/signup", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// Attempts to sign in with JWT Token & User input
export async function signIn(data) {
  try {
    const response = await ievAPI.post("/auth/signin", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

// Checks if the user has any valid charging stations
export async function checkHost() {
  try {
    const response = await ievAPI.get("/user/check-host");
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}
