import { defineStore } from "pinia";
import { ref } from "vue";

export const administrador = defineStore("administrador", () => {
    const token = ref("");
    const refreshToken = ref("");
    const userName = ref("");


    function set_Token_RefreshToken(Token, RefreshToken) {
        if (Token && RefreshToken) {
            token.value = Token;
            refreshToken.value = RefreshToken;

            // Guardamos en localStorage para persistir el estado
            localStorage.setItem("administrador", JSON.stringify({ token: Token, refreshToken: RefreshToken }));
            console.log("token guardado", Token);
        } else {
            console.log("No se proporcionaron token o refreshToken");
        }
    }

    function setUserName(email){
        userName.value = email;
      }

      function logout() {
        token.value = "";
        refreshToken.value = "";
        userName.value = "";
  
        localStorage.removeItem("administrador");
      }

    return {
        token,
        refreshToken,
        userName,
        set_Token_RefreshToken,
        logout,
        setUserName
    };  

}, {
   persist: true, // Asegúrate de que la persistencia esté habilitada
});
