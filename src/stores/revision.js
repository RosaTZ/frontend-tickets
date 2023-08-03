import {defineStore} from "pinia"
import axios from "axios"

export const useRevisionStore = defineStore("revision",()=>{
    let data= ""

    const registrarRevision = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/revision",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const buscarRevision= async()=> {
      try {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/revision`)
        console.log(buscar.data.buscar);
        buscar.data.buscar.reverse()
        return buscar.data.buscar
      } catch (error) {
        console.log(error);
      }
        }
        
        const buscarRevisionId = async (id) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/revision/${id}`, {
              params: { _id: id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };

        const editarRevision = async (id, tecnomecanica, fecha_proxima_revision) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/revision/${id}`, {
             tecnomecanica:tecnomecanica,
             fecha_proxima_revision:fecha_proxima_revision
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
          }
        };
        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`https://backend-i3b9.onrender.com/api/revision/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }

    return{
        registrarRevision,
        buscarRevision,
        buscarRevisionId,
        editarRevision,
        cambiarEstado
    }
})