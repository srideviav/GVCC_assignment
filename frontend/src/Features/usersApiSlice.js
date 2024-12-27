import { apiSlice } from "./apiSlice";
import { BASE_URL } from "../const/endpoints";
import { API_URL } from "../const/endpoints";
import { REGISTER_URL } from "../const/endpoints";
import { LOGIN_URL } from "../const/endpoints";
import { GET_URL } from "../const/endpoints";

export const UsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (registerData) => ({
        url: REGISTER_URL,
        method: "POST",
        body: { ...registerData },
      }),
      transformErrorResponse: (response) => {
        return response;  
      },
      transformResponse: (response) => {
        return response;  
      },
    }),
    loginUser: builder.mutation({
        query: (registerData) => ({
          url: LOGIN_URL,
          method: "POST",
          body: { ...registerData },
        }),
        transformErrorResponse: (response) => {
          return response; // You can customize the error response transformation here.
        },
        transformResponse: (response) => {
          return response; // You can customize the successful response transformation here.
        },
    }),
    getUser: builder.mutation({
        query: (registerData) => ({
          url: GET_URL,
          method: "POST",
          body: { ...registerData },
        }),
        transformErrorResponse: (response) => {
          return response; // You can customize the error response transformation here.
        },
        transformResponse: (response) => {
          return response; // You can customize the successful response transformation here.
        },
    }),
    demoApiUser: builder.query({
        query: () => ({
          url: API_URL,
          method: "GET",
        }),
        transformErrorResponse: (response) => {
            console.log("demo api err res :", response)
          return response; // You can customize the error response transformation here.
        },
        transformResponse: (response) => {
            console.log("demo api success res :", response)
          return response; // You can customize the successful response transformation here.
        },
      }),
  }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetUserMutation,
    useDemoApiUserQuery,
} = UsersApiSlice;