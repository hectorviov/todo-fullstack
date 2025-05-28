import { ObjectId } from "mongodb";

export type Todo = {
    _id: string;
    task: string;
    done: boolean;
    createdAt: string;
};