import {Model, DataTypes} from 'sequelize'
import { sequelize } from "./connection";

export class User extends Model {};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        petsOwned: {
            type: DataTypes.ARRAY(DataTypes.JSON)
        },
    },{
        sequelize, 
        modelName: "user"
    }
);

export default User