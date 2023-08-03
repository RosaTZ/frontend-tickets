import {defineStore} from "pinia"
import axios from "axios"

export const useVehiculoStore = defineStore("vehiculo",()=>{

    const registrarVehiculo = async(info)=>{
        try {
            const datos = await axios.post("https://backend-i3b9.onrender.com/vehiculo",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const buscarVehiculo= async () => {
      try {
        const buscar= await axios.get(`https://backend-i3b9.onrender.com/vehiculo`)
        console.log(buscar.data);
        return buscar.data
      } catch (error) {
        console.log(error);
      }
        }
        
        const buscarVehiculoId = async (id) => {
          try {
            let response = await axios.get(`https://backend-i3b9.onrender.com/vehiculo/${id}`, {
              params: { _id: id },
            });
            console.log(response.data);
            return response.data;
          } catch (error) {
            console.log(error);
          }
        };

        const editarVehiculo = async (id,placa,num_vehiculo, propietario  ) => {
          try {
            const response = await axios.put(`https://backend-i3b9.onrender.com/vehiculo/${id}`, {
              placa:placa,
              num_vehiculo:num_vehiculo,
              propietario:propietario
            });
            console.log(response);
            return response;
          } catch (error) {
            console.error('Error al editar el vehiculo:', error);
          }
        };

        const cambiarEstado= async (id,estado)=>{
          try {
            let res= await axios.patch(`https://backend-i3b9.onrender.com/vehiculo/${id}`,
            {estado:estado})
            console.log(res.data);
            return res.data
          } catch (error) {
            console.log(error);
          }
            }

    return{
        registrarVehiculo,
        buscarVehiculo,
        buscarVehiculoId,
        editarVehiculo,
        cambiarEstado
    }
})