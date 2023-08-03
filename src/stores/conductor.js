import { defineStore } from "pinia";
import axios from "axios";

export const useConductorStore = defineStore("conductor", () => {
  const registrarConductor = async (info) => {
    try {
      let datos = await axios.post("https://backend-i3b9.onrender.com/api/conductor", info);
      return datos;
    } catch (error) {
      console.log(error);
    }
  };
  const buscarConductor = async () => {
    try {
      const buscar = await axios.get(`https://backend-i3b9.onrender.com/api/conductor`);
      buscar.data.buscar.reverse()
      return buscar.data.buscar;
    } catch (error) {
      console.log(error);
    }
  };

  const buscarConductorCedula = async (cedula) => {
    try {
      let response = await axios.get(
        `https://backend-i3b9.onrender.com/api/conductor/${cedula}`,
        {
          params: { cedula: cedula },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const editarConductor = async (
    id,
    telefono,
    direccion,
    estado_civil,
    licencia,
    categoria_licencia
  ) => {
    try {
      const response = await axios.put(
        `https://backend-i3b9.onrender.com/api/conductor/${id}`,
        {
          telefono: telefono,
          direccion: direccion,
          estado_civil: estado_civil,
          licencia: licencia,
          categoria_licencia: categoria_licencia,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error al editar el cliente:", error);
      throw error;
    }
  };
  const cambiarEstado = async (id, estado) => {
    try {
      let res = await axios.patch(`https://backend-i3b9.onrender.com/api/conductor/${id}`, {
        estado: estado,
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    registrarConductor,
    buscarConductor,
    buscarConductorCedula,
    editarConductor,
    cambiarEstado,
  };
});