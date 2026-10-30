import {TaskFilter} from "@/app/components/TaskFilter/TaskFilter";
import {states} from "@/app/components/AddTaskForm/AddTaskForm";
import {CardContainer} from "@/app/Card";
import "./TaskStatistics.css"
import "lucide-react"
import {Status, TaskStat} from "@/app/types/task";

type StatisticsData = {
    taskStat:Record<string, TaskStat>
}

export function TaskStatistics({taskStat}:StatisticsData) {
    return (
        <CardContainer {...{title:"Your Task Stats!", orientation:'horizontal'}}>
            {Object.entries(taskStat).map(([state,taskStat], id) =>{
                const Icon = taskStat.icon;
                const classStateString = `stat-card ${states.includes(state as Status) ? state : ""}`;
                return<div className={`stat-card ${classStateString}`} key={id}>
                    <span className={"stat-card-header stat-label"}>
                        {taskStat.statTitle}
                    </span>
                    <Icon size={5} className={`stat-icon`}/>
                    <span className= {`stat-value`}>
                        {taskStat.percentage !== undefined && taskStat.percentage ?
                            `${taskStat.value.toFixed(1)}%` : `${taskStat.value}`}
                    </span>
                </div>
            })}
        </CardContainer>
    )
}