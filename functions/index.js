const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const {getGroupData, getChannelData} = require("./handlers/groups");
// Group routes
app.get("/group/:groupId", getGroupData);
// app.post('/group', createNewGroup)
app.get("/group/:groupId/channel/:channelId", getChannelData);


exports.api = functions.https.onRequest(app);
