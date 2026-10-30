import {pool} from "@/lib/db"
import {NewTask, Status, Task} from "@/app/types/task";
import {User} from "@/app/types/user";

export async function getTasksByUserId(userId: number): Promise<Task[]> {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1",
        [userId]
    );
    return result.rows;
}

export async function getTaskById(taskId:number): Promise<Task> {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE id = $1",
        [taskId]
    );
    return result.rows[0];
}

export async function updateTaskStatus(taskId:number, status:Status): Promise<Task>{
   const result = await pool.query("UPDATE tasks SET status = $2 WHERE id = $1",
       [taskId, status])
    return result.rows[0]
}

export async function deleteTask(taskId:number): Promise<boolean> {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1",
        [taskId]);
    return result.rowCount !== null && result.rowCount > 0;
}
export async function addTask(task:NewTask, userId:number): Promise<Task> {
    const result = await pool.query("INSERT INTO tasks ( task_name, status , user_id) VALUES (&1 &2 &3) RETURNING *",
        [task.title, task.status, userId]);
    return result.rows[0];
}
