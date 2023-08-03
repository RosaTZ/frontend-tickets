import {defineStore} from "pinia"
import axios from "axios"

export const useVededorStore = defineStore("vendedor",()=>{
    let data= ""

    const registrarVendedor = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/vendedor",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const buscarVendedor= async () => {
      try {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/vendedor`)
        console.log(buscar.data.buscar);
        return buscar.data.buscar
      } catch (error) {
        console.log(error);
      }
        }
        
        const buscarVendedorId = async (id) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/vendedor/${id}`, {
              params: { _id: id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };

        const editarVendedor = async (id, nombre, email, telefono, password ) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/vendedor/${id}`, {
             nombre, email, telefono, password
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
          }
        };
    return{
        registrarVendedor,
        buscarVendedor,
        buscarVendedorId,
        editarVendedor,
        editarVendedor
    }
})