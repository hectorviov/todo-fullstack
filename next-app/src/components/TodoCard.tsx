import React, {useState} from "react";
import {Todo} from "@/types";

type Props = {
    todo: Todo,
    onToggleDone: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoCard: React.FC<Props> = ({todo, onToggleDone, onDelete}) => {
    return (
        <div className={`flex justify-between rounded-xl p-2 shadow-md ${todo.done ? "bg-gray-300" : ""}`}>
            <div className={`text-justify p-5`}>
                <p className={`text-lg ${todo.done ? "line-through text-gray-500" : "text-black"}`}>
                    {todo.task}
                </p>
                <small className="text-xs text-gray-500">Added: {new Date(todo.createdAt).toLocaleString()}</small>
            </div>

            <div className="flex space-x-2">
                <button
                    onClick={() => onToggleDone(todo._id!)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className={`size-12 cursor-pointer text-green-600 hover:text-green-700 pt-0.5 ${todo.done ? "hidden": ""}`}>
                        <path fill-rule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                              clip-rule="evenodd"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className={`size-12 cursor-pointer text-red-600 hover:text-red-700 pt-0.5 ${!todo.done ? "hidden": ""}`}>
                        <path fill-rule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
                <button
                    onClick={() => onDelete(todo._id!)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-10 cursor-pointer text-red-600 hover:text-red-700">
                        <path fill-rule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TodoCard;