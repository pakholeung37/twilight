import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  applications: [
    { id: 0, name: "Swiper" },
    { id: 1, name: "Article List" },
    { id: 2, name: "container" },
    { id: 3, name: "Video" },
    { id: 4, name: "Map" },
    { id: 5, name: "Audio" },
    { id: 6, name: "Photo" },
    { id: 7, name: "Form" },
    { id: 8, name: "DownLoad" },
  ],
}

export default createSlice({
  name: "modules",
  initialState,
  reducers: {},
}).reducer
