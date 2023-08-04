import { adminAuth } from "../connection/firebase/firebaseAdmi";
import { Request, Response, NextFunction } from "express";

export const AuthGuard = async (req: Request, res: Response, next: NextFunction) => {
    const { access_token } = req.headers;
    try {
        const { uid } = await adminAuth.verifyIdToken(access_token);
        req.owner = {
            uid,
        };
        return next();
    } catch (error) {
        return res.status(401).json({ error_mensage: "Not Authorized" });
    }
};
