var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/controllers/project.ts
var project_exports = {};
__export(project_exports, {
  deleteProjectById: () => deleteProjectById,
  getProjectById: () => getProjectById,
  getProjects: () => getProjects,
  newProject: () => newProject,
  updateProject: () => updateProject
});
module.exports = __toCommonJS(project_exports);

// src/models/project.ts
var import_mongoose = require("mongoose");
var Project = new import_mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true
    },
    userId: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);
var project = (0, import_mongoose.model)("projects", Project);

// src/controllers/project.ts
var newProject = async (req, res) => {
  try {
    const Project2 = new project({
      projectName: req.body.firstName
    });
    await Project2.save();
    return res.status(201).json(Project2);
  } catch (error) {
    return res.status(500);
    console.log("user not created: ", error);
  }
};
var getProjects = async (req, res) => {
  try {
    const projects = await project.find();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(404);
  }
};
var getProjectById = async (req, res) => {
  try {
    const projects = await project.find({ _id: req.params._id });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(404);
  }
};
var deleteProjectById = async (req, res) => {
  try {
    const projects = await project.deleteOne({ _id: req.params._id });
    return res.status(200).json({ Mensage: "Project deleted successfully" });
  } catch (error) {
    return res.status(404);
  }
};
var updateProject = async (req, res) => {
  try {
    const _id = req.params._id;
    const projects = await project.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(404);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteProjectById,
  getProjectById,
  getProjects,
  newProject,
  updateProject
});
