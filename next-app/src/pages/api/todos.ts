import clientPromise from '@/utils/db';
import {Todo} from "@/types";
import {createTodo} from "@/utils/todoFactory";
import {ObjectId} from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("todos");

    if (req.method === "GET") {
        const todos = await db.collection('todos')
            .find({})
            .sort({ done: 1, createadAt: 1 })
            .toArray();
        const todosCasted = todos.map(todo => ({
            ...todo,
            _id: todo._id.toString(),
        }));
        return res.status(200).json(todosCasted);
    }

    if (req.method === "POST") {
        const {task} = req.body;
        const newTodo = createTodo(task);
        const result = await db.collection('todos').insertOne(newTodo);
        const todoWithId: Todo = {...newTodo, _id: result.insertedId.toString()}
        res.status(201).json(todoWithId);
    }

    if (req.method === "DELETE") {
        const {id} = req.query;

        if (!id || typeof id !== "string") {
            res.status(400).json({error: "Invalid or missing ID"});
            return;
        }

        try {
            await db.collection('todos').deleteOne({_id: ObjectId.createFromHexString(id)});
            res.status(204).end();
        } catch (error) {
            res.status(500).json({error: "Failed to delete todo"});
        }
    }

    if (req.method === "PATCH") {
        const {id} = req.query;

        if (!id || typeof id !== "string") {
            res.status(400).json({error: "Invalid or missing ID"});
            return;
        }

        try {
            const result = await db.collection("todos").findOneAndUpdate(
                {_id: ObjectId.createFromHexString(id)},
                [{$set: {done: {$not: "$done"}}}], // toggle `done`
                {returnDocument: "after"} // return updated doc
            );

            if (!result) {
                res.status(404).json({error: "Todo not found"});
                return;
            }

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({error: "Failed to toggle todo"});
        }
    }
}
