const Data = require("../models/crud");
const { ObjectId } = require("mongodb");
const { request } = require("express");
const nodemailer = require("nodemailer");
const { parse } = require("json2csv");

let transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com",
  port: 465,
  service: "yahoo",
  secure: false,
  auth: {
    user: "redpositive@yahoo.com",
    pass:"*********",
  }, // sent ma batade 6
  tls: {
    rejectUnauthorized: false,
  },
  debug: false,
  logger: true,
});

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
  if (req.query.sortBy === undefined) {
    req.query.sortBy = "_id";
    req.query.sortOrder = 1;
  }

  const cursor = db
    .collection("redpositive")
    .find({})
    .sort({ [req.query.sortBy]: Number(req.query.sortOrder) });
  const data = await cursor.toArray();
  res.json(data);
};

module.exports.deleteMethod = async (req, res) => {
  // const db = req.app.get("db");
  // const cursor = req.body.map((id) => {
  //   ObjectId(id);
  // });
  // const cursor2 = db
  //   .collection("redpositive")
  //   .deleteMany({ _id: { $in: cursor } });
  // res.json({ key: "keyvalue" });
  // console.log("In deletemethod");
  // console.log(cursor);
  const db = req.app.get("db");
  const list = req.body.map((id) => ObjectId(id));
  const cursor = await db
    .collection("redpositive")
    .deleteMany({ _id: { $in: list } });
  //const data = await cursor.toArray();
  console.log(list);
  console.log(req.body);
  res.json({ status: "success" });
};
module.exports.updatedata = async (req, res) => {
  const db = req.app.get("db");

  const cursor = db.collection("redpositive").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        hobbies: req.body.hobbies,
      },
    }
  );
  console.log(req.body);
  res.json({ status: "success" });
};

module.exports.mailMethod = async (req, res) => {
  const db = req.app.get("db");
  const list = req.body.map((id) => ObjectId(id));
  console.log(list);
  const cursor = db.collection("redpositive").find({ _id: { $in: list } });
  const data = await cursor.toArray();
  res.json(data);
  console.log(data);
  const csv = parse(data, ["_id", "name", "email", "phoneNumber", "hobbies"]);

  let info = await transporter.sendMail({
    from: "redpositive@yahoo.com", // sender address
    to: "jay4luhar@gmail.com", // list of receivers
    subject: "MAIL HAS BEEN SENT ..!!!", // Subject line
    text: "RED POSITIVE", // plain text body
    html: "<b>RED POSITIVE</b>", // html body
    attachments: [
      {
        filename: "redpositive@yahoo.com",
        content: csv,
      },
    ],
  });
};
 