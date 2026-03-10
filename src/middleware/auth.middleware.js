import { get, set } from "express-http-context";
import { verificationToken } from "../utils/jwt.utils.js";

export const checkAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({
            message: 'auth token is required'
        });
    }

    const token = auth.split(' ');
    if (token[0] !== 'Bearer' || token[1] === '') {
        return res.status(401).json({
            message: 'auth token is missing'
        });
    }

    // check jwt
    const data = verificationToken('access_token',token[1]);
    // set context
    set('user_id', data.id_user);
    set('email_user', data.email_user);
    // set('role_user', data.role);

    next();
    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
};

// export const checkRole = (...role) => {
//     return async (req, res, next) => {
//         const userRole = get('role_user');
//         if (!role.includes(userRole)) {
//             return res.status(403).json({
//                 message: 'Forbidden: Insufficient permissions'
//             });
//         }
//         next();
//     }
// }
