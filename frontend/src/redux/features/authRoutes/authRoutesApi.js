import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL";

const authRoutesApi = createApi({
  reducerPath: "authRoutesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/authRoutes`,
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
    
   
  }),
});

export const {
  useRegisterUserMutation,
  
} = authRoutesApi;
export default authRoutesApi;