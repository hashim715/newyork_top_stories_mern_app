import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    access: localStorage.getItem("access")
      ? localStorage.getItem("access")
      : null,
    isLoggedIn: localStorage.getItem("access") ? true : false,
  },
  reducers: {
    login(state, action) {
      const { access } = action.payload;
      state.access = access;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.access = null;
      localStorage.removeItem("access");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
