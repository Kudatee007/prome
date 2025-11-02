import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "./store";
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
    api: import("@reduxjs/toolkit/query").CombinedState<{}, "Auth" | "User" | "Pros" | "Jobs" | "Booking", "api">;
    auth: {
        isAuthenticated: boolean;
        token: string | null;
        user: import("../api/authApi").StrapiUser | null;
    };
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
