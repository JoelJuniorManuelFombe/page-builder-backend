// import
import { user } from "../models/user";
import { Request, Response } from "express";
import { createUserFirebase } from "../services/user";
createUserFirebase;

// TODO: Fix bug on create new user

// new
const newTest: any = async (req: Request, res: Response) => {
    const { uid, nameUser, emailUser, password, photoUrl } = req.body;
    try {
        const userFirebase = await createUserFirebase(emailUser, password);
        const test: any = new user({
            uid: userFirebase.usar?.uid,
            nameUser: userFirebase.usar?.displayName,
            emailUser: userFirebase.usar?.email,
            password: req.body.password,
            photoUrl,
        });
        await test.save();
        return res.status(201).json(test);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const newUser = async (req, res) => {
    try {
        const User: any = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });
        await User.save();
        // const save = await newUser.save(newUser);
        return res.status(201).json(User);
    } catch (error) {
        return res.status(500);
        console.log("user not created: ", error);
    }
};

// get all
const getUsers = async (req, res) => {
    try {
        const users = await user.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404);
    }
};

// get one by id
const getUserById = async (req, res) => {
    try {
        const users = await user.find({ _id: req.params._id });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404);
    }
};

// delete one by id
const deleteUserById = async (req, res) => {
    try {
        const users = await user.deleteOne({ _id: req.params._id });
        return res.status(200).json({ Mensage: "User deleted successfully" });
    } catch (error) {
        return res.status(404);
    }
};

// update one by id
const updateUser = async (req, res) => {
    try {
        const _id = req.params._id;
        const users = await user.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404);
    }
};

export { newUser, getUsers, getUserById, deleteUserById, updateUser, newTest };
