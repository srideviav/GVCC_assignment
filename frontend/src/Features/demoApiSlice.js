import { demoApiSlice } from "./apiSlice";
import { API_URL } from "../const/endpoints";
 

export const DemoApiSlice = demoApiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
    useDemoApiUserQuery,
} = DemoApiSlice;