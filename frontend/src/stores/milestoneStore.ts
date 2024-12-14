import { create } from "zustand";

interface Milestone {
  id: number;
  title: string;
  date: string;
}

interface MilestoneState {
  milestones: Milestone[];
  addMilestone: (milestone: Milestone) => void;
  removeMilestone: (id: number) => void;
  updateMilestone: (id: number, updatedData: Partial<Milestone>) => void;
}

const useMilestoneStore = create<MilestoneState>((set) => ({
  milestones: [],
  addMilestone: (milestone) =>
    set((state) => ({ milestones: [...state.milestones, milestone] })),
  removeMilestone: (id) =>
    set((state) => ({
      milestones: state.milestones.filter((m) => m.id !== id),
    })),
  updateMilestone: (id, updatedData) =>
    set((state) => ({
      milestones: state.milestones.map((m) =>
        m.id === id ? { ...m, ...updatedData } : m
      ),
    })),
}));

export default useMilestoneStore;
