// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import  {type TaskItemProps, TaskItem, type Status} from "./TaskItemProps.tsx";
import {RadioOption} from "./FormInput.tsx";
import {useState} from "react";


const builtInTasks: TaskItemProps[] = [
  { id: 1, title: "Learn JSX", done: 'pending' },
  { id: 2, title: "Learn state", done: 'completed' },
  { id: 3, title: "Build a project", done: 'in progress' },
];

const states:Status[] = ['pending', "completed", "in progress"];


function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState<TaskItemProps[]>(builtInTasks);

  const [titleText, setTitleText] = useState<string>("");
  const[status, setStatus] = useState<Status>("pending");

  function addTask(){
    if(titleText.length <= 0 || titleText === "")return;
    if(status === null) return;
    const newTask:TaskItemProps = {id: getId(), title: titleText, done: status};
    setTasks([...tasks, newTask]);
    setTitleText("");
  }

  function getId(){
    setCount(count+1);
    return count;
  }

  return (
      <div>
        <h1>Existing Task List</h1>
        <ul>
          {tasks.map((t) =>{
             return <TaskItem title={t.title} done={t.done} id={t.id} />
          })}
        </ul>
        <input
            value = {titleText}
            onChange = {(e) => setTitleText(e.target.value)}
            placeholder = "INPUT SOME TASK TITLE NIGGER"
        />
        <form>
          {states.map((s) =>{
            return <RadioOption id={s} name={"idk"} value={s} label={s.toUpperCase()} checked={status === s}  onCheck={()=> { setStatus(s) }}></RadioOption>
          })}
        </form>
        <button onClick={() => {
          setCount(count + 1)
          addTask();
        }}>
          Add your {count}th Task)!
        </button>
      </div>

  )
}

export default App
