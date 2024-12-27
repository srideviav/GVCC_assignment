import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../const/endpoints";

export const apiSlice = createApi({
  reducerPath: "api",  
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),  
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/users",  
    }),
  }),
});

export const { useFetchUsersQuery } = apiSlice;
