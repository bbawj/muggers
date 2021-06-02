const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const firebase_tools = require("firebase-tools");

exports.deleteChannelRecursive = functions.region('asia-east2')
                                .firestore.document('/groups/{groupId}/channels/{channelId}')
                                .onDelete( async (snapshot, context) => {
                                    const groupId = context.params.groupId
                                    const channelId = context.params.channelId
                                    const path = `/groups/${groupId}/channels/${channelId}`
                                    await firebase_tools.firestore.delete(path, {
                                        project: process.env.GCP_PROJECT,
                                        recursive: true,
                                        yes: true
                                    })
                                    return {
                                        path: path
                                    }
                                })

exports.deleteGroupRecursive = functions.region('asia-east2')
                                .firestore.document('/groups/{groupId}')
                                .onDelete( async (snapshot, context) => {
                                    const groupId = context.params.groupId
                                    const path = `/groups/${groupId}`
                                    await firebase_tools.firestore.delete(path, {
                                        project: process.env.GCP_PROJECT,
                                        recursive: true,
                                        yes: true
                                    })
                                    return {
                                        path: path
                                    }
                                })
                                