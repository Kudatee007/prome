import { baseApi } from "./baseApi";

export type StrapiUser = {
  id: number;
  username: string;
  email: string;
  confirmed?: boolean;
  blocked?: boolean;
  // If you added relations/media, expose minimal fields you use:
  avatar?: { url: string } | null;
};

type AuthResponse = { jwt: string; user: StrapiUser };

export const authApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation<AuthResponse, { identifier: string; password: string }>({
      query: (body) => ({ url: "/auth/local", method: "POST", body }),
    //   invalidatesTags: ["Auth","User"],
    }),
    register: b.mutation<AuthResponse, { username: string; email: string; password: string }>({
      query: (body) => ({ url: "/auth/local/register", method: "POST", body }),
    //   invalidatesTags: ["Auth","User"],
    }),
    me: b.query<StrapiUser, void>({
      query: () => ({ url: "/users/me", params: { populate: "*" } }),
    //   providesTags: ["User"],
    }),
  }),
});

export const {useRegisterMutation, useLoginMutation, useMeQuery } = authApi;
