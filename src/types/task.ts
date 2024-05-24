export type Task = {
    id: number | null;
    name: string;
    content: string | null;
    priority: number;
    completed: boolean | null;
    userId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
};