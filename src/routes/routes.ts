// import
import express from "express";

// user
import {
    deleteUserById,
    getUserById,
    getUsers,
    newUser,
    updateUser,
    newTest
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
import { AuthGuard } from "../guards/Auth.guard";

// instanc
const router = express.Router();

// server front
router.get("/", (req, res) => {
    res.send("Server On");
    console.log("Server On");
});

// user
router.post('/api/test', newTest)
router.post("/api/users", newUser);
router.get("/api/users",AuthGuard, getUsers);
router.get("/api/user/:_id",AuthGuard, getUserById);
router.delete("/api/user/:_id",AuthGuard, deleteUserById);
router.patch("/api/user/:_id", updateUser);

// project
router.post("/api/projects",AuthGuard, newProject);
router.get("/api/projects",AuthGuard, getProjects);
router.get("/api/project/:_id",AuthGuard, getProjectById);
router.delete("/api/project/:_id",AuthGuard, deleteProjectById);
router.patch("/api/project/:_id",AuthGuard, updateProject);

// page
router.post("/api/pages",AuthGuard, newPage);
router.get("/apit/pages",AuthGuard, getPages);
router.get("/api/page/:_id",AuthGuard, getPageById);
router.delete("/api/page/:_id",AuthGuard, deletePageById);
router.patch("/api/page/:_id",AuthGuard, updatePage);

export default router;