import type {LucideIcon} from "lucide-react";

export type Status = 'pending' | 'in-progress' | 'completed';
// the data. This is what lives in state.
export type Task = {
    id: number;
    title: string;
    status: Status;
    dateAdded: Date;
};
export type TaskStat = {
    statTitle: string,
    value: number,
    percentage?: boolean,
    icon: LucideIcon,
}
export type NewTask = {
    title: string;
    status:Status;
}