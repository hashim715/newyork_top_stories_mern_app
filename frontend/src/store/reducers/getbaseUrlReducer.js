import { createSlice } from "@reduxjs/toolkit";

const getbaseUrlReducer = createSlice({
  name: "baseUrl",
  initialState: { url: "http://localhost:5000" },
});

export default getbaseUrlReducer;
