import {defineStore} from "pinia"
import axios from "axios"

export const useTicketStore = defineStore("ticket",()=>{
    let data= ""

    const registrarTicket = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/ticket",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    async function buscarTicket() {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/ticket`)
         console.log(buscar);
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

        const editarTicket = async (id, fecha_salida) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/ticket/:${id}`, {
              fecha_salida
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
            throw error;
          }
        };

        const eliminarTicket = async (id)=>{
          try {
            let response = await axios.delete(`https://backend-i3b9.onrender.com/api/ticket/${id}`, {
              params: { _id:id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }

    return{
        registrarTicket,
        buscarTicket,
        buscarTicketId,
        editarTicket,
        eliminarTicket
    }
})