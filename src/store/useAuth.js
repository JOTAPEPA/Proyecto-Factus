import { defineStore } from "pinia";

export const useAuth = defineStore('auth',{
    state: () => ({
        token: sessionStorage.getItem('token') || null,
        user: null,
        token: null,
    }),

    persist: true
})
