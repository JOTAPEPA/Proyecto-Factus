<template>
    <div class="container">
        <div class="containerLogin">
            <div class="titleContainerLogin">
                <h3>Iniciar Sesion</h3>
            </div>
            <div class="inputContainerLogin">
                <input type="text" placeholder="Usuario" />
                <input type="password" placeholder="Contraseña" />
                <button>Iniciar Sesion</button>
            </div>

        </div>
    </div>
</template>

<script setup>
</script>

<style>
#header {
    display: none;
}

.container {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
}

.containerLogin {
    display: grid;
    background-color: #f1f1f1;
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
    background-color: #f1f1f1;
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
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.inputContainerLogin button:hover {
    background-color: #0056b3;
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