import React from "react";
import { Pie } from "react-chartjs-2";
import useMilestoneStore from "../../stores/milestoneStore";

const ProgressChart=()=>{
    const milestones=useMilestoneStore((state)=>state.milestones);

    const completed = milestones.filter((m) => m.date <= new Date().toISOString()).length;
    const total = milestones.length;

    const chartData={
        labels:["Completed","Pending"],
        datasets:[
            {
                data:[completed,total-completed],
                backgroundColor: ["#4caf50", "#ff9800"],
            }
        ]
    }
    return <Pie data={chartData} />;
}
export default ProgressChart;