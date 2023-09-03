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

// src/connection/firebase/firebaseConfig.ts
var firebaseConfig_exports = {};
__export(firebaseConfig_exports, {
  app: () => app,
  auth: () => auth
});
module.exports = __toCommonJS(firebaseConfig_exports);
var import_app = require("firebase/app");
var import_auth = require("firebase/auth");
var firebaseConfig = {
  apiKey: "AIzaSyBoQq-fp48nZYTgpLCZPW1oHHk_F4gLE90",
  authDomain: "page-builder-572dd.firebaseapp.com",
  databaseURL: "https://page-builder-572dd-default-rtdb.firebaseio.com",
  projectId: "page-builder-572dd",
  storageBucket: "page-builder-572dd.appspot.com",
  messagingSenderId: "189702000838",
  appId: "1:189702000838:web:6c1d0a5b87063add3c87c7",
  measurementId: "G-1LGGD545JN"
};
var app = (0, import_app.initializeApp)(firebaseConfig);
var auth = (0, import_auth.getAuth)(app);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app,
  auth
});
