import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
const SECRET_KEY = "PetFinderReact";

export class Middlewares {
    public static async verifyToken(req, res: Response, next: NextFunction) {
        const token = req.headers.authorization.split(" ")[1];
        try {
            const data = jwt.verify(token, SECRET_KEY);
            req._user = data;
            next();
        } catch (error) {
            return res.status(403).send({ error });
        }
    }
}