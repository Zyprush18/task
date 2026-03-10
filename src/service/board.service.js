import { boardDelete, boardUpdate, columnDelete, columnUpdate, createBord, createColumn, getAllBoards, getBoardbyId} from "../repository/board.repo.js"

export const getAllBoardSvc = async (user_id) => {
    return await getAllBoards(user_id);
}

export const createBoardSvc = async (req) => {
    return await createBord(req);
}

export const getBoardSvc = async (user_id, id) => {
    return await getBoardbyId(user_id, id);
}

export const updateBoardSvc = async (id,user_id, req) => {
    const data =  await boardUpdate(id,user_id, req);
    if (!data) {
        throw new Error("not found");
    }

    return data;
}

export const deleteBoardSvc = async (id,user_id) => {
    const now = new Date().toISOString();
    const data =  await boardDelete(id,user_id, now);
    if (!data) {
        throw new Error("not found");
    }

    return data;
}

export const createColumnSvc = async (user_id, board_id, req) => {
    return await createColumn(user_id, board_id, req);
}

export const updateColumnSvc = async (id,user_id, board_id,req) => {
    const column = await columnUpdate(id, user_id, board_id,req);
    if (!column) {
        throw new Error("not found");
    }

    return column;
}

export const deleteColumnSvc = async (id, user_id, board_id) => {
    const now = new Date().toISOString();
    const column = await columnDelete(id,user_id, board_id, now);
    if (!column) {
        throw new Error("not found");
    }

    return column;
}