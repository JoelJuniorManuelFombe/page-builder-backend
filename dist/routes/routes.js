var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/package.json
var require_package = __commonJS({
  "node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/package.json"(exports, module2) {
    module2.exports = {
      name: "dotenv",
      version: "16.3.1",
      description: "Loads environment variables from .env file",
      main: "lib/main.js",
      types: "lib/main.d.ts",
      exports: {
        ".": {
          types: "./lib/main.d.ts",
          require: "./lib/main.js",
          default: "./lib/main.js"
        },
        "./config": "./config.js",
        "./config.js": "./config.js",
        "./lib/env-options": "./lib/env-options.js",
        "./lib/env-options.js": "./lib/env-options.js",
        "./lib/cli-options": "./lib/cli-options.js",
        "./lib/cli-options.js": "./lib/cli-options.js",
        "./package.json": "./package.json"
      },
      scripts: {
        "dts-check": "tsc --project tests/types/tsconfig.json",
        lint: "standard",
        "lint-readme": "standard-markdown",
        pretest: "npm run lint && npm run dts-check",
        test: "tap tests/*.js --100 -Rspec",
        prerelease: "npm test",
        release: "standard-version"
      },
      repository: {
        type: "git",
        url: "git://github.com/motdotla/dotenv.git"
      },
      funding: "https://github.com/motdotla/dotenv?sponsor=1",
      keywords: [
        "dotenv",
        "env",
        ".env",
        "environment",
        "variables",
        "config",
        "settings"
      ],
      readmeFilename: "README.md",
      license: "BSD-2-Clause",
      devDependencies: {
        "@definitelytyped/dtslint": "^0.0.133",
        "@types/node": "^18.11.3",
        decache: "^4.6.1",
        sinon: "^14.0.1",
        standard: "^17.0.0",
        "standard-markdown": "^7.1.0",
        "standard-version": "^9.5.0",
        tap: "^16.3.0",
        tar: "^6.1.11",
        typescript: "^4.8.4"
      },
      engines: {
        node: ">=12"
      },
      browser: {
        fs: false
      }
    };
  }
});

