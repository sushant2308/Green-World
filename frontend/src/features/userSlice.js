import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name:"user",
  initialState : {
    user: null,
    isloggedin: false
  },
  reducers:{
    login : (state) => {
      state.isloggedin=true;
    },
    logout : (state) => {
      state.user=null;
      state.isloggedin=false;
    }
  },

});

export const { login,logout } = userSlice.actions;

export const loginState = state => state.user.isloggedin;

export default userSlice.reducer