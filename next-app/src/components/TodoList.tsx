import React from "react";
import { Todo } from "@/types";
import TodoCard from "./TodoCard";
import LoadingCard from "@/components/LoadingCard";

type Props = {
    todos: Todo[];
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
    loading: boolean;
};

const TodoList: React.FC<Props> = ({ todos, onToggleDone, onDelete, loading }) => {
    if (loading) {
        return (
            <div className={`w-screen sm:w-150`}>
                <ul className="space-y-4 my-4 mx-4">
                    {Array.from({length: 3}).map((_, i) => (
                        <li key={i}>
                            <LoadingCard />
                        </li>
                    ))}
                </ul>
            </div>
        );
    } else {
        if (todos.length === 0) {
            return (
                <div className={`h-1/2 flex justify-center items-center`}>
                    <h1 className="text-4xl font-medium text-gray-500">Great! You're all done.</h1>
                </div>
            );
        }

        return (
            <div className={`w-screen sm:w-150`}>
                <ul className="space-y-4 my-4 mx-4">
                    {todos.map((todo) => (
                        <li key={todo._id}>
                            <TodoCard todo={todo} onToggleDone={onToggleDone} onDelete={onDelete}/>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default TodoList;