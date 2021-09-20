const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const chalk = require("chalk");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(require("./routes/index"));

mongoose
  .connect(process.env.SERVER_CONNECT)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        chalk.bgBlue.yellow.bold(
          `server has been started on port ${process.env.PORT}`
        )
      );
    });
    console.log(chalk.bgBlue.yellow.bold("database connect"));
  })
  .catch(() => {
    console.log(chalk.bgRed.yellow.bold(`error`));
  });
