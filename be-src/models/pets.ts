import {Model, DataTypes} from "sequelize";
import { sequelize } from "./connection";

export class Pet extends Model {};

Pet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: true
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        last_seen_lat: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        last_seen_lon: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        reports: {
            type: DataTypes.ARRAY(DataTypes.JSON)
        },
        last_seen: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize, modelName: "pet"
    }
);
export default Pet;