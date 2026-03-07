import { boardDelete, boardUpdate, createBord, getAllBoards, getBoardbyId} from "../repository/board.repo.js"

export const getAllBoardSvc = async (user_id) => {
    return await getAllBoards(user_id);
}

export const createBoardSvc = async (req) => {
    return await createBord(req);
}

export const getBoardSvc = async (user_id, id) => {
    const data =  await getBoardbyId(user_id, id);
    if (!data) {
        throw new Error("not found");
    }

    return data;
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