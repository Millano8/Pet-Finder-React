import { Seen, User } from "../models";

type SeenType = {
    reporter_id: number,
    reporter_name: string,
    reporter_phone_number: string,
    message: string,
};

class SeenController {
    static async create(seenData:SeenType) {
        try {
            const userExists = await User.findByPk(seenData.reporter_id);
            if(!userExists) {
                console.error("El usuario no existe")
            };
            const seen = await Seen.create({
                ...seenData,
                userId: seenData.reporter_id
            });
            return seen;
        } catch (error) {
            console.error('Error in SeenController.create()', error);
        };
    };
};

export {SeenController, SeenType}