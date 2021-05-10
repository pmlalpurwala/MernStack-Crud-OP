const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const { errors } = require("celebrate");
const app = express();
const port = 7000;
const DATABASE_URL = "mongodb://localhost:27017";
const CONNECTION_OPTIONS = { poolSize: 20 };
mongodb.MongoClient.connect(
  DATABASE_URL,
  CONNECTION_OPTIONS,
  (error, database) => {
    if (error) {
      throw error;
    }
    const db = database.db("redpositive");
    app.set("db", db);
    console.log("Momgodb SET...");
  }
);

app.use(cors());
app.use(bodyParser.json());

const dataRouter = require("./routers/crud");
app.use("/api", dataRouter);

app.use(errors());

app.get("/", (req, res) => {
  console.log("Server listening");
});

app.listen(port, () => {
  console.log("NODE js connected ...");
});
