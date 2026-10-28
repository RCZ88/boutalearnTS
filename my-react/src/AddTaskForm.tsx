import {RadioOption} from "./FormInput.tsx";
import type {Status} from "./TaskItemProps.tsx";
import * as React from "react";
import {useState} from "react";


type AddTaskFormProps = {addTask: () => void, count:number, setStatus: React.Dispatch<React.SetStateAction<Status>>};
const [titleText, setTitleText] = useState<string>("");
export const states:Status[] = ['pending', "completed", "in progress"];
const[status] = useState<Status>("pending");


export function AddTaskForm({ addTask, count, setStatus}: AddTaskFormProps) {
    return <>
        <input
            value = {titleText}
            onChange = {(e) => setTitleText(e.target.value)}
            placeholder = "INPUT SOME Task Title"
        />
        <form>
            {states.map((s) =>{
                return <RadioOption id={s} name={"status"} value={s} label={s.toUpperCase()} checked={status === s}  onCheck={()=> { setStatus(s)}}></RadioOption>
            })}
        </form>
        <button onClick={addTask}>
            Add your {count+1}th Task)!
        </button>
    </>
}