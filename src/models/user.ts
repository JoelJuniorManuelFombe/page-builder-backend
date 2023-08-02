import { Schema, model } from 'mongoose'

const User = new Schema ({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    }
},{timestamps: true});

const user = model("users", User);

export { user };

