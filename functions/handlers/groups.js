const {db} = require("../util/admin");
// exports.createNewGroup

exports.getGroupData = (req, res) => {
  let groupData = {};
  db.collection("groups").doc(req.params.groupId).get().then((doc) =>{
    if (!doc.exists) {
      return res.status(404).json({error: "Group not found"});
    }
    groupData = doc.data();
    groupData.id = doc.id;
    groupData.name = doc.data().name;
    groupData.members = doc.data().members;
    return db.collection("groups").doc(req.params.groupId)
        .collection("channels").get();
  }).then(async (snapshot) => {
    groupData.channels = snapshot.docs.map((doc) => doc.id);
    const reads = groupData.channels.map((channel) => 
      db.collection("groups").doc(req.params.groupId).collection("channels")
          .doc(channel).get()
    );
    const data = await Promise.all(reads);
    groupData.channelData = data.map((doc) => doc.data());

    return res.json(groupData);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({error: err.code});
  });
};


exports.getChannelData = (req, res) => {
  let channelData = {}
  db.collection("groups").doc(req.params.groupId).collection("channels")
      .doc(req.params.channelId).collection("mugSheets").get()
      .then((snapshot) =>{
        
        channelData.data = snapshot.docs.map(doc => (
          {id: doc.id, ...doc.data()}
        ))
        console.log(channelData.data.tasks)
        return res.json(channelData)
      }).catch((err) => {
        console.error(err);
        res.status(500).json({error: err.code});
      })
}