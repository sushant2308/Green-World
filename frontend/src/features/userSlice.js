import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name:"loginstate",
  initialState : {
    loginState: false,
  },
  reducers:{
    login : (state) => {
      state.loginState =true;
    },
    logout : (state) => {
      state.loginState=false;
    }
  },

});

export const { login,logout } = userSlice.actions;

export const loginState = state => state.loginState;

export default userSlice.reducer
