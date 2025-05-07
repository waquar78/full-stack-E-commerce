import { createSlice } from "@reduxjs/toolkit";

const authSlice=createSlice({
   name:"user",
   initialState:{
    user:null,
    isAuthenticated:false
   },

   reducers:{
    setUser:(state,action)=>{
        state.user=action.payload;
    },
    userLogout:(state,action)=>{
        state.user=null,
        state.isAuthenticated=false
    }
   }
})
export const {setUser,userLogout}=authSlice.actions;
export default authSlice.reducer