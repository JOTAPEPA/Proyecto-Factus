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

export  async function postData (url, data){
    try{
        const response = await apiClient.post (url, data);
        return response.data
    } catch (error){
        console.log("error en la peticion POST", error.response ? error.response.data : error.message);
        throw error;
    }
}