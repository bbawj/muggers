const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const { db } = require('./util/admin');

const {getGroupData, getChannelData} = require("./handlers/groups");
// Group routes
app.get("/group/:groupId", getGroupData);
// app.post('/group', createNewGroup)
app.get("/group/:groupId/channel/:channelId", getChannelData);

exports.api = functions.region("asia-east2").https.onRequest(app);
// group invite array has increased, send notification
// exports.GroupInviteNotification = functions.region('asia-east2')
//                                     .firestore.document('/users/{userId}')
//                                     .onUpdate((change,context) => {
//                                         if (change.after.data().group_inv.length > change.before.data().group_inv.length){
//                                             return db.collection('notifications').add({
//                                                 created_at: firebase.firestore.FieldValue.serverTimestamp(),
//                                                 read: false,
//                                                 receiver: context.params.userId,
//                                                 payload: change.after.data().group_inv[change.after.data().group_inv.length -1],
//                                                 type: "group"
//                                             })
//                                         } else{
//                                             return
//                                         }
//                                     })