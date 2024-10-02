import { create } from "zustand";

const useAuthStore = create((set) => ({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken, isLoggedIn: true }),
    logout: () =>
        set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
}));

export default useAuthStore;
