const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const router = require("./routes/route");
const mongodb = require("./config/db");

app.use(express.json());
app.use(cors());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server started at ${PORT}`);
    });
    await mongodb(process.env.MONGO_URI);
  } catch (error) {
    console.log("some error occured");
    console.log(error);
  }
};
start();
