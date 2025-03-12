import axios from 'axios'

const token = JSON.parse(localStorage.getItem('auth'))

if (token) {
    console.log("token encontrado", token);
} else {
    console.log("token no encontrado");
}

console.log("mitoken", token);

const apiClientBackend = axios.create({
    baseURL: 'http://localhost:3999/api/',
    headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
    },
});

export default apiClientBackend;