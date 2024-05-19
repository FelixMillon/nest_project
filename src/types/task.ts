import { User } from './user'
export type Task = {
    id: number | null;
    title: string;
    content: string;
    priority: number;
    completed: boolean;
    users: User[] | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};