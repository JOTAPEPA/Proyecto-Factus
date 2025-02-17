import apiClient from "../plugins/axios.js";

export async function getData(url) {
    try{
        const response = await apiClient.get(url);
        return response.data
    } catch (error) {
        console.error("Error en la peticion Get:", error.response ? error.response.data : error.message);
        throw error;
    }
}