import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authRoutes/authRoutesSlice.js";
import authRoutesApi from "./features/authRoutes/authRoutesApi.js";
import productsApi from "./features/products/productsApi";

export const store = configureStore({
  reducer: {
  
    [authRoutesApi.reducerPath]: authRoutesApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authRoutesApi.middleware,
      productsApi.middleware,
    ),
});