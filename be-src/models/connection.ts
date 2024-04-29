import { Sequelize } from "sequelize";
import "dotenv/config";
const SEQUELIZE_KEY:any = "d04af5e7-43dd-486f-a156-179d613aa225"
console.log(SEQUELIZE_KEY)
export const sequelize = new Sequelize("postgres://wliztepw:gzau5HesfbzgApbyMjjtzo6irIAtyzMQ@isabelle.db.elephantsql.com/wliztepw");

(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    };

        
})();