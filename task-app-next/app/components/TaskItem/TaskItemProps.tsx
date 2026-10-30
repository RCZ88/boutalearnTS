import type {CSSProperties} from "react";
import "./TaskItem.css";
import {Status, Task} from "@/app/types/task";

// what the component receives. Data plus actions.
type TaskItemProps = {
    task: Task;
    onToggle: (id:number) => void;
    onDelete: (id: number) => void;
};

/*A small set covers about 90 percent of everyday styling:

Text: color, fontSize, fontWeight, textAlign
Box: margin, padding, border, borderRadius, width, height
Background: backgroundColor
Layout: display (especially flex), justifyContent, alignItems, gap
*/


const taskStyle:Record<Status, CSSProperties> = {
    'pending' : {textDecoration: "none", color: 'yellow'},
    'in-progress' : {textDecoration: "solid", color: 'purple'},
    'completed' : {textDecoration: "none", color: 'green'},
}

export function TaskItem({task, onToggle, onDelete}:TaskItemProps) {
    return (
    <li>
        <div className="task-item">
            <span className="task-title">{task.title} </span>
            <span className={`task-status ${task.status}`}> [{task.status}]</span>

            <button className={"task-action-button change-status-button"} onClick={ () => onToggle(task.id)} aria-label = "Change Status" >
                {/*<Check size={18}/> */}
                <span>Change Status</span>
            </button>
            <button className={"task-action-button delete-button"} onClick= { () => onDelete(task.id)} aria-label = "Delete Task">
                {/*<Trash2 size={18}/>*/}
                <span>Delete</span>
            </button>
        </div>
    </li>
    );
}