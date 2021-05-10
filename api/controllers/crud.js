const Data = require("../models/crud");

module.exports.insertdata = (req, res) => {
  console.log("data addedd...Entry ");
  const db = req.app.get("db");
  const data = new Data(req.body);
  db.collection("redpositive").insertOne(data);
  res.send("Data addedd....");
  console.log("data addedd...");
};

module.exports.showdata = async (req, res) => {
  const db = req.app.get("db");
  const cursor = db.collection("redpositive").find({});
  const data = await cursor.toArray();
  res.json(data);
};
