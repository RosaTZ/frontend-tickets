import { defineStore } from "pinia";
import axios from "axios";

export const useClienteStore = defineStore("Cliente", () => {
 
  const registrarCliente = async (info) => {
    try {
      let datos = await axios.post("https://backend-i3b9.onrender.com/api/cliente", info);
      return datos;
    } catch (error) {
      console.log(error);
    }
  };

  async function buscarCliente() {
    const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/cliente`)
     console.log(buscar.data);
    return buscar.data
    }
    
    const buscarClienteCedula = async (cedula) => {
      try {
        let response = await axios.get(`https://backend-i3b9.onrender.com/api/cliente/${cedula}`, {
          params: { cedula: cedula },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
  
  const editarCliente = async (cedula, telefono) => {
    try {
      const response = await axios.put(`https://backend-i3b9.onrender.com/api/conductor:${cedula}`, {
        telefono: telefono,
      });
      return response.data;
    } catch (error) {
      console.error('Error al editar el cliente:', error);
      throw error;
    }
  };

  const eliminarCliente = async (id)=>{
    try {
      let response = await axios.delete(`mongodb+srv://apptareas:9b3eGbfT49z2TJED@ticket.gwsg10h.mongodb.net/?retryWrites=true&w=majority/api/cliente/${id}`, {
        params: { _id:id },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    registrarCliente,
    buscarCliente,
    buscarClienteCedula,
    editarCliente,
    eliminarCliente
  };
});