import { get } from "express-http-context";
import { createTaskSvc, getAllTaskSvc, getTaskSvc } from "../service/task.service.js";
import { TaskSchema } from "../validation/task.validation.js";

export const TaskIndex = async (req, res) => {
  try {
    const user_id = get("user_id");
    const data = await getAllTaskSvc(user_id);

    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    
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
        console.log(error);
        
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