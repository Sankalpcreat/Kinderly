import { useMilestoneStore } from "@/stores/milestoneStore";
import { milestonesService } from "@/services/milestones";
import { Milestone } from "@/types/milestone";

export const useMilestonesStoreHook = () => {
  const { milestones, setMilestones } = useMilestoneStore();

  const fetchMilestones = async (): Promise<void> => {
      try{
         const data:Milestone[] = await milestonesService.fetchMilestones();
           setMilestones(data);
          } catch(err){
             throw err;
      }

  };

  const createMilestone = async (title: string, date: string): Promise<void> => {
        try {
            const data:Milestone = await milestonesService.createMilestone(title, date);
             setMilestones([...milestones, data]);
           } catch(err){
             throw err;
        }

  };

  return { milestones, fetchMilestones, createMilestone };
};