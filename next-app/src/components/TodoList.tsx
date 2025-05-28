import React from "react";
import { Todo } from "@/types";
import TodoCard from "./TodoCard";

type Props = {
    todos: Todo[];
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
};

const TodoList: React.FC<Props> = ({ todos, onToggleDone, onDelete }) => {
    if (todos.length === 0) {
        return <h1 className="text-4xl font-medium text-gray-500">Great! You're all done.</h1>;
    }

    return (
        <div className={`w-dvh sm:w-150`}>
            <ul className="space-y-4 my-4">
                {todos.map((todo) => (
                    <li
                        key={todo._id}>
                        <TodoCard todo={todo} onToggleDone={onToggleDone} onDelete={onDelete}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;