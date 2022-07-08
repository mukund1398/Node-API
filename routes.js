const express = require("express");
const router = express.Router();
const Model = require("../model/model");
const joi = require("joi");

//  Post Data Method
router.post("/post", async (req, res) => {
  const data = new Model({
    bookName: req.body.bookName,
    qty: req.body.qty,
    image: req.body.image,
    price: req.body.price,
  });
  const scema = joi.object({
    bookName: joi.string().min(3).max(30).required(),
    qty: joi.number().min(1).required(),
    image: joi.string().min(1).required(),
    price: joi.number().min(100).max(500).required(),
  });
  let result = scema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  } else {
    const data2 = await data.save();
    res.status(200).json(data2);
  }
});

// Get All data Method
router.get("/getAll", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get by ID Method
router.get("/get/:id", async (req, res) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
