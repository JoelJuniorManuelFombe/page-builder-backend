import { Schema, model } from "mongoose";


const Project = new Schema ({
    projectName: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    }
}, {timestamps: true})

const project = model('projects', Project);

export { project }