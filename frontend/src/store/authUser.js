import axios from 'axios';
import toast from 'react-hot-toast';
import {create} from 'zustand';

export const useAuthStore = create((set) => ({

    user:null,
    isSigningUp:false,
    isCheckingAuth:true,
    isLogingOut:false,
    isLogingIn:false,
    signup: async (cradentials) => {
        set({isSigningUp:true});
        try{
            const response = await axios.post("/api/v1/auth/signup",cradentials);
            set({user:response.data.user,isSigningUp:false});
            toast.success("Signup Successfully");
        }catch(e){
            toast.error(e.response.data.message || "An error occured");
            set({isSigningUp:false,user:null});
        }   
    },


    login: async (cradentials) => {
        set({isLogingIn:true});
        try{
            const response = await axios.post("/api/v1/auth/login",cradentials);
            set({user:response.data.user,isLogingIn:false});
            toast.success("LogIn Successfully");
        }catch(e){
            set({isLogingIn:false,user:null});
            toast.error(e.response.data.message || "LogIn Failed");
        }
    },  


    logout: async () => {
        set({isLogingOut:true});
        try{
            await axios.post("/api/v1/auth/logout");
            set({user:null,isLogingOut:false});
        }catch(e){
            set({isLogingOut:false});
            toast.error(e.response.data.message || "Failed logout");
        }
    },

    
    

    authCheck: async () => {
        set({isCheckingAuth:true});
        try{
            const response = await axios.get("/api/v1/auth/authCheck");
            set({user:response.data.user,isCheckingAuth:false});
        }catch(e){
            set({isCheckingAuth:false,user: null});
            // toast.error(e.response.data.message || "An error occured");
        }
    },



}));