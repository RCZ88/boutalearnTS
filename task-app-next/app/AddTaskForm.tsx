import {RadioOption} from "./FormInput";
import type {Status} from "./TaskItemProps";
import * as React from "react";
import {useState} from "react";
import {CardContainer} from "./Card";
import "./AppTaskForm.css"


type AddTaskFormProps = {addTask: () => void, count:number, setStatus: React.Dispatch<React.SetStateAction<Status>>};

export const states:Status[] = ['pending', "completed", "in-progress"];

export function AddTaskForm({ addTask, count, setStatus}: AddTaskFormProps) {
    const [titleText, setTitleText] = useState<string>("");
    const[status] = useState<Status>("pending");
    return <CardContainer title={"Create new Task"}>
        <input
            className = "task-name-input"
            value = {titleText}
            onChange = {(e) => setTitleText(e.target.value)}
            placeholder = "Enter a Task Name"
        />
        <form className={"task-status-options"}>
            {states.map((s) =>{
                return <RadioOption id={s} name={"status"} value={s} label={s.toUpperCase()} checked={status === s}  onCheck={()=> { setStatus(s)}}></RadioOption>
            })}
        </form>
        <button className={"add-task-button"} onClick={addTask}>
            Add your {count+1}th Task!
        </button>
    </CardContainer>
}