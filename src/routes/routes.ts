// import
import express from "express";

// user
import {
    deleteUserById,
    getUserById,
    getUsers,
    newUser,
    updateUser,
} from "../controllers/user";

// project
import {
    deleteProjectById,
    getProjectById,
    getProjects,
    newProject,
    updateProject,
} from "../controllers/project";

// page
import {
    deletePageById,
    getPageById,
    getPages,
    newPage,
    updatePage,
} from "../controllers/page";

// instanc
const router = express.Router();

// server front
router.get("/", (req, res) => {
    res.send("Server On");
    console.log("Server On");
});

// user
router.post("/api/users", newUser);
router.get("/api/users", getUsers);
router.get("/api/user/:_id", getUserById);
router.delete("/api/user/:_id", deleteUserById);
router.patch("/api/user/:_id", updateUser);

// project
router.post("/api/projects", newProject);
router.get("/api/projects", getProjects);
router.get("/api/project/:_id", getProjectById);
router.delete("/api/project/:_id", deleteProjectById);
router.patch("/api/project/:_id", updateProject);

// page
router.post("/api/pages", newPage);
router.get("/apit/pages", getPages);
router.get("/api/page/:_id", getPageById);
router.delete("/api/page/:_id", deletePageById);
router.patch("/api/page/:_id", updatePage);

export default router;