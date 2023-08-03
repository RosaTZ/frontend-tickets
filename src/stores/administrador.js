import {defineStore} from "pinia"
import axios from "axios"

export const useAdminStore = defineStore("admin",()=>{

    const validarAdministrador = async ({email,password}) =>{
        try {
            let datos = await axios.post(`https://backend-i3b9.onrender.com/api/administrador/token`,{email,password});
            //---------LOCALSTORAGE------------
            // const token = datos.data.token;
            // localStorage.setItem('token', token);

            //-------------SESSIONSTORAGE---------
            const token = datos.data.token;;
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return datos
        }
        catch (error){
        console.log(error);
        }
    }
   
    
    return{
        validarAdministrador
    }
})