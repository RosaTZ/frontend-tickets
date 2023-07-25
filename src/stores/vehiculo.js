import {defineStore} from "pinia"
import axios from "axios"

export const useVehiculoStore = defineStore("vehiculo",()=>{
    let data= ""

    const registrarVehiculo = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/vehiculo",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    async function buscarVehiculo() {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/api/vehiculo`)
         console.log(buscar);
        }
        
        const buscarVehiculoId = async (id) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/api/vehiculo/${id}`, {
              params: { _id: id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };

        const editarVehiculo = async (id, propietario, num_vehiculo ) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/api/ticket/:${id}`, {
             propietario, num_vehiculo
            });
            return response.data;
          } catch (error) {
            console.error('Error al editar el cliente:', error);
            throw error;
          }
        };

        const eliminarVehiculo = async (id)=>{
          try {
            let response = await axios.delete(`https://backend-i3b9.onrender.com/api/vehiculo/${id}`, {
              params: { _id:id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        }

    return{
        registrarVehiculo,
        buscarVehiculo,
        buscarVehiculoId,
        editarVehiculo,
        eliminarVehiculo
    }
})