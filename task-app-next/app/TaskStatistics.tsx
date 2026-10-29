import {TaskFilter} from "@/app/TaskFilter";
import {states} from "@/app/AddTaskForm";
import {CardContainer} from "@/app/Card";
import {TaskStat} from "./page"
import {Status} from "./TaskItemProps"
import "./TaskStatistics.css"
import "lucide-react"

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