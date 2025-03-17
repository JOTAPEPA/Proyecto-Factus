import apiClient from "../plugins/axios";
// Crear una instancia de axios


// Interceptor para agregar el token de autenticación a todas las solicitudes


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
