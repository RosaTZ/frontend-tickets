import {defineStore} from "pinia"
import axios from "axios"

export const useConductorStore = defineStore("conductor",()=>{
    let data= ""

    const registrarConductor = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/conductor",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }
    async function buscarConductor() {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/conductor`)
         console.log(buscar);
        }
        
        const buscarConductorCedula = async (cedula) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/conductor/${cedula}`, {
              params: { cedula: cedula },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };
        const editarConductor = async (cedula,
          nombre,
          apellidos,
          telefono,
          licencia,
          direccion,
          estado_civil
          ) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/conductor/:${cedula}`, {
              nombre:nombre,
              apellidos:apellidos,
              telefono:telefono,
              licencia:licencia,
              direccion:direccion,
              estado_civil: estado_civil
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
            throw error;
          }
        };
        const eliminarConductor = async (id)=>{
          try {
            let response = await axios.delete(`https://backend-i3b9.onrender.com/api/conductor/${id}`, {
              params: { _id:id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }
    return{
        registrarConductor,
        buscarConductor,
        buscarConductorCedula,
        editarConductor,
        eliminarConductor
    }
})