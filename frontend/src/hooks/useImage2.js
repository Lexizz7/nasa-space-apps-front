import axios from "axios";

const instance = axios.create({
  baseURL: "http://10.101.0.19:6789/api/spacedle",
});

export default instance;
