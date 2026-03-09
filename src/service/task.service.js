import { createTask, getALlTask, GetTask } from "../repository/task.repo.js"

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