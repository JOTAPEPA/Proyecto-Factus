import Axios from "axios";

const token = JSON.parse(localStorage.getItem("auth"));

if (token) {
    console.log("token encontrado", token);
} else {
    console.log("token no encontrado");
}

console.log("mitoken", token);

const apiClient = Axios.create({
    baseURL: 'https://api-sandbox.factus.com.co/',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

export default apiClient;