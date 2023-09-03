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

// src/models/user.ts
var user_exports = {};
__export(user_exports, {
  user: () => user
});
module.exports = __toCommonJS(user_exports);
var import_mongoose = require("mongoose");
var User = new import_mongoose.Schema(
  {
    uid: {
      type: String,
      unique: true,
      default: null
    },
    nameUser: {
      type: String,
      required: false
    },
    emailUser: {
      type: String,
      required: false,
      unique: true
    },
    password: {
      type: String,
      require: false
    },
    photoUrl: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);
var user = (0, import_mongoose.model)("users", User);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  user
});
