import { User } from "./users";
import { Pet } from "./pets";
import { Report } from  "./reports";
import { Seen } from  "./seen";
import { Auth } from "./auth";

User.hasMany(Pet);
User.hasMany(Report);
User.hasMany(Seen);
Pet.belongsTo(User);
Report.belongsTo(User);
Seen.belongsTo(User);

export { User, Pet, Report, Auth, Seen };