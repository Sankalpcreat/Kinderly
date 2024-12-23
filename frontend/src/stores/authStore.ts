"use client";
import { create } from "zustand";

interface AuthState {
    user: string | null;
    login: (username: string) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    login: (username) => set({ user: username }),
    logout: () => set({ user: null }),
}));

export default useAuthStore;