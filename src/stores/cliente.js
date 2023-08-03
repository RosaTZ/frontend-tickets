import { defineStore } from "pinia";
import axios from "axios";

export const useClienteStore = defineStore("Cliente", () => {
 let errors=[]
  const registrarCliente = async (info) => {
    try {
      let datos = await axios.post("https://backend-i3b9.onrender.com/api/cliente", info);
      console.log(datos);
      return datos;
    } catch (error) {
      // errors=[]
      error.response.data.errors.forEach(e => {
        errors.push(e.msg)
      });

    }
  };
  const buscarCliente= async()=> {
    try {
      const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/cliente`)
     console.log(buscar.data.buscar);
     return buscar.data.buscar
    
    } catch (error) {
      return error.response.data
    }
    }
    
    const buscarClienteCedula = async (cedula) => {
      try {
        let response = await axios.get(`https://backend-i3b9.onrender.com/api/cliente/${cedula}`, {
          params: { cedula: cedula },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        return error.response.data
      }
    };
  
  const editarCliente = async (id, telefono) => {
    try {
      const response = await axios.put(`https://backend-i3b9.onrender.com/api/cliente/${id}`, {
        telefono:telefono
      });
      return response;
    } catch (error) {
      return error.response.data
    }
  };

  const cambiarEstado= async (id,estado)=>{
try {
  let res= await axios.patch(`https://backend-i3b9.onrender.com/api/cliente/${id}`,
  {estado:estado})
  console.log(res.data);
  return res.data
} catch (error) {
  return error.response.data
}
  }

  return {
    registrarCliente,
    errors,
    buscarCliente,
    buscarClienteCedula,
    editarCliente,
    cambiarEstado
  };
});