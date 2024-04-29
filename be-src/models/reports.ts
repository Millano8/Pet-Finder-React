import {Model, DataTypes} from "sequelize";
import { sequelize } from "./connection";

export class Report extends Model {};

Report.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        owner_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner_phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pet_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_seen_lat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        last_seen_lon: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        last_seen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lost:{
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize, modelName: "report"
    }
);
export default Report;