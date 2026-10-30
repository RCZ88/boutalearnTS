// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

"use client";

import './App.css'
import {TaskItem} from "./components/TaskItem/TaskItemProps";
import {CardContainer} from "./Card";
import {AddTaskForm, states} from "./components/AddTaskForm/AddTaskForm";
import React, {useEffect, useState} from "react";
import {TaskFilter} from "./components/TaskFilter/TaskFilter";
import {TaskStatistics} from "./components/TaskStat/TaskStatistics";
import "lucide-react"
import {ChartNoAxesCombined, CircleCheck, CircleDashed, Clock, ListTodo} from "lucide-react";
import {Status, Task, TaskStat} from "@/app/types/task";
import {TaskWithCookie} from "@/app/constants/task";


export const builtInTasks:TaskWithCookie = {
  tasks:{
    1: {id: 1, title: "Learn JSX", status: 'pending',  dateAdded: new Date("2026-10-29")},
    2: {id: 2, title: "Learn state", status: 'completed', dateAdded: new Date("2026-9-12")},
    3: {id: 3, title: "Build a project", status: 'in-progress', dateAdded: new Date("2025-01-29")},
  },
  expiryDate: Date.now(),
};


const statesMap:Record<Status, Status> = {
  "pending": "in-progress",
  "in-progress": "completed",
  "completed": "pending",
}

const seconds = 5 * 1000;


export default function Home() {
  const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState<TaskWithCookie>(()=>{

    try{
      const saved = localStorage.getItem("tasks");

      if(saved === null)return builtInTasks;

      const taskCookieItem:TaskWithCookie = JSON.parse(saved);
      if(taskCookieItem.expiryDate < Date.now()){
        setCount(3);
        return builtInTasks;
      }
      setCount(Object.keys(taskCookieItem.tasks).length);
      return taskCookieItem;
    }catch{
      setCount(3);
      return builtInTasks;
    }
  });



  const [titleText, setTitleText] = useState<string>("");
  const[status, setStatus] = useState<Status>("pending");

  function addTask(){
    if(titleText.length <= 0 || titleText === "")return;
    const newTask:Task = {id: getId(), title: titleText, status: status, dateAdded: new Date()};
    setTasks(prevTask =>({
      tasks: {...prevTask.tasks, [newTask.id]: newTask},
      expiryDate: tasks.expiryDate + seconds,
    }));
    setTitleText("");
  }


  /*stats to include:
  // totalTaskCount: number,
  // completedTaskCount: number,
  // pendingTaskCount: number,
  // inProgressTaskCount: number,
  // completionPercentage: number,*/
  function getTaskStat():Record<string, TaskStat>{
    const stat:Record<string, TaskStat> = {
      "totalTaskCount": {statTitle: "Total Tasks", icon: ListTodo,  value: 0},
      "completed":{statTitle: "Completed Tasks", icon:CircleCheck, value:0},
      "pending":{statTitle: "Pending Tasks", icon:CircleDashed, value:0},
      "in-progress":{statTitle: "In Progress Tasks", icon:Clock, value:0},
      "completionPercentage":{statTitle: "CompletionPercentage", percentage:true, icon:ChartNoAxesCombined, value:0}
    };
    let allTaskValues = Object.values(tasks.tasks);
    stat["totalTaskCount"].value = allTaskValues.length;
    Object.values(tasks.tasks).map(task =>{
      task.status === "completed" && stat["completed"].value++;
      task.status === "pending" && stat["pending"].value++;
      task.status === "completed" && stat["in-progress"].value ++;
    });
    stat["completionPercentage"].value = stat["completed"].value / stat["totalTaskCount"].value * 100;
    return stat;
  }



  function getId(){
    setCount(count+1);
    return Date.now();
  }

  function toggleTaskState(id:number){
    console.log(id);
    setTasks(prevTask => ({
      tasks:{...prevTask.tasks, [id]: {...prevTask.tasks[id], status: statesMap[prevTask.tasks[id].status]}},
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
      if(task.status === state){
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
        <TaskStatistics taskStat={getTaskStat()}></TaskStatistics>
        <CardContainer title={"Existing Task List"} >
          <TaskFilter filterOptions={states} filterHandler={getTaskOfState}></TaskFilter>
          {(Object.keys(tasks.tasks).length == 0) ?
              <span>
              NO TASKS FOUND!
            </span> :
              <ul>
                {Object.values(tasks.tasks).map((t) =>{
                  return <TaskItem task={t} onToggle={toggleTaskState} onDelete={deleteTask} />
                })}
              </ul>
          }
        </CardContainer>
        <AddTaskForm
            addTask={addTask}
            count={count}
            setStatus={setStatus}
        />
      </div>
  )
}

