import {defineStore} from "pinia"
import axios from "axios"

export const useTicketStore = defineStore("ticket",()=>{

    const registrarTicket = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/ticket",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const buscarTicket= async () => {
      try {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/ticket`)
buscar.data.buscar.reverse()
        return buscar.data.buscar
      } catch (error) {
        console.log(error);
      }
        }
        
        const buscarTicketId = async (id) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/ticket/${id}`, {
              params: { _id: id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };

        const editarTicket = async (id,fecha_venta,
          fecha_salida,
          hora_salida,
          duracion,
          cliente,
          vehiculo,
          ruta,
          numero_puesto) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/ticket/${id}`, {
              fecha_venta:fecha_venta,
              fecha_salida:fecha_salida,
              hora_salida:hora_salida,
              duracion:duracion,
              cliente:cliente,
              vehiculo:vehiculo,
              ruta:ruta,
              numero_puesto:numero_puesto
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el Ticket:', error);
          }
        };
        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`https://backend-i3b9.onrender.com/api/ticket/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }

    return{
        registrarTicket,
        buscarTicket,
        buscarTicketId,
        editarTicket,
        cambiarEstado
    }
})