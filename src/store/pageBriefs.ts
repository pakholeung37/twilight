import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  pages: [
    { id: 0, name: "index" },
    { id: 1, name: "custom 1" },
    { id: 2, name: "custom 2" },
  ],
  activePageIndex: -1,
};

export default createSlice({
  name: "pageBriefs",
  initialState,
  reducers: {},
}).reducer;
