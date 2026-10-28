import type {CSSProperties} from "react";
import {Trash2, Check} from "lucide-react";

export type Status = 'pending' | 'in progress' | 'completed';
// the data. This is what lives in state.
export type Task = {
    id: number;
    title: string;
    done: Status;
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
    'in progress' : {textDecoration: "solid", color: 'purple'},
    'completed' : {textDecoration: "none", color: 'green'},
}

export function TaskItem({task, onToggle, onDelete}:TaskItemProps) {
    return (
    <li style = {taskStyle[task.done]}>
        <span className="task-title">{task.title} </span>
        <span className="task-status"> [{task.done}]</span>

        <button onClick={ () => onToggle(task.id)} aria-label = "Change Status">
            <Check size={18}/>
        </button>
        <button onClick= { () => onDelete(task.id)} aria-label = "Delete Task">
            <Trash2 size={18}/>
        </button>
    </li>
    );
}