import {Model, DataTypes} from "sequelize";
import { sequelize } from "./connection";
export class Auth extends Model {};
    Auth.init({
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
        },{
            sequelize,
            modelName: "auth"
        }
);