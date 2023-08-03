import {defineStore} from "pinia"
import axios from "axios"

export const useEmpresaStore = defineStore("empresa",()=>{

    const registrarEmpresa = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/empresa",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

   const buscarEmpresa= async()=> {
    try {
      const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/empresa`)
      console.log(buscar.data.buscar);
      return buscar.data.buscar
    } catch (error) {
      console.log(error);
    } 
        }
        
        const buscarEmpresaNit = async (nit) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/empresa/${nit}`, {
              params: { nit: nit },
            });
            console.log(response.data.empresa);
            return response.data.empresa;
          } catch (error) {
            console.log(error);
          }
        };

        const editarEmpresa = async (id, nombre, direccion, telefono, propietario) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/empresa/${id}`, {
              nombre:nombre,
              direccion:direccion,
              telefono:telefono,
              propietario:propietario
            });
            console.log(response.data.response);
            return response.data.response;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
            throw error;
          }
        };

        return{
            registrarEmpresa,
            buscarEmpresa,
            buscarEmpresaNit,
            editarEmpresa
        }
      })