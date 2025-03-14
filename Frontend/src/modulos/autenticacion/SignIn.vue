<template>
    <div class="contenedor">
        <form class="formulario">
            <h2>validacion de usuario</h2>
            <div class="grupo">
                <label>Correo:</label>
                <input type="email" required>
            </div>
            <div class="grupo">
                <label>Contraseña:</label>
                <input type="password" required>
            </div>
            <div class="error">
                <span>error</span>
            </div>
            <button type="submit">
                Ingresar
            </button>
        </form>
    </div>
</template>


<style scoped>
.contenedor {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

.grupo {
    display: flex;
    flex: column;
    gap: 0.5em;
}

input {
    padding: 8px;
    border: 1px solid #DDD;
    border-radius: 5px;
}

button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.error {
    color: red;
    font-size: 0.9em;
    margin-top: 0.5em;
}
</style>