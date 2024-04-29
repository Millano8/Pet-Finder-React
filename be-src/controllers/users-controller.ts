import { User } from "../models";
import * as crypto from "crypto";

function getSHA256fromSTRING(input:string) {
    return crypto.createHash("sha256").update(input).digest("hex");
};

type UserCreation = {
    email: string,
    password: string,
};

export class UserController {
    static async createUser (userData:UserCreation){
        try {
            const {email, password} = userData;
            const [user, created] = await User.findOrCreate({
                where: {email},
                defaults: {
                    email,
                    password: getSHA256fromSTRING(password)
                }
            });
            if(!created) {
                throw new Error("El correo electrónico corresponde a un usuario existente.")
            } else {
                return user;
            };
        } catch (error) {
            console.error('Error in UserController.create()', error);
        };
    };

    static async setUserData(user_id:number, first_name:string, last_name:string, phone_number:string, city:string){
            try {
                const user = await User.findByPk(user_id);
                if (!user) throw new Error();
                user.update({first_name, last_name, phone_number, city});
                return user;
            } catch (error) {
                console.error('Error in UserController.setUserData()', error);
            };
        };


    static async updatePassword(userId:number, newPassword:string) {
            try {
                const user= await User.findByPk(userId);
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
    static async getUserById(userId:number) {
            try {
                const user = await User.findByPk(userId);
                if(!user) {
                    throw new Error("Usuario no encontrado");
                } else {
                    return user;
                };
            } catch (error) {
                console.error('Error in UserController.getUserById()', error);
            };
        };
    
        static async getUserByEmail(userEmail:string) {
            try {
                const user = await User.findOne({
                    where: {email:userEmail}
                })
                return user
            } catch (error) {
                console.error('Error in UserController.getUserByEmail()', error);
            };
        };

    static async getAllUsers(){
            try {
                const allUsers = await User.findAll();
                return allUsers;
            } catch (error) {
                console.error('Error in UserController.getAllUsers()', error);
            };
        };
    ;
}

