// rtk.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Type guard to detect RTK Query fetch errors
function isFbqError(e: unknown): e is FetchBaseQueryError {
  return typeof e === "object" && e !== null && "status" in e;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getUser: builder.query<any, string>({
      query: (id) => `/users/${id}`,
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (e) {
          // Use runtime type guard
          if (isFbqError(e)) {
            console.error("RTK Query Error:", e.status, e.data);
          } else {
            console.error("Unknown Error:", e);
          }
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = api;
