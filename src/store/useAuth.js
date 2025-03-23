import { defineStore } from "pinia";
import { ref } from "vue";

export const administrador = defineStore("administrador", () => {
    const token = ref("");
    const refreshToken = ref("");

    function getToken() {
        return token.value;
    }

    function set_Token_RefreshToken(Token, RefreshToken) {
        if (Token && RefreshToken) {
            token.value = Token;
            refreshToken.value = RefreshToken;
            console.log("token tienda", token.value);
            console.log("refreshToken tienda", refreshToken.value);

            // Guardamos en localStorage para persistir el estado
            localStorage.setItem("administrador", JSON.stringify({ token: Token, refreshToken: RefreshToken }));
            console.log("token guardado", Token);
        } else {
            console.log("No se proporcionaron token o refreshToken");
        }
    }

    return {
        token,
        refreshToken,
        set_Token_RefreshToken,
        getToken
    };

}, {
   persist: true, // Asegúrate de que la persistencia esté habilitada
});
