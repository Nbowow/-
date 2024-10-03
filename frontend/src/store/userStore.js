import { create } from "zustand";

export const useAuthStore = create((set) => ({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken, isLoggedIn: true }),
    logout: () =>
        set({ accessToken: null, refreshToken: null, isLoggedIn: false }),
}));

export const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));
