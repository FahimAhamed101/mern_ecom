import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authRoutes/authRoutesSlice.js";
import authRoutesApi from "./features/authRoutes/authRoutesApi.js";


export const store = configureStore({
  reducer: {
  
    [authRoutesApi.reducerPath]: authRoutesApi.reducer,
    auth: authReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authRoutesApi.middleware,
      
    ),
});