import {NextResponse} from "next/server";
import * as taskDB from "@/lib/queries/task";
import {NewTask, Status} from "@/app/types/task";
import * as userDB from "@/lib/queries/user";

export async function POST(request:Request){
    const body:unknown = request.json();


    if (typeof body !== "object" ||
        body === null ||
        !("task_name" in body) ||
        !("status" in body)) {
        return NextResponse.json(
            { error: "Invalid request body" },
            { status: 400 }
        );
    }
    if(typeof body.task_name !== "string" ||
        typeof body.status !== "string" ||
        !["pending", "in progress", "completed"].includes(body.status)){
        return NextResponse.json(
            { error: "Invalid request body" },
            {status: 400},
        )
    }

    const newTask:NewTask = {
        title: body.task_name,
        status: body.status as Status,
    }

    //TODO: replace userid with proper logic
    const result = await taskDB.addTask(newTask, 1);

    return NextResponse.json(result);
}

export async function DELETE(request:Request) {
    try{
        const url:URL = new URL(request.url);
        const userId = url.searchParams.get("userId");
        if(userId) {
            return Response.json(await userDB.deleteUser(Number(userId)));
        }
    }catch(error){

    }
}