// node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/lib/main.js
var require_main = __commonJS({
  "node_modules/.pnpm/dotenv@16.3.1/node_modules/dotenv/lib/main.js"(exports, module2) {
    var fs = require("fs");
    var path = require("path");
    var os = require("os");
    var crypto = require("crypto");
    var packageJson = require_package();
    var version = packageJson.version;
    var LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
    function parse(src) {
      const obj = {};
      let lines = src.toString();
      lines = lines.replace(/\r\n?/mg, "\n");
      let match;
      while ((match = LINE.exec(lines)) != null) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim();
        const maybeQuote = value[0];
        value = value.replace(/^(['"`])([\s\S]*)\1$/mg, "$2");
        if (maybeQuote === '"') {
          value = value.replace(/\\n/g, "\n");
          value = value.replace(/\\r/g, "\r");
        }
        obj[key] = value;
      }
      return obj;
    }
    function _parseVault(options) {
      const vaultPath = _vaultPath(options);
      const result = DotenvModule.configDotenv({ path: vaultPath });
      if (!result.parsed) {
        throw new Error(`MISSING_DATA: Cannot parse ${vaultPath} for an unknown reason`);
      }
      const keys = _dotenvKey(options).split(",");
      const length = keys.length;
      let decrypted;
      for (let i = 0; i < length; i++) {
        try {
          const key = keys[i].trim();
          const attrs = _instructions(result, key);
          decrypted = DotenvModule.decrypt(attrs.ciphertext, attrs.key);
          break;
        } catch (error) {
          if (i + 1 >= length) {
            throw error;
          }
        }
      }
      return DotenvModule.parse(decrypted);
    }
    function _log(message) {
      console.log(`[dotenv@${version}][INFO] ${message}`);
    }
    function _warn(message) {
      console.log(`[dotenv@${version}][WARN] ${message}`);
    }
    function _debug(message) {
      console.log(`[dotenv@${version}][DEBUG] ${message}`);
    }
    function _dotenvKey(options) {
      if (options && options.DOTENV_KEY && options.DOTENV_KEY.length > 0) {
        return options.DOTENV_KEY;
      }
      if (process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0) {
        return process.env.DOTENV_KEY;
      }
      return "";
    }
    function _instructions(result, dotenvKey) {
      let uri;
      try {
        uri = new URL(dotenvKey);
      } catch (error) {
        if (error.code === "ERR_INVALID_URL") {
          throw new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenv.org/vault/.env.vault?environment=development");
        }
        throw error;
      }
      const key = uri.password;
      if (!key) {
        throw new Error("INVALID_DOTENV_KEY: Missing key part");
      }
      const environment = uri.searchParams.get("environment");
      if (!environment) {
        throw new Error("INVALID_DOTENV_KEY: Missing environment part");
      }
      const environmentKey = `DOTENV_VAULT_${environment.toUpperCase()}`;
      const ciphertext = result.parsed[environmentKey];
      if (!ciphertext) {
        throw new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${environmentKey} in your .env.vault file.`);
      }
      return { ciphertext, key };
    }
    function _vaultPath(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      if (options && options.path && options.path.length > 0) {
        dotenvPath = options.path;
      }
      return dotenvPath.endsWith(".vault") ? dotenvPath : `${dotenvPath}.vault`;
    }
    function _resolveHome(envPath) {
      return envPath[0] === "~" ? path.join(os.homedir(), envPath.slice(1)) : envPath;
    }
    function _configVault(options) {
      _log("Loading env from encrypted .env.vault");
      const parsed = DotenvModule._parseVault(options);
      let processEnv = process.env;
      if (options && options.processEnv != null) {
        processEnv = options.processEnv;
      }
      DotenvModule.populate(processEnv, parsed, options);
      return { parsed };
    }
    function configDotenv(options) {
      let dotenvPath = path.resolve(process.cwd(), ".env");
      let encoding = "utf8";
      const debug = Boolean(options && options.debug);
      if (options) {
        if (options.path != null) {
          dotenvPath = _resolveHome(options.path);
        }
        if (options.encoding != null) {
          encoding = options.encoding;
        }
      }
      try {
        const parsed = DotenvModule.parse(fs.readFileSync(dotenvPath, { encoding }));
        let processEnv = process.env;
        if (options && options.processEnv != null) {
          processEnv = options.processEnv;
        }
        DotenvModule.populate(processEnv, parsed, options);
        return { parsed };
      } catch (e) {
        if (debug) {
          _debug(`Failed to load ${dotenvPath} ${e.message}`);
        }
        return { error: e };
      }
    }
    function config2(options) {
      const vaultPath = _vaultPath(options);
      if (_dotenvKey(options).length === 0) {
        return DotenvModule.configDotenv(options);
      }
      if (!fs.existsSync(vaultPath)) {
        _warn(`You set DOTENV_KEY but you are missing a .env.vault file at ${vaultPath}. Did you forget to build it?`);
        return DotenvModule.configDotenv(options);
      }
      return DotenvModule._configVault(options);
    }
    function decrypt(encrypted, keyStr) {
      const key = Buffer.from(keyStr.slice(-64), "hex");
      let ciphertext = Buffer.from(encrypted, "base64");
      const nonce = ciphertext.slice(0, 12);
      const authTag = ciphertext.slice(-16);
      ciphertext = ciphertext.slice(12, -16);
      try {
        const aesgcm = crypto.createDecipheriv("aes-256-gcm", key, nonce);
        aesgcm.setAuthTag(authTag);
        return `${aesgcm.update(ciphertext)}${aesgcm.final()}`;
      } catch (error) {
        const isRange = error instanceof RangeError;
        const invalidKeyLength = error.message === "Invalid key length";
        const decryptionFailed = error.message === "Unsupported state or unable to authenticate data";
        if (isRange || invalidKeyLength) {
          const msg = "INVALID_DOTENV_KEY: It must be 64 characters long (or more)";
          throw new Error(msg);
        } else if (decryptionFailed) {
          const msg = "DECRYPTION_FAILED: Please check your DOTENV_KEY";
          throw new Error(msg);
        } else {
          console.error("Error: ", error.code);
          console.error("Error: ", error.message);
          throw error;
        }
      }
    }
    function populate(processEnv, parsed, options = {}) {
      const debug = Boolean(options && options.debug);
      const override = Boolean(options && options.override);
      if (typeof parsed !== "object") {
        throw new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      }
      for (const key of Object.keys(parsed)) {
        if (Object.prototype.hasOwnProperty.call(processEnv, key)) {
          if (override === true) {
            processEnv[key] = parsed[key];
          }
          if (debug) {
            if (override === true) {
              _debug(`"${key}" is already defined and WAS overwritten`);
            } else {
              _debug(`"${key}" is already defined and was NOT overwritten`);
            }
          }
        } else {
          processEnv[key] = parsed[key];
        }
      }
    }
    var DotenvModule = {
      configDotenv,
      _configVault,
      _parseVault,
      config: config2,
      decrypt,
      parse,
      populate
    };
    module2.exports.configDotenv = DotenvModule.configDotenv;
    module2.exports._configVault = DotenvModule._configVault;
    module2.exports._parseVault = DotenvModule._parseVault;
    module2.exports.config = DotenvModule.config;
    module2.exports.decrypt = DotenvModule.decrypt;
    module2.exports.parse = DotenvModule.parse;
    module2.exports.populate = DotenvModule.populate;
    module2.exports = DotenvModule;
  }
});

// src/routes/routes.ts
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
module.exports = __toCommonJS(routes_exports);
var import_express = __toESM(require("express"));

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

// src/models/project.ts
var import_mongoose2 = require("mongoose");
var Project = new import_mongoose2.Schema(
  {
    projectName: {
      type: String,
      required: true
    },
    userId: {
      type: import_mongoose2.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);
var project = (0, import_mongoose2.model)("projects", Project);

// src/controllers/project.ts
var newProject = async (req, res) => {
  try {
    const Project2 = new project({
      projectName: req.body.firstName
    });
    await Project2.save();
    return res.status(201).json(Project2);
  } catch (error) {
    return res.status(500);
    console.log("user not created: ", error);
  }
};
var getProjects = async (req, res) => {
  try {
    const projects = await project.find();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(404);
  }
};
var getProjectById = async (req, res) => {
  try {
    const projects = await project.find({ _id: req.params._id });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(404);
  }
};
var deleteProjectById = async (req, res) => {
  try {
    const projects = await project.deleteOne({ _id: req.params._id });
    return res.status(200).json({ Mensage: "Project deleted successfully" });
  } catch (error) {
    return res.status(404);
  }
};
var updateProject = async (req, res) => {
  try {
    const _id = req.params._id;
    const projects = await project.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(404);
  }
};

// src/models/page.ts
var import_mongoose3 = require("mongoose");
var Page = new import_mongoose3.Schema(
  {
    pageName: {
      type: String,
      required: true
    },
    projectId: {
      type: import_mongoose3.Schema.Types.ObjectId,
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
var page = (0, import_mongoose3.model)("pages", Page);

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

// src/connection/firebase/firebaseAdmi.ts
var import_firebase_admin = __toESM(require("firebase-admin"));

// src/connection/firebase/serviceAccount.ts
var import_dotenv = __toESM(require_main());
(0, import_dotenv.config)();
var _a;
var serviceAccount = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: (_a = process.env.FIREBASE_PRIVATE_KEY) == null ? void 0 : _a.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  universe_domain: process.env.UNIVERSE_DOMAIN
};

// src/connection/firebase/firebaseAdmi.ts
import_firebase_admin.default.initializeApp({
  credential: import_firebase_admin.default.credential.cert(serviceAccount),
  databaseURL: "https://page-builder-572dd-default-rtdb.firebaseio.com"
});
var adminAuth = import_firebase_admin.default.auth();

// src/guards/Auth.guard.ts
var AuthGuard = async (req, res, next) => {
  const { access_token } = req.headers;
  try {
    const { uid } = await adminAuth.verifyIdToken(access_token);
    req.owner = {
      uid
    };
    return next();
  } catch (error) {
    return res.status(401).json({ error_mensage: "Not Authorized" });
  }
};

// src/routes/routes.ts
var router = import_express.default.Router();
router.get("/", (req, res) => {
  res.send("Server On");
  console.log("Server On");
});
router.post("/api/test", newTest);
router.post("/api/users", newUser);
router.get("/api/users", AuthGuard, getUsers);
router.get("/api/user/:_id", AuthGuard, getUserById);
router.delete("/api/user/:_id", AuthGuard, deleteUserById);
router.patch("/api/user/:_id", updateUser);
router.post("/api/projects", AuthGuard, newProject);
router.get("/api/projects", AuthGuard, getProjects);
router.get("/api/project/:_id", AuthGuard, getProjectById);
router.delete("/api/project/:_id", AuthGuard, deleteProjectById);
router.patch("/api/project/:_id", AuthGuard, updateProject);
router.post("/api/pages", AuthGuard, newPage);
router.get("/apit/pages", AuthGuard, getPages);
router.get("/api/page/:_id", AuthGuard, getPageById);
router.delete("/api/page/:_id", AuthGuard, deletePageById);
router.patch("/api/page/:_id", AuthGuard, updatePage);
var routes_default = router;
