import ievAPI from "../config/api";

export async function signUp(data) {
  try {
    const response = await ievAPI.post("/auth/signup", data);
    return response.data;
  } catch (err) {
    console.log("Axios ERROR----");
    console.error(err.response.data);
  }
}

export async function signIn(data) {
  console.log(data);
  const response = await ievAPI.post("/auth/signin", data);
  return response.data;
}
