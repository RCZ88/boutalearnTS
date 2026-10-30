import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import * as taskDB from "@/lib/queries/task";;

import {Status} from "@/app/types/task";

export async function GET(request:Request) {
    try {
        const url:URL = new URL(request.url);
        const userId = url.searchParams.get("userId");
        const taskId = url.searchParams.get("taskId");

        if(userId && !taskId) {
            const tasks = await taskDB.getTasksByUserId(Number(userId));
            return Response.json(tasks);
        }
        if(taskId && !userId){
            const task = await taskDB.getTaskById(Number(taskId));
            return Response.json(task);
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Failed to fetch tasks" },
            { status: 500 }
        );
    }
}

export async function POST(request:Request) {
    try{
        const url:URL = new URL(request.url);
        const taskId = url.searchParams.get("taskId");
        const stateChange = url.searchParams.get("state");

        if(!taskId && stateChange || !stateChange && taskId){
            return NextResponse.json(
                {error: "State or Task id is missing"},
                {status: 404}
            );
        }else if(taskId && stateChange){
            return Response.json(await taskDB.updateTaskStatus(Number(taskId), stateChange as Status));
        }


    }  catch(error){

    }
}

export async function DELETE(request:Request) {
    try{
        const url:URL = new URL(request.url);
        const taskId = url.searchParams.get("taskId");
        if(taskId){
            return Response.json(await taskDB.deleteTask(Number(taskId)));
        }
    }catch(error){

    }
}