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

// src/models/project.ts
var project_exports = {};
__export(project_exports, {
  project: () => project
});
module.exports = __toCommonJS(project_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  project
});
