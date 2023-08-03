import {defineStore} from "pinia"
import axios from "axios"

export const useRutaStore = defineStore("ruta",()=>{

    const registrarRuta = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/ruta",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const buscarRuta=async()=> {
      try {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/ruta`)
         console.log(buscar.data.buscar);
         buscar.data.buscar.reverse()
         return buscar.data.buscar
      } catch (error) {
        console.log(error);
      }
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
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/ruta/${id}`, {
              origen:origen,
              destino:destino,
              salida:salida,
              tiempo:tiempo
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
          }
        };

        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`https://backend-i3b9.onrender.com/api/ruta/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }
    return{
        registrarRuta,
        buscarRuta,
        buscarRutaId,
        editarRuta,
        cambiarEstado
    }
})