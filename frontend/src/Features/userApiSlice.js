import { userApiSlice } from "./apiSlice";
import { REGISTER_URL } from "../const/endpoints";
import { LOGIN_URL } from "../const/endpoints";
import { GET_URL } from "../const/endpoints";

export const UsersApiSlice = userApiSlice.injectEndpoints({
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
        query: (formData) => ({
          url: LOGIN_URL,
          method: "POST",
          body: { ...formData },
        }),
        transformErrorResponse: (response) => {
          return response; // You can customize the error response transformation here.
        },
        transformResponse: (response) => {
          return response; // You can customize the successful response transformation here.
        },
    }),
    getUser: builder.query({
        query: () => ({
          url: GET_URL,
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
         }),
        transformErrorResponse: (response) => {
          return response; // You can customize the error response transformation here.
        },
        transformResponse: (response) => {
          return response; // You can customize the successful response transformation here.
        },
    }),
  }),
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useGetUserQuery,
 } = UsersApiSlice;