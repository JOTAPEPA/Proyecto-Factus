<template>
    <div class="container">
        <div class="containerLogin">
            <div class="titleContainerLogin">
                <h3 style="color: rgb(0,62,133);">Iniciar Sesion</h3>
            </div>
            <div class="inputContainerLogin">
                <input type="text" placeholder="Usuario" v-model="email" />
                <input type="password" placeholder="Contraseña" v-model="password"/>
                <button @click="login" :disabled="loading">
                    <span v-if="loading"> Cargando...</span>
                    <span v-else> Iniciar Sesion</span>
                </button>
            </div>

        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {postData} from '../services/apiClient'

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)

const login = async () => {
    loading.value = true

    const data = {
        username: email.value,
        password: password.value,
        grant_type: 'password',
        client_id: import.meta.env.VITE_VUE_APP_CLIENT_ID,
        client_secret: import.meta.env.VITE_VUE_APP_CLIENT_SECRET,
    }

    console.log('enviando solicitud:', data);

    try{
        const response = await postData('/oauth/token', data)
        console.log('respuuesta recibida:', response);
        router.replace('/home')
    } catch (error) {
        console.log('error al iniciar sesion', error);  
    }
    loading.value = false
}

</script>

<style>
#header {
    display: none;
}

.q-page-container{
    background-image:url('https://www.blogdelfotografo.com/wp-content/uploads/2021/12/fondo_blanco_gris.webp');
    background-size: cover;
}

.container {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
}

.containerLogin {
    display: grid;
    background-color: rgba(241, 241, 241, 0.8);
    width: 700px;
    height: 500px;
    animation: fadeIn 1s ease-in-out;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 15px;

}

.containerLogin:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.titleContainerLogin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    border-radius: 15px 15px 0 0;
}

.inputContainerLogin {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 400px;

}

.inputContainerLogin input {
    width: 300px;
    height: 50px;
    margin: 10px;
    padding: 10px;
    border: none;
    border-bottom: 1px solid rgb(103,116,133);
    outline: none;
    border-radius: 5px;
}

.inputContainerLogin button {
    width: 300px;
    height: 50px;
    margin: 10px;
    padding: 10px;
    border: none;
    background-color: rgb(0,62,133);
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.inputContainerLogin button:hover {
    background-color: #415A77;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>

c