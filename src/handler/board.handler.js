import { get } from "express-http-context";
import {
  createBoardSvc,
  createColumnSvc,
  deleteBoardSvc,
  deleteColumnSvc,
  getAllBoardSvc,
  getBoardSvc,
  updateBoardSvc,
  updateColumnSvc,
} from "../service/board.service.js";
import { BoardSchema, ColumnSchema } from "../validation/board.validation.js";

export const BoardIndex = async (req, res) => {
  try {
    const user_id = get("user_id");
    const data = await getAllBoardSvc(user_id);

    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "internal server Error",
    });
  }
}

export const StoreBoard = async (req, res) => {
  try {
    const bodyreq = BoardSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }
    await createBoardSvc(bodyreq.data);

    res.status(201).json({
      message: "success add new board",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const ShowBoard = async (req, res) => {
  try {
    const board_id = req.params.id_board;
    if (!board_id) {
      return res.status(400).json({
        message: "params board id is missing",
      });
    }

    const owner_id = get("user_id");
    const data = await getBoardSvc(owner_id, parseInt(board_id));

    res.status(200).json({
      message: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);

    if (error.message === "not found") {
      return res.status(404).json({
        message: "not found board",
      });
    }
    res.status(500).json({
      message: "internal server Error",
    });
  }
};

export const updateBoard = async (req, res) => {
  try {
    const board_id = parseInt(req.params.id_board);
    if (!board_id) {
      return res.status(400).json({
        message: "params board id is missing",
      });
    }

    const user_id = get("user_id");

    const bodyreq = BoardSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }

    await updateBoardSvc(board_id, user_id, bodyreq.data);
    res.status(200).json({
      message: "success update",
    });
  } catch (error) {
    console.log(error);

    if (error.message === "not found") {
      return res.status(404).json({
        message: "not found board",
      });
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
};
export const deleteBoard = async (req, res) => {
  try {
    const board_id = parseInt(req.params.id_board);
    if (!board_id) {
      return res.status(400).json({
        message: "params board id is missing",
      });
    }
    const user_id = get("user_id");

    await deleteBoardSvc(board_id, user_id);
    res.status(200).json({
      message: "success delete",
    });
  } catch (error) {
    console.log(error);

    if (error.message === "not found") {
      return res.status(404).json({
        message: "not found board",
      });
    }
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const storeColumn = async (req, res) => {
  try {
    const bodyreq = ColumnSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }
    const user_id = get('user_id');

    await createColumnSvc(user_id,bodyreq.data);

    res.status(201).json({
      message: "success add new column",
    });
  } catch (error) {
    if (error.message === 'not found') {
      return res.status(404).json({
        message: "not found board",
      });
    }

    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const updateColumn = async (req, res) => {
  try {
    const column_id = parseInt(req.params.id_column);
    if (!column_id) {
      return res.status(400).json({
        message: "params column id is missing",
      });
    }

    const bodyreq = ColumnSchema.safeParse(req.body);
    if (!bodyreq.success) {
      return res.status(400).json({
        message: "Validation Error",
        error: bodyreq.error.format(),
      });
    }
    const user_id = get('user_id');

    await updateColumnSvc(column_id,user_id,bodyreq.data);

    res.status(200).json({
      message: "success update column",
    });
  } catch (error) {
    if (error.message === 'not found') {
      return res.status(404).json({
        message: "not found board",
      });
    }

    res.status(500).json({
      message: "internal server error",
    });
  }
};


export const deleteColumn = async (req, res) => {
  try {
    const board_id = parseInt(req.params.id_board);
    const column_id = parseInt(req.params.id_column);
    if (!column_id || !board_id) {
      return res.status(400).json({
        message: "params column id is missing",
      });
    }

    const user_id = get('user_id');

    await deleteColumnSvc(column_id,user_id, board_id);

    res.status(200).json({
      message: "success delete column",
    });
  } catch (error) {
    if (error.message === 'not found') {
      return res.status(404).json({
        message: "not found board",
      });
    }

    res.status(500).json({
      message: "internal server error",
    });
  }
}
