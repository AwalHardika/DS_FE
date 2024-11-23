import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 1000
})

// Add a request interceptor
ax.interceptors.request.use(function (config) {
  const getToken = localStorage.getItem("token")
  if (getToken) {
    config.headers['Authorization'] = `Bearer ${getToken}`
  }

  return config;
}, function (error) {

  return Promise.reject(error);
});

// Add a response interceptor
ax.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  console.log(error.response)

  if (error.response.status === 403) {
    if (error.response.data = "TokenExpiredError") {
      localStorage.removeItem("token")
      window.location.href = "/"
    }
  }
  return Promise.reject(error);
});


export default ax