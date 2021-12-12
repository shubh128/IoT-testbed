var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
};

var DataSchema = new Schema(
  {
    flame_sensor: Number,
    smoke_sensor: Number,
  },
  schemaOptions
);

module.exports = Data = mongoose.model("D2", DataSchema);
