<template>
    <div class="contenedor">  
        <form class="formulario">

            <section class="logo-tec">
            <img src="../../img/LOGO_TEC_PNG_OK.png" alt="Instituto Tecnológico de Culiacán">
            </section>
            <h2>Bienvenido</h2>
           
            <div class="grupo">
                <label>Correo</label>
                <input type="email" required>
            </div>
            <div class="grupo">
                <label>Contraseña</label>
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
    max-width: 500px; 
    width: 500px;
}

.formulario {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    border: 1px solid #DDD;
    border-radius: 5px;
    margin: 2em auto;
    background-color: #F9F9F9;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    
}

.grupo {
    display: flex;
    flex-direction: column;
    color: black;
    align-items:flex-start;
    justify-content: space-between;
   
}

.grupo label {
    margin-bottom: 0.5em;
    color: #7a0796;
    font-weight: bold;
    font-size: .9em;
}

h2 {
    text-align: center;
    color: black;
}

input {
    padding: 8px;
    border: 1px solid #DDD;
    border-radius: 5px; 
    width: 100%;
    
}

button {
    padding: 10px;
    background-color:  #7a0796;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: center;
    width: 100%;
}

.error {
    color: red;
    font-size: 0.9em;
    margin-top: 0.5em;
}

.logo-tec img {
    width: 50%;
    margin: 0 auto;
    
}

.logo-tec {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
}
</style>