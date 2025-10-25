import { baseApi } from "./baseApi";
import type {
//   StrapiListResponse,
//   StrapiSingleResponse,
//   ProfessionalAttrs,
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
    //   getProfessional: b.query<Professional | null, number | string>({
    //     query: (id) => ({
    //       url: `/professionals/${id}`,
    //       params: { populate: "*" },
    //     }),
    //     transformResponse: (res: any) => {
    //       if (!res.data) return null;

    //       // Check format and transform accordingly
    //       if (!res.data.attributes) {
    //         return { id: res.data.id, ...res.data };
    //       }

    //       return { id: res.data.id, ...res.data.attributes };
    //     },
    //   }),
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
