import axios from "axios";

const api = axios.create({
  baseURL: "http://secrets.desenvolvedor.tech/api",
});

// function store(message, password) {
//   return api
//     .post("/store", { message: message, password: password })
//     .then((response) => response.data)
//     .catch((err) => {
//       console.error("ops! ocorreu um erro" + err);
//     });
// }

export default api;
