export type FormatResponse = {
    code: number;
    success: boolean;
    message: string;
    data: Object;
};

export type UserResponse = {
    code: number;
    success: boolean;
    message: string;
    email: string | null;
    id: string | null;
    data: Object;
};

export type TaskResponse = {
    code: number;
    success: boolean;
    message: string;
    name: string | null;
    priority: number | null;
    userId: string | null;
    data: Object;
};
