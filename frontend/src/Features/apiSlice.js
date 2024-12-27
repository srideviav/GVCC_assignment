import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL , BASE_URL} from "../const/endpoints";

export const demoApiSlice = createApi({
  reducerPath: "demoapi",  
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),  
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/users",  
    }),
  }),
});

export const userApiSlice = createApi({
  reducerPath: "userapi",  
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),  
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/",  
    }),
  }),
});

export const { useFetchUsersQuery } = userApiSlice;
 export const { useDemoAPIQuery } = demoApiSlice;
