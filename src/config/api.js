import axios from "axios";

const ievAPI = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
});

ievAPI.interceptors.request.use((req) => {
  // send the token in the request
  const token = sessionStorage.getItem("token");
  // Authorization -> Bearer token -> paste the token
  if (token) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  return req;
});

export default ievAPI;
