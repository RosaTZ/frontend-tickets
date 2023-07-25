import {defineStore} from "pinia"
import axios from "axios"

export const useRutaStore = defineStore("ruta",()=>{
    let data= ""

    const registrarRuta = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/ruta",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    async function buscarRuta() {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/ruta`)
         console.log(buscar);
        }
        
        const buscarRutaId = async (id) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/ruta/${id}`, {
              params: { _id: id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };
        const editarRuta = async (id, origen, destino, salida, tiempo) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/ruta/:${id}`, {
              origen,
              destino,salida,tiempo
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
            throw error;
          }
        };

        const eliminarRuta = async (id)=>{
          try {
            let response = await axios.delete(`https://backend-i3b9.onrender.com/api/ruta/${id}`, {
              params: { _id:id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }
    return{
        registrarRuta,
        buscarRuta,
        buscarRutaId,
        editarRuta,
        eliminarRuta
    }
})