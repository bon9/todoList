import axios from "axios";

const instance = axios.create({
  baseURL: "https://todolistbon9.firebaseio.com/"
});

export default instance;
