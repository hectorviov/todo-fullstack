import React, { useState } from "react";

type Props = {
    onSubmit: (task: string) => void;
}

const TodoForm: React.FC<Props> = ({ onSubmit }) => {
    const [task, setTask] = useState<string>('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(task);
        setTask('');
        document.getElementById("taskInput")?.focus();
    };

    const textChanged = (e) => {
        setTask(e.target.value);
    };

    return (
        <div className="m-3 flex h-[4rem] w-dvh sm:w-150 rounded-md shadow-md">
            <form className="grid w-full grid-cols-[9fr_1fr] space-x-2" onSubmit={handleSubmit}>
                <input className="ms-2 my-2 rounded-md bg-white p-2" type="text" placeholder="New todo..."
                       onChange={textChanged} value={task} required id={"taskInput"}/>
                <div className="flex items-center justify-center m-0">
                    <button
                        type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-10 text-blue-600 hover:text-blue-700 cursor-pointer">
                            <path fill-rule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                                  clip-rule="evenodd"/>
                        </svg>

                    </button>
                </div>
            </form>
        </div>
    );
}

export default TodoForm;