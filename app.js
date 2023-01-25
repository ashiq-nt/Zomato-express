const express = require("express");
const APIRouter = require("./Routes/APIRouter");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const PORT = 5003;
const MONGODB_URI = "mongodb://127.0.0.1:27017/edureka";
app.use(cors());

app.use(morgan("tiny"));
const { dbAfter, dbBefore } = require("./Routes/debugger");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", APIRouter);

dbBefore("connecting to db");
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    dbAfter("Db connected successfully");
    app.listen(PORT, function () {
      console.log("server is runnig on port ", PORT);
    });
  })
  .catch((error) => {
    console.log("unable to connect with DB");
    console.log(error);
  });
