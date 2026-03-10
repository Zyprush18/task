import { get } from "express-http-context";
import { createTaskSvc, deleteTaskSvc, getAllTaskSvc, getTaskSvc, moveColumnSvc, updateTaskSvc } from "../service/task.service.js";
import { MoveTaskSchema, TaskSchema } from "../validation/task.validation.js";

export const TaskIndex = async (req, res) => {
  try {
    const user_id = get("user_id");
    const data = await getAllTaskSvc(user_id);

    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server Error",
    });
  }
};


export const TaskStore = async (req,res) => {
    try {
        const bodyreq = TaskSchema.safeParse(req.body);
        if (!bodyreq.success) {
          return res.status(400).json({
            message: "Validation Error",
            error: bodyreq.error.format(),
          });
        }

        const column_id = req.params.column_id;
        if (!column_id) {
          return res.status(400).json({
            message: "params column id is missing",
          });
        }

        await createTaskSvc(bodyreq.data, parseInt(column_id));
    
        res.status(201).json({
          message: "success add new task",
        });
      } catch (error) {    
        res.status(500).json({
          message: "internal server error",
        });
      }
}

export const TaskShow = async (req, res) => {
  try {
      const task_id = req.params.id_task;
      if (!task_id) {
        return res.status(400).json({
          message: "params task id is missing",
        });
      }
  
      const owner_id = get("user_id");
      const data = await getTaskSvc(owner_id, parseInt(task_id));
  
      res.status(200).json({
        message: "success",
        data: data,
      });
    } catch (error) {
      if (error.message === "not found") {
        return res.status(404).json({
          message: "not found task",
        });
      }
      res.status(500).json({
        message: "internal server Error",
      });
    }
}
  
export const TaskUpdate = async (req, res) => {
  try {
      const task_id = req.params.id_task;
      const column_id  = req.params.id_column;
      if (!task_id || !column_id) {
        return res.status(400).json({
          message: "params task id or column id is missing",
        });
      }
  
      const user_id = get("user_id");
  
      const bodyreq = TaskSchema.safeParse(req.body);
      if (!bodyreq.success) {
        return res.status(400).json({
          message: "Validation Error",
          error: bodyreq.error.format(),
        });
      }
  
      await updateTaskSvc(user_id, parseInt(task_id), parseInt(column_id), bodyreq.data);
      res.status(200).json({
        message: "success update",
      });
    } catch (error) {
      if (error.message === "not found") {
        return res.status(404).json({
          message: "not found task",
        });
      }
      res.status(500).json({
        message: "internal server error",
      });
    }
}

export const TaskDelete = async (req, res) => {
  try {
      const task_id = req.params.id_task;
      const column_id  = req.params.id_column;
      if (!task_id || !column_id) {
        return res.status(400).json({
          message: "params task id or column id is missing",
        });
      }
  
      const user_id = get("user_id");
  
      await deleteTaskSvc(user_id, parseInt(task_id), parseInt(column_id));
      res.status(200).json({
        message: "success delete",
      });
    } catch (error) {
      if (error.message === "not found") {
        return res.status(404).json({
          message: "not found task",
        });
      }
      res.status(500).json({
        message: "internal server error",
      });
    }
}

export const TaskMove = async (req, res) => {
  try {
      const task_id = req.params.id_task;
      const column_id  = req.params.id_column;
      if (!task_id || !column_id) {
        return res.status(400).json({
          message: "params task id or column id is missing",
        });
      }
  
      const user_id = get("user_id");
  
      const bodyreq = MoveTaskSchema.safeParse(req.body);
      if (!bodyreq.success) {
        return res.status(400).json({
          message: "Validation Error",
          error: bodyreq.error.format(),
        });
      }
  
      await moveColumnSvc(user_id, parseInt(task_id), parseInt(column_id), bodyreq.data);
      res.status(200).json({
        message: "success move",
      });
    } catch (error) {
      if (error.message === "not found") {
        return res.status(404).json({
          message: "not found task",
        });
      }
      res.status(500).json({
        message: "internal server error",
      });
    }
}
