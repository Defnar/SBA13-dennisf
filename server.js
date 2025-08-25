require("dotenv").config();

const db = require("./db/connection");
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

db(uri);