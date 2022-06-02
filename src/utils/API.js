import axios from "axios";

export default axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000",
    responseType: "json",
    withCredentials: true,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
    }
});