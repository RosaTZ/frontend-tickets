import {defineStore} from "pinia"
import axios from "axios"

export const useAdminStore = defineStore("admin",()=>{
    let data= ""

    const registrarAdmin = async(info)=>{
        try {
            let datos = await axios.post("https://backend-i3b9.onrender.com/api/administrador",info)
            return datos
        } catch (error) {
            console.log(error);
        }
    }

    const buscarCliente = async (info) =>{
        try {
            let datos = await axios.get("https://backend-i3b9.onrender.com/api/administrador",info)
        return datos
        }
        catch (error){
console.log(error);
        }
    }

    return{
        registrarAdmin,
        buscarCliente
    }
})