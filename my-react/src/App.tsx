// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import {TaskItem, type Status, type Task} from "./TaskItemProps.tsx";
import {CardContainer} from "./Card.tsx";
import {AddTaskForm, states} from "./AddTaskForm.tsx";
import {useState, useEffect} from "react";
import {TaskFilter} from "./TaskFilter.tsx";

type TaskWithCookie = {
    tasks:Record<number, Task>,
    expiryDate: number,
}

type TasksStat = {
    totalTaskCount: number,
    completedTaskCount: number,
    pendingTaskCount: number,
    inProgressTaskCount: number,
    completionPercentage: number,
}


const builtInTasks:TaskWithCookie = {
tasks:{
    1: {id: 1, title: "Learn JSX", done: 'pending'},
    2: {id: 2, title: "Learn state", done: 'completed'},
    3: {id: 3, title: "Build a project", done: 'in progress'},
},
 expiryDate: Date.now(),
};


const statesMap:Record<Status, Status> = {
    "pending": "in progress",
    "in progress": "completed",
    "completed": "pending",
}

const seconds = 5 * 1000;


function App() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState<TaskWithCookie>(()=>{

      try{
          const saved = localStorage.getItem("tasks");
          if(saved === null)return;
          const taskCookieItem:TaskWithCookie = JSON.parse(saved);
          if(taskCookieItem.expiryDate < Date.now()){
              return builtInTasks;
          }

          return saved ? JSON.parse(saved) : builtInTasks
      }catch{
          return builtInTasks;
      }
  });



  const [titleText, setTitleText] = useState<string>("");
  const[status, setStatus] = useState<Status>("pending");

  function addTask(){
    if(titleText.length <= 0 || titleText === "")return;
    const newTask:Task = {id: getId(), title: titleText, done: status};
    setTasks(prevTask =>({
        tasks: {...prevTask, [newTask.id]: newTask},
        expiryDate: tasks.expiryDate + seconds,
    }));
    setTitleText("");
  }

  function getTaskStat():TasksStat{
      const stat:TasksStat = {
          completedTaskCount: 0,
          completionPercentage: 0,
          inProgressTaskCount: 0,
          pendingTaskCount: 0,
          totalTaskCount: 0
      };
      let allTaskValues = Object.values(tasks.tasks);
      stat.totalTaskCount = allTaskValues.length;
      Object.values(tasks.tasks).map(task =>{
          task.done === "completed" && stat.completedTaskCount ++;
          task.done === "pending" && stat.pendingTaskCount ++;
          task.done === "completed" && stat.inProgressTaskCount ++;
      });
      stat.completionPercentage = stat.completedTaskCount / stat.totalTaskCount * 100;
      return stat;
  }



  function getId(){
    setCount(count+1);
    return Date.now();
  }

  function toggleTaskState(id:number){
      setTasks(prevTask => ({
          tasks:{...prevTask, [id]: {...tasks.tasks[id], done: statesMap[tasks.tasks[id].done]}},
          expiryDate: tasks.expiryDate,
      }));
  }

  function deleteTask(id:number){
      const {[id]:removed , ...rest} = tasks.tasks;
      setTasks({tasks:rest, expiryDate: tasks.expiryDate});
  }

  function getTaskOfState(state:Status):Array<Task>{
      const ts:Array<Task> = Array();
      Object.values(tasks.tasks).map(task =>{
          if(task.done === state){
              ts.push(task);
          }
      })
      return ts;

  }

    useEffect(() => {
        console.log("tasks changed", tasks);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

  return (
      <div>
          <CardContainer {...{title:"Your Task Stats!"}}>
            <div className="stat-container">
                {Object.entries(getTaskStat()).map(([k,v]) =>(<CardContainer header={k}> {v} </CardContainer>))}
            </div>
          </CardContainer>
        <h1>Existing Task List</h1>
          <TaskFilter filterOptions={states} filterHandler={getTaskOfState}></TaskFilter>
          {(Object.keys(tasks.tasks).length == 0) ?
              <span>
              NO TASKS FOUND!
            </span>:
              <ul>
                  {Object.values(tasks.tasks).map((t) =>{
                      return <TaskItem task={t} onToggle={toggleTaskState} onDelete={deleteTask} />
                  })}
              </ul>
          }
          <AddTaskForm
              addTask={addTask}
              count={count}
              setStatus={setStatus}
          />
      </div>
  )
}

export default App
