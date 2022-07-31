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

export async function checkHost() {
  try {
    const response = await ievAPI.get("/user/check-host");
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
}
