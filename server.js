const express = require("express");
const app = express();
const routes = require("./route/routes");
const user = require("./route/user");
const dotenv = require("dotenv");

const mongoose = require("mongoose");

dotenv.config();

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
  if (!err) console.log("db connected");
  else console.log("db error", err);
});
app.use(express.json());
app.use("/api", routes);
app.use("/user", user);

app.listen(port, () => {
  console.log("connection listen on" + port);
});
