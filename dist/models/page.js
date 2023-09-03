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

// src/models/page.ts
var page_exports = {};
__export(page_exports, {
  page: () => page
});
module.exports = __toCommonJS(page_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  page
});
