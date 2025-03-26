import Axios from "axios";
import { administrador } from "../store/useAuth.js"

const apiClient = Axios.create({
    baseURL: 'https://api-sandbox.factus.com.co',
    headers: {
        'content-type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const AuthStore = administrador();
        const token = AuthStore.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
    (response) => response, // Si la respuesta es correcta, la retorna
    async (error) => {
      const authStore = administrador();
  
      if (error.response && error.response.status === 401) {
        console.log(" Token expirado, intentando refrescar...");
  
        const refreshToken = authStore.refreshToken; // Obtiene el refresh_token
  
        if (!refreshToken) {
          console.error(" No hay refresh token. El usuario debe volver a autenticarse.");
          return Promise.reject(error);
        }
  
        try {
          // Intenta refrescar el token
          const refreshResponse = await axios.post("https://api-sandbox.factus.com.co/auth/refresh", {
            refresh_token: refreshToken,
          });
  
          const newToken = refreshResponse.data.access_token;
          const newRefreshToken = refreshResponse.data.refresh_token;
  
          // Actualiza el nuevo token en la tienda
          authStore.set_Token_RefreshToken(newToken, newRefreshToken);
  
          // Reintenta la solicitud original con el nuevo token
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return apiCliente(error.config);
  
        } catch (refreshError) {
          console.error("❌ No se pudo refrescar el token. Redirigir al login.");
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  export default apiClient;