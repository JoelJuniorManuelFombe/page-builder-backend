import { project } from '../models/project'

// new
const newProject = async (req, res) => {
    try {
        const Project: any = new project({
            projectName: req.body.firstName,
        });
        await Project.save();
        // const save = await newUser.save(newUser);
        return res.status(201).json(Project);
    } catch (error) {
        return res.status(500);
        console.log("user not created: ", error);
    }
};

// get all
const getProjects = async (req, res) => {
    try {
        const projects = await project.find();
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(404);
    }
};

// get one by id
const getProjectById = async (req, res) => {
    try {
        const projects = await project.find({ _id: req.params._id });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(404);
    }
};

// delete one by id
const deleteProjectById = async (req, res) => {
    try {
        const projects = await project.deleteOne({ _id: req.params._id });
        return res.status(200).json({ Mensage: "Project deleted successfully" });
    } catch (error) {
        return res.status(404);
    }
};

// update one by id
const updateProject = async (req, res) => {
    try {
        const _id = req.params._id
        const projects = await project.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(404);
    }
};

export { newProject, getProjects, getProjectById, deleteProjectById, updateProject };
