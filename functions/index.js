const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const {db} = require("./util/admin");
const firestore_tools = require('firebase-tools');
