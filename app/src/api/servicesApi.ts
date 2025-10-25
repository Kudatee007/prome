import { baseApi } from "./baseApi";

export type Service = {
  id: number;
  documentId: string;
  name: string;
  category: string;
  images?: {
    id: number;
    image_url: string;
    alternativeText?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

type StrapiResponse = {
  data: Array<{
    id: number;
    documentId: string;
    name: string;
    category: string;
    images?: any;
    [key: string]: any;
  }>;
  meta?: any;
};

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getServicesByCategory: b.query<Service[], string>({
      query: (category) => {
        // Strapi v5 flat filter syntax
        const params = new URLSearchParams({
          'filters[category]': category,
          'populate': 'images'
        });
        
        return {
          url: `/professionals?${params.toString()}`,
        };
      },
      transformResponse: (res: any) => res.data || [],
    }),

    getAllCategories: b.query<string[], void>({
      query: () => ({
        url: "/professionals",
        params: { fields: ["category"] },
      }),
      transformResponse: (res: StrapiResponse): string[] => {
        const categories = res.data
          .map((item) => item.category)
          .filter((cat): cat is string => typeof cat === "string" && cat !== "");
        
        return [...new Set(categories)];
      },
    }),
  }),
});

export const { useGetServicesByCategoryQuery, useGetAllCategoriesQuery } =
  servicesApi;