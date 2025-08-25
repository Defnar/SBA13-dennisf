require("dotenv").config();
const express = require("express");
const app = express();

const db = require("./db/connection");
const uri = process.env.MONGO_URI;
const port = process.env.PORT || 8000;

db(uri);

app.use(express.json());
