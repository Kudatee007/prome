export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    api: import("@reduxjs/toolkit/query").CombinedState<{}, "Auth" | "User" | "Pros" | "Jobs" | "Booking", "api">;
    auth: {
        isAuthenticated: boolean;
        token: string | null;
        user: import("../api/authApi").StrapiUser | null;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        api: import("@reduxjs/toolkit/query").CombinedState<{}, "Auth" | "User" | "Pros" | "Jobs" | "Booking", "api">;
        auth: {
            isAuthenticated: boolean;
            token: string | null;
            user: import("../api/authApi").StrapiUser | null;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
