import apiClientBackend from "../plugins/axiosBackend.js";

export async function getDataBackend(url){
    try{
        const response = await apiClientBackend.get(url);
        return response.data
    } catch (error){
        console.log("Error en la peticion Get:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export async function postDataBackend(url, data){
    try{
        const response = await apiClientBackend.post(url, data);
        return response.data
    } catch (error){
        console.log("Error en la peticion POST", error.response ? error.response.data : error.message);
        throw error;
    }
}