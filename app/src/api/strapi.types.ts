// export type StrapiListResponse<T> = {
//   data: Array<{
//     id: number;
//     attributes: T;
//   }>;
//   meta: {
//     pagination: {
//       page: number;
//       pageSize: number;
//       pageCount: number;
//       total: number;
//     };
//   };
// };

// export type StrapiSingleResponse<T> = {
//   data: { id: number; attributes: T } | null;
// };

// export type StrapiComponent<T> = T & { id: number };
// export type MaybeRepeatable<T> = StrapiComponent<T> | Array<StrapiComponent<T>>;

// Your "Image" component fields (adjust names if different in Strapi)
// export type ImageComponent = {
//   image_url?: string | null;
//   thumbnail_url?: string | null;
// };

// export type ProfessionalAttrs = {
//   name: string;
//   category?: string;
//   yearsInBusiness?: number;
//   employees?: number;
//   address?: string;
//   hires?: number;
//   introduction?: string;

//   about?: string | null; // Markdown rich text comes back as a string
//   payment_methods?: Record<string, unknown> | null; // JSON field
//   images?: MaybeRepeatable<ImageComponent> | null; // Component(Image); single or repeatable
//   image_url?: string | null; // top-level text fields, if you kept them
//   thumbnail_url?: string | null;

//   photo?: {
//     data: { attributes: { url: string } } | null;
//   };
//   location?: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type ProfessionalAttrs = {
//   name: string;
//   category?: string;
//   location?: string;
//   introduction?: string | null;
//   about?: string | null;
//   payment_methods?: string[] | Record<string, unknown> | null;
//   images?:
//     | { id: number; image_url?: string | null; thumbnail_url?: string | null }
//     | Array<{
//         id: number;
//         image_url?: string | null;
//         thumbnail_url?: string | null;
//       }>
//     | null;
//   employees?: number | null;
//   hires?: number | null;
//   years_in_business?: number | null;
//   address?: string | null;

//   // Strapi timestamps/ids if you use them in UI
//   createdAt: string;
//   updatedAt: string;
//   publishedAt?: string;
//   created_seed_at?: string;
//   documentId?: string;
// };

export type ProfessionalAttrs = {
    name: string;
    category?: string;
    location?: string;
    address?: string | null;
    about?: string | null;
    introduction?: string | null;
    payment_methods?: string[] | null;
    images?: { id: number; image_url?: string | null; thumbnail_url?: string | null } | null; // single component
    employees?: number | null;
    hires?: number | null;
    years_in_business?: number | null;
  
    // Strapi timestamps/ids (keep if you use them)
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    created_seed_at?: string;
    documentId?: string;
  };

  export type Professional = ProfessionalAttrs & { id: number };
