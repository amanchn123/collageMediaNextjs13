'use client'
const { createSlice } = require("@reduxjs/toolkit");


const localData = localStorage.getItem("LoginDetails")
const parsedLocalData = JSON.parse(localData);


const CreateSliceAuth=createSlice({
  
    name:"auth",
    initialState:{
      Loggedin:false,
      user:localData?parsedLocalData:null,
      error:null
    },
    reducers:{
        Register:(state,action)=>{
           state.Loggedin=false,
           state.sugnupuser=action.payload,
           state.error=false 
        },

       Login:(state,action)=>{
          state.Loggedin=true,
          state.user=action.payload,
          state.error=false
       },

       logout: (state) => {
        state.Loggedin = false;
        state.user = null;
        state.error = null;
      }, 
    }
})

export const { Login,Register, logout } = CreateSliceAuth.actions;
export default CreateSliceAuth.reducer;