import { getUser, LoginRepo, RegisterRepo } from "../repository/user.repo.js";
import { hashingPw, verifiedPw } from "../utils/hashing.utils.js";
import { generateRefreshRoken, generateToken, verificationToken } from "../utils/jwt.utils.js";

export const registerService = async (bodyReq) => {
   try {
        bodyReq.password = hashingPw(bodyReq.password);
        return await RegisterRepo(bodyReq);
   } catch (error) {
     if (error.code === 'P2002') {
        throw new Error("data exists");
     }
   }
}

export const loginService =  async (bodyreq) =>{
    const data = await LoginRepo(bodyreq.email);
    if (!data) {
        throw new Error("data not found");    
    }
    
    if (!verifiedPw(bodyreq.password, data.password)) {
        throw new Error("data not found");  
    }
    const tokenAccess = generateToken(data.id, data.email);
    const tokenRefresh = generateRefreshRoken(data.id, data.email);

    return {
        access_token: tokenAccess,
        refresh_token: tokenRefresh 
    }
}


export const generateTokenFromAccessToken = async (token) =>{
    const refresh = verificationToken('refresh_token', token);
    const data = await getUser(refresh.id_user);
    const newAccessToken = generateToken(data.id, data.email);


    return newAccessToken; 
}


export const getProfile = async (id) =>{
    const data = await getUser(id);
    if (!data) {
        throw new Error("data not found"); 
    }

    return {
        id: data.id,
        username: data.username,
        email: data.email,
        created_at: data.created_at,
        updated_at: data.updated_at
    };
}


