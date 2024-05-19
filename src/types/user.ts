import { Task } from './task'
export type User = {
    id: number | null;
    name: string;
    email: string;
    password: string | null;
    tasks: Task[] | null;
};