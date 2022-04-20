import axios from "axios";

// let BASE_PATH = process.env.NODE_ENV === "development" ? "http://dm.appworks.officeprosuite.com" : window.location.origin;
let BASE_PATH = process.env.NODE_ENV === "development" ? "http://dm.appworks.officeprosuite.com" : "http://dm.appworks.officeprosuite.com";

const api = axios.create({
    baseURL: `${BASE_PATH}/DataManager/Api/`,
});

export default api;
