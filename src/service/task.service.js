import { id } from "zod/locales";
import { createTask, deleteTask, getALlTask, GetTask, moveColumn, updateTask } from "../repository/task.repo.js"

export const getAllTaskSvc = async (user_id) => {
    return await getALlTask(user_id);
}

export const createTaskSvc = async (req, column_id) => {
    return await createTask(req, column_id);
}

export const getTaskSvc = async (user_id, id_task) => {
    const task =  await GetTask(user_id, id_task);
    if (!task) {
        throw new Error("not found");
    }
    return task;
}

export const updateTaskSvc = async (user_id, id, column_id, data) => {
    const task = await updateTask(user_id, id, column_id, data);
    if (!task) {
        throw new Error("not found");
    }
    return task;
}

export const deleteTaskSvc = async (id, user_id, column_id) => {
    const now = new Date().toISOString();
    const task = await deleteTask(user_id, id, column_id, now);
    if (!task) {
        throw new Error("not found");
    }
    return task;
}


export const moveColumnSvc = async (id_task, user_id, column_id, req) => {
    const task = await moveColumn(id_task, user_id, column_id, req);
    if (!task) {
        throw new Error("not found");
    }
    return task;
}