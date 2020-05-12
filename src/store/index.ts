import { configureStore, combineReducers } from "@reduxjs/toolkit";
import pageBriefs from "./pageBriefs";
import modules from "./modules";

const rootReducer = combineReducers({
  pageBriefs,
  modules,
});

export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
