import { Schema, model } from "mongoose";

const User = new Schema(
    {
        uid: {
            type: String,
            unique: true,
            default: null,
        },
        nameUser: {
            type: String,
            required: false,
        },
        emailUser: {
            type: String,
            required: false,
        },
        password: {
            type: String,
            require: false
        },
        photoUrl: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

const user = model("users", User);

export { user };
