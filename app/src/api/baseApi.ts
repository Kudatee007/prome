import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL, JWT_STORAGE_KEY } from "../config/constants";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(JWT_STORAGE_KEY);
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
    credentials: "include", // optional; Strapi JWT is header-based
  }),
  tagTypes: ["Auth","User","Pros","Jobs","Booking"],
  endpoints: () => ({}),
});
