import { defineStore } from "pinia";
import { ref } from "vue";

export const administrador = defineStore("administrador", () => {
    const token = ref("");
    const refreshToken = ref("");

    function getToken() {
        return token.value
    }

   

    function set_Token_RefreshToken(Token, RefreshToken) {
        if (token && refreshToken) {
            token.value = Token
            refreshToken.value = RefreshToken
            console.log("token tienda", token.value);
            console.log("refreshToken ti", refreshToken.value);

            localStorage.setItem("administrador", JSON.stringify({ token: Token, refreshToken: RefreshToken }));
            console.log("token guardado", Token);
        }
        else {
            console.log("no-token no-refreshToken");
        }
    }
    return {
        token,
        refreshToken,
        set_Token_RefreshToken,
        getToken 
    }

},{
   persist: true,
})