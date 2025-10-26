import { baseApi } from "./baseApi";
import type { Professional } from "./strapi.types";

type ProfessionalSearchParams = {
  search?: string;
  location?: string;
};

type StrapiResponse = {
  data: any[];
  meta?: any;
};

export const prosApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getProfessionals: b.query<Professional[], ProfessionalSearchParams | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        searchParams.append("populate", "*");

        if (params?.search) {
          searchParams.append("filters[$or][0][name][$containsi]", params.search);
          searchParams.append("filters[$or][1][category][$containsi]", params.search);
          searchParams.append("filters[$or][2][about][$containsi]", params.search);
        }
        if (params?.location) {
          searchParams.append("filters[location][$containsi]", params.location);
        }

        return { url: `/professionals?${searchParams.toString()}` };
      },
      transformResponse: (res: any) => {
        return res.data;
      },
    }),

    getProfessional: b.query<Professional | null, string>({
      query: (documentId) => ({
        url: `/professionals/${documentId}`,
        params: { populate: "*" },
      }),
      transformResponse: (res: any) => {
        return res.data || null;
      },
    }),

    // Fixed type assertion for getLocations
    getLocations: b.query<string[], void>({
      query: () => ({
        url: "/professionals",
        params: { fields: ["location"] },
      }),
      transformResponse: (res: StrapiResponse): string[] => {
        const locations = res.data
          .map((item: any) => item.location)
          .filter((loc: any): loc is string => typeof loc === "string" && loc !== "");
        return [...new Set(locations)].sort();
      },
    }),
  }),
});

export const {
  useGetProfessionalsQuery,
  useGetProfessionalQuery,
  useGetLocationsQuery,
} = prosApi;