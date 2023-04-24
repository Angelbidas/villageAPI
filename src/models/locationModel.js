import { Schema, model } from "mongoose";

const locationSchema = new Schema({
  village: {
    type: String,
    required: true,
  },
  cell: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
  house: {
    type: Schema.Types.ObjectId,
    ref: "house",
    required: true,
  },
});

const locationModel = model("location", locationSchema);

export default locationModel;
