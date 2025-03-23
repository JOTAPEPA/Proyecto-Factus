import Axios from "axios";

const apiClient = Axios.create({
    baseURL: 'https://api-sandbox.factus.com.co',
    headers: {
        'content-type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        // Verifica si el localStorage tiene el objeto "administrador"
        const store = JSON.parse(localStorage.getItem("administrador"));
        
        if (store && store.token) {
            const token = store.token;
            console.log("Token interceptado", token);
            // Si el token existe, lo agregamos a los encabezados
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.log('Token no encontrado');
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;
