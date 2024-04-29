import {Model, DataTypes} from "sequelize";
import { sequelize } from "./connection";

export class Seen extends Model {};

Seen.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        reporter_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reporter_phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize, modelName: "seen"
    }
);
export default Seen;