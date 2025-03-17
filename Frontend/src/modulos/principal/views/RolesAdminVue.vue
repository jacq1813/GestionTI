<template>
    <div class="containerGod">
        <div class="opciones">
            <section class="Users">
                <h2>Usuarios</h2>
            </section>
            
        </div>
        
        <table class="table table-success table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Telefono</th>
                    <th>Tipo Empleado</th>
                    <th>Descripcion</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="employees.length == 0">
                        <td class="centrado" colspan="6">Sin personal registrado</td>
                    </tr>
                    <tr v-else v-for="(employees, index) in employees" :key="employees.ID_Emp">
                        <td>{{ employees.ID_Emp }}</td>
                        <td>{{ employees.Nombre+' '+employees.ApellidoPat+' '+employees.ApellidoMat }}</td>
                        <td>{{ new Date().getFullYear() - new Date(employees.Fecha_Nac).getFullYear() }}</td>
                        <td>{{ employees.Num_tel }}</td>
                        <td>{{ employees.ID_TipEmp }}</td>
                        <td>Accion</td>
                    </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import { useEmployees } from '../controladores/useEmployee'
    const { employees, getEmployees,getTechEmployees} = useEmployees()

    onMounted(async () =>{
        await getEmployees()

    })
</script>

<style scoped>
    h2{
        text-align: center;
        color: black;
    }

   .containerGod{
    width: 100%;
    background-color: rgb(255, 255, 255);
    padding: 1em;
    align-items: center;
    justify-content: space-between;
   }

   .table {
    width: 90%;
    justify-self: center;
   }
   
   .opciones {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin: 0 auto;
        padding: 1em;
    }
</style>