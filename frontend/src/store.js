import { configureStore } from "@reduxjs/toolkit";
import { demoApiSlice,userApiSlice } from "./Features/apiSlice";
export const store = configureStore({
  reducer: {
    [demoApiSlice.reducerPath]: demoApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(demoApiSlice.middleware)
      .concat(userApiSlice.middleware),
});

export default store;
