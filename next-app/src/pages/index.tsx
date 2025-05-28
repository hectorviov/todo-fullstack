import Head from "next/head";
import {useEffect, useState} from "react";
import TodoForm from '@/forms/TodoForm';
import TodoList from '@/components/TodoList';
import {Todo} from '@/types';
import { createTodo } from "@/utils/todoFactory";

export default function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        refreshTodos();
    }, []);

    const sortTodos = (items: Todo[]): Todo[] => {
        return [...items].sort((a: Todo, b: Todo) => {
            if (a.done !== b.done) return a.done ? 1 : -1;
            return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
    };

    const refreshTodos = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/todos')
            const data = await response.json();
            const ordered = sortTodos(data);
            setTodos(ordered);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    const formSubmit = async (task: string) => {
        try {
            const res = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({task})
            });

            if (!res.ok) throw new Error('Error creating todo');

            const todo: Todo = await res.json();
            setTodos(sortTodos([...todos, todo]))
        } catch (err) {
            console.log(err);
        }
    };

    const toggleDone = async (id: string) => {
        try {
            const res = await fetch(`/api/todos?id=${id}`, { method: "PATCH" });
            if (!res.ok) throw new Error("Failed to toggle");

            const updatedTodo: Todo = await res.json();

            setTodos((prevTodos) => {
                const newTodos = prevTodos.map((todo) =>
                    todo._id === updatedTodo._id ? updatedTodo : todo
                );
                return sortTodos(newTodos);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const deleteTodo = async (id: string) => {
        const res = await fetch(`/api/todos?id=${id}`, {
            method: 'DELETE'
        })

        if (res.ok) {
            setTodos(prev => sortTodos(prev.filter(todo => todo._id !== id)));
        } else {
            console.error("Failed to delete todo");
        }
    };

    return (
        <div className={'min-h-screen py-0 px-0.5 flex'}>
            <Head>
                <title>Simple TODO Fullstack</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"></link>
            </Head>

            <main className={'py-5 px-0 flex-1 flex flex-col items-center h-screen'}>
                <TodoForm onSubmit={formSubmit}/>
                <TodoList todos={todos} onToggleDone={toggleDone} onDelete={deleteTodo}/>
            </main>
        </div>
    );
}
