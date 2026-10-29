import type {CSSProperties} from "react";
import {Trash2, Check} from "lucide-react";
import "./TaskItem.css";

export type Status = 'pending' | 'in-progress' | 'completed';
// the data. This is what lives in state.
export type Task = {
    id: number;
    title: string;
    done: Status;
    dateAdded:Date;
};

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
            <span className={`task-status ${task.done}`}> [{task.done}]</span>

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