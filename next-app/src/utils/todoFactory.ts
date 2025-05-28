import { Todo } from '@/types';

export function createTodo(task: string) {
    return {  // generates a unique ID
        task,
        done: false,
        createdAt: new Date().toISOString()
    };
}