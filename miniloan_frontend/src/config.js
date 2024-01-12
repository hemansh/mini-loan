import axios from "axios";

let ip=window.location.hostname
const finalurl='http://'+ip+':3001/api/'
export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: finalurl
})