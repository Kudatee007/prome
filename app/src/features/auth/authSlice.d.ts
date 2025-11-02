import type { StrapiUser } from "@/api/authApi";
type AuthState = {
    isAuthenticated: boolean;
    token: string | null;
    user: StrapiUser | null;
};
export declare const loginSucceeded: import("@reduxjs/toolkit").ActionCreatorWithPayload<{
    token: string;
    user: StrapiUser;
}, "auth/loginSucceeded">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"auth/logout">, setUser: any;
declare const _default: import("redux").Reducer<AuthState>;
export default _default;
