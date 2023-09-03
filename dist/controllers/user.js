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

// src/controllers/user.ts
var user_exports = {};
__export(user_exports, {
  deleteUserById: () => deleteUserById,
  getUserById: () => getUserById,
  getUsers: () => getUsers,
  newTest: () => newTest,
  newUser: () => newUser,
  updateUser: () => updateUser
});
module.exports = __toCommonJS(user_exports);

// src/models/user.ts
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

// src/services/user.ts
var import_auth2 = require("firebase/auth");

// src/connection/firebase/firebaseConfig.ts
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

// src/services/user.ts
var createUserFirebase = async (emailUser, passwordUser) => {
  try {
    const userCredential = await (0, import_auth2.createUserWithEmailAndPassword)(
      auth,
      emailUser,
      passwordUser
    );
    const credentials = userCredential.user;
    return credentials;
  } catch (error) {
    return error;
  }
};

// src/controllers/user.ts
var newTest = async (req, res) => {
  const { uid, nameUser, emailUser, password, photoUrl } = req.body;
  try {
    const userFirebase = await createUserFirebase(emailUser, password);
    const test = new user({
      uid: userFirebase.uid,
      // nameUser: userFirebase.usar?.displayName,
      emailUser: userFirebase.email,
      password: req.body.password,
      photoUrl
    });
    await test.save();
    return res.status(201).json(userFirebase);
  } catch (error) {
    return res.status(500).json(error);
  }
};
var newUser = async (req, res) => {
  try {
    const User2 = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    await User2.save();
    return res.status(201).json(User2);
  } catch (error) {
    return res.status(500);
    console.log("user not created: ", error);
  }
};
var getUsers = async (req, res) => {
  try {
    const users = await user.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404);
  }
};
var getUserById = async (req, res) => {
  try {
    const users = await user.find({ _id: req.params._id });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404);
  }
};
var deleteUserById = async (req, res) => {
  try {
    const users = await user.deleteOne({ _id: req.params._id });
    return res.status(200).json({ Mensage: "User deleted successfully" });
  } catch (error) {
    return res.status(404);
  }
};
var updateUser = async (req, res) => {
  try {
    const _id = req.params._id;
    const users = await user.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteUserById,
  getUserById,
  getUsers,
  newTest,
  newUser,
  updateUser
});
