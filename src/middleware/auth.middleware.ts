import { NextFunction, Response } from "express";
import AuthorizedRequest from "../types/request";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";
export const tokenName = "bug-tracker-token";

const protect = async (
    req: AuthorizedRequest<any>,
    res: Response,
    next: NextFunction
) => {
    // If system doesn't support cookies, use authorization header
    const cookieToken = req.cookies[tokenName];
    const requestToken =
        cookieToken || req.headers.authorization?.split(" ")[1];

    if (requestToken) {
        try {
            const decoded: any = jwt.verify(requestToken, secret);

            req.user = decoded.id;
            req.admin = decoded.admin;

            next();
        } catch (err: any) {
            res.clearCookie(tokenName);
            return res.status(400).json({ message: "Not authorized" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

export default protect;
