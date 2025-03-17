import Axios from "axios";

const apiClient = Axios.create({
    baseURL: 'https://api-sandbox.factus.com.co',
    headers: {
        'content-type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
    const store = JSON.parse(localStorage.getItem("administrador"));
        const token = store.token;
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


export default apiClient;