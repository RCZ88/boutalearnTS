import {Task} from "@/app/types/task";

export type TaskWithCookie = {
    tasks: Record<number, Task>,
    expiryDate: number,
}