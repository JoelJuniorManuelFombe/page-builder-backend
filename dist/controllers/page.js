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

// src/controllers/page.ts
var page_exports = {};
__export(page_exports, {
  deletePageById: () => deletePageById,
  getPageById: () => getPageById,
  getPages: () => getPages,
  newPage: () => newPage,
  updatePage: () => updatePage
});
module.exports = __toCommonJS(page_exports);

// src/models/page.ts
var import_mongoose = require("mongoose");
var Page = new import_mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true
    },
    projectId: {
      type: import_mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true
    },
    body: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);
var page = (0, import_mongoose.model)("pages", Page);

// src/controllers/page.ts
var newPage = async (req, res) => {
  try {
    const Page2 = new page({
      pageName: req.body.firstName,
      projectId: req.body.projectId,
      body: req.body.body
    });
    await Page2.save();
    return res.status(201).json(Page2);
  } catch (error) {
    return res.status(500);
    console.log("user not created: ", error);
  }
};
var getPages = async (req, res) => {
  try {
    const pages = await page.find();
    return res.status(200).json(pages);
  } catch (error) {
    return res.status(404);
  }
};
var getPageById = async (req, res) => {
  try {
    const pages = await page.find({ _id: req.params._id });
    return res.status(200).json(pages);
  } catch (error) {
    return res.status(404);
  }
};
var deletePageById = async (req, res) => {
  try {
    const pages = await page.deleteOne({ _id: req.params._id });
    return res.status(200).json({ Mensage: "Page deleted successfully" });
  } catch (error) {
    return res.status(404);
  }
};
var updatePage = async (req, res) => {
  try {
    const _id = req.params._id;
    const pages = await page.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.status(200).json(pages);
  } catch (error) {
    return res.status(404);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deletePageById,
  getPageById,
  getPages,
  newPage,
  updatePage
});
