"use client";
import { create } from "zustand";

interface Story {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

interface StoryState {
    stories: Story[];
    addStory: (story: Story) => void;
    removeStory: (id: number) => void;
}

const useStoryStore = create<StoryState>((set) => ({
    stories: [],
    addStory: (story) =>
        set((state) => ({ stories: [...state.stories, story] })),
    removeStory: (id) =>
        set((state) => ({
            stories: state.stories.filter((s) => s.id !== id),
        })),
}));

export default useStoryStore;