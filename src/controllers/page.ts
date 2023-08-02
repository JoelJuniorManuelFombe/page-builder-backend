import { page } from "../models/page";

// new
const newPage = async (req, res) => {
    try {
        const Page: any = new page({
            pageName: req.body.firstName,
            projectId: req.body.projectId,
            body: req.body.body,
        });
        await Page.save();
        // const save = await newUser.save(newUser);
        return res.status(201).json(Page);
    } catch (error) {
        return res.status(500);
        console.log("user not created: ", error);
    }
};

// get all
const getPages = async (req, res) => {
    try {
        const pages = await page.find();
        return res.status(200).json(pages);
    } catch (error) {
        return res.status(404);
    }
};

// get one by id
const getPageById = async (req, res) => {
    try {
        const pages = await page.find({ _id: req.params._id });
        return res.status(200).json(pages);
    } catch (error) {
        return res.status(404);
    }
};

// delete one by id
const deletePageById = async (req, res) => {
    try {
        const pages = await page.deleteOne({ _id: req.params._id });
        return res
            .status(200)
            .json({ Mensage: "Page deleted successfully" });
    } catch (error) {
        return res.status(404);
    }
};

// update one by id
const updatePage = async (req, res) => {
    try {
        const _id = req.params._id;
        const pages = await page.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        return res.status(200).json(pages);
    } catch (error) {
        return res.status(404);
    }
};

export { newPage, getPages, getPageById, deletePageById, updatePage };
