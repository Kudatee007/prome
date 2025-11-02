export type ProfessionalAttrs = {
    name: string;
    category?: string;
    location?: string;
    address?: string | null;
    about?: string | null;
    introduction?: string | null;
    payment_methods?: string[] | null;
    images?: {
        id: number;
        image_url?: string | null;
        thumbnail_url?: string | null;
    } | null;
    employees?: number | null;
    hires?: number | null;
    years_in_business?: number | null;
    phone_number?: string | null;
    email?: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    created_seed_at?: string;
    documentId?: string;
};
export type Professional = ProfessionalAttrs & {
    id: number;
};
