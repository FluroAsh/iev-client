import ievAPI from "../config/api";

export async function signUp(data) {
  try {
    const response = await ievAPI.post("/auth/signup", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}

export async function signIn(data) {
  try {
    const response = await ievAPI.post("/auth/signin", data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}
