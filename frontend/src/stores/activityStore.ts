"use client";
import { create } from "zustand";

interface Activity {
    id: number;
    title: string;
    description: string;
    suggestedAge: string;
}

interface ActivityState {
    activities: Activity[];
    addActivity: (activity: Activity) => void;
    removeActivity: (id: number) => void;
}

const useActivityStore = create<ActivityState>((set) => ({
    activities: [],
    addActivity: (activity) =>
        set((state) => ({ activities: [...state.activities, activity] })),
    removeActivity: (id) =>
        set((state) => ({
            activities: state.activities.filter((a) => a.id !== id),
        })),
}));

export default useActivityStore;