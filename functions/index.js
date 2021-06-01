const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const {db} = require("./util/admin");

exports.newTaskUpdate = functions.region("asia-east2")
    .firestore
    .document("/groups/{groupId}/channels/{channelId}/mugSheets/{sheetId}")
    .onUpdate((change, context) => {
      if (change.after.data().tasks.length >
        change.before.data().tasks.length) {
        const newTaskArr = change.after.data().tasks;
        const newTask = newTaskArr[newTaskArr.length -1];
        const sheetTitle = change.after.data().title;
        return db.collection("groups").doc(context.params.groupId)
            .collection("updates").add({
              type: "new task",
              sheet_title: sheetTitle,
              group_id: context.params.groupId,
              channel_id: context.params.channelId,
              user_id: newTask.created_by,
            });
      } else {
        return true;
      }
    });
