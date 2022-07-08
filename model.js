const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema({
  bookName: String,
  qty: Number,
  image: String,
  price: Number,
});

module.exports = mongoose.model("Pratice", NewSchema);
