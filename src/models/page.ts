import { Schema, model } from "mongoose";



const Page = new Schema ({
    pageName: {
        type: String,
        required: true,
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'projects',
        required: true,
    },
    body: {
        type: String,
        default: null,
    }
}, {timestamps: true})

const page = model('pages', Page);
export { page }