import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      console.log("Sign   user is "+JSON.stringify(state.currentUser) )
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      console.log("Error payload in reducer:", action.payload);
      state.loading = false;
    },
    updateUserStart:(state)=>{
      state.loading = true
    },
    updateUserSuccess:(state,action)=>{
       state.currentUser = { ...state.currentUser, ...action.payload.rest };
       console.log("Updated  use is "+JSON.stringify(state.currentUser) )
       state.loading = false;
       state.error = null
    },
    updateUserFailure:(state,action)=>{
      state.error = action.payload;
      state.loading = false
    }
  },
});

export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

export default userSlice.reducer;
