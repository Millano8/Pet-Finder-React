import { Auth } from "../models";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import "dotenv/config";
const SECRET_KEY:any = "PetFinderReact";
function getSHA256fromSTRING(input:string) {
    return crypto.createHash("sha256").update(input).digest("hex");
};

type AuthType = {
    user_id: number,
    email: string,
    hashedPassword: string,
};

interface ObjectResponse {
    auth: {
        email:string,
        password:string,
        user_id:number,
        createdAt:string,
        updatedAt:string,
    },
    token:string
}

export class AuthController {
    static async create(authData:AuthType){
        try {
            const {user_id, email, hashedPassword} = authData;
            const [auth, created] = await Auth.findOrCreate({
                where: {email},
                defaults: {
                    user_id,
                    email,
                    password: hashedPassword
                }
            });
            if(!created) {
                throw new Error("El correo electrónico corresponde a un usuario existente.")
            } else {
                return auth;
            };
        } catch (error) {
            console.error('Error in AuthController.create()', error);
        };
    };
    static async findByEmailAuth(email: string) {
        return await Auth.findOne({ where: { email } });
    };
    static async getAuthByEmailAndPassword(email:string, password:string){
        password = getSHA256fromSTRING(password);
        try {
            const auth = await Auth.findAll({
                where: {email, password}
            });
            const token = jwt.sign({id: auth[0].get("user_id")}, SECRET_KEY);
            if(auth) {
                return {auth: auth[0], token};
            } else {
                throw new Error("El usuario con el correo electrónico que estás ingresando no existe.")
            };
        } catch (error) {
            console.error('Error in AuthController.getAuthByEmailAndPassword()', error);
        };
    };
    static async updatePassword(userId:number, newPassword:string){
        try {
            const user = await Auth.findByPk(userId);
            if (!user) {
                return {message: "El usuario no existe"};
            } else {
                user.update({password:getSHA256fromSTRING(newPassword)});
                return {message: "La contraseña se actualizó con éxito"};
            };
        } catch (error) {
            console.error('Error in UserController.updatePassword()', error);
        };
    };
    static async findByPkAuth(id) {
        return await Auth.findByPk(id);
    }
};