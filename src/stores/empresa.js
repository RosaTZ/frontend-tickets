import {defineStore} from "pinia"
import axios from "axios"

export const useEmpresaStore = defineStore("empresa",()=>{
    let data= ""

    const registrarEmpresa = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/empresa",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    async function buscarEmpresa() {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/empresa`)
         console.log(buscar);
        }
        
        const buscarEmpresaId = async (id) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/empresa/${id}`, {
              params: { _id: id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };

        const editarEmpresa = async (id, nombre, direccion, telefono, propietario) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/empresa/:${id}`, {
              nombre:nombre,
              direccion:direccion,
              telefono:telefono,
              direccion:propietario
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
            throw error;
          }
        };

        const eliminarEmpresa = async (id)=>{
          try {
            let response = await axios.delete(`https://backend-i3b9.onrender.com/api/empresa/${id}`, {
              params: { _id:id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }

        return{
            registrarEmpresa,
            buscarEmpresa,
            buscarEmpresaId,
            editarEmpresa,
            eliminarEmpresa
        }
})