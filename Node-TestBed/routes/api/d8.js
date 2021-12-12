const Data = require("../../models/D8");
const express = require("express");

require("dotenv/config");

const router = express.Router();

router.get("/", async (req, res) => {
  /// get all the data in the database
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
});

router.get("/count", async (req, res) => {
  try {
    Data.countDocuments({}, (err, count) => {
      if (err) {
        res.status(500).send({ status: false, error: err });
      } else {
        res.status(200).send({ data: count });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

router.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const data_object = new Data({ ...req.body });
    const savedData = await data_object.save();
    console.log("Data added successfully", savedData);
    res.json({ status: true, data: data_object });
  } catch (error) {
    console.log(error);
    res.json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await Data.findById(req.params.id);
    res.json({ data });
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:id", async (req, res) => {
  /// update the attributes of a data record in the database
  try {
    const updatedData = await Data.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    const data = await Data.findById(req.params.id);
    console.log("Data updated successfully");
    res.json(data);
  } catch (error) {
    res.json({ message: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const removedData = await Data.deleteOne({ _id: req.params.id });
    console.log("Data deleted successfully");
    res.json(removedData);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
