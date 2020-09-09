import { configureStore, combineReducers } from "@reduxjs/toolkit"
import app from "././app"
import modules from "./modules"

const rootReducer = combineReducers({
  app,
  modules,
})

export type RootState = ReturnType<typeof rootReducer>

export default configureStore({
  reducer: rootReducer,
})
