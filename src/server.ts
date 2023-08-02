// import
import { conection } from "./connection/mongodb";
import express from "express";
import router from "./routes/routes";

// instanc
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())
app.use(router);

// Database conection MongoDB
conection();

// Server
app.listen(PORT, () => {
    console.log("Server online");
});
