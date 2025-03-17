import axios from 'axios';
import { administrador } from '../store/useAuth.js';

// Crear una instancia de axios
const apiClient = axios.create({
    baseURL: 'https://api-sandbox.factus.com.co/', // Asegúrate de que esta es la URL base correcta
    timeout: 10000, // Opcional: Puedes agregar un tiempo de espera (timeout) para las solicitudes
    headers: {
        "content-type": "application/json",
    }
});

// Interceptor para agregar el token de autenticación a todas las solicitudes
apiClient.interceptors.request.use(
    (config) => {
        const authStore = administrador(); // Obtener el store de autenticación
        const token = authStore.getToken(); // Obtener el token del store

        console.log("token interceptado", token);


        if (token) {
            // Si hay un token, lo agregamos a los encabezados
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.log('Token no encontrado');
        }

        return config; // Asegúrate de devolver la configuración actualizada
    },
    (error) => {
        return Promise.reject(error); // Si hay un error al configurar la solicitud, lo manejamos aquí
    }
);

// Función para hacer una solicitud GET
export async function getData(url) {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("Error en la petición GET:", error.response ? error.response.data : error.message);
        throw error;
    }
}

// Función para hacer una solicitud POST
export async function postData(url, data) {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        console.error("Error en la petición POST:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export default apiClient;
