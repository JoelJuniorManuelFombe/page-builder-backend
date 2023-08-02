import { connect } from "mongoose";
import { config } from "dotenv";
config();

export const conection = async () => {
    const conection_link: any = process.env.MONGODB_URL;
    try {
        await connect(conection_link);
        console.log("conected");
    } catch (error) {
        console.log("something went wrong");
    }
};
