
import axios from 'axios'

const ievAPI = axios.create({
    baseURL: "http://localhost:3000" // process.env.REACT_APP_BACKEND_URL
})

ievAPI.interceptors.request.use(req => {
    // send the token in the request
    const token = sessionStorage.getItem("token")
    // console.log(token)
    // Authorization -> Bearer token -> paste the token
    if (token) {
        req.headers["Authorization"] = `Bearer ${token}`
    }
    

    return req
})

export default ievAPI