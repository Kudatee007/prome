import { baseApi } from "./baseApi";
import type {
  Professional,
} from "./strapi.types";


export const prosApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getProfessionals: b.query<Professional[], void>({
      query: () => ({ url: "/professionals", params: { populate: "*" } }),
      transformResponse: (res: any) => {
        return res.data;
      }, 
    }),
    getProfessional: b.query<Professional | null, number | string>({
      query: (documentId) => ({
        url: `/professionals/${documentId}`,
        params: { populate: "*" },
      }),
      transformResponse: (res: any) => {
        return res.data || null;
      },
    }),
  }),
});

export const { useGetProfessionalsQuery, useGetProfessionalQuery } = prosApi;
