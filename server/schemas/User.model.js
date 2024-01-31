import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  university: {
    type: String,
  },
  department: {
    type: String,
  },
  courses: [],
  teachers: [],
  routine: {
    type: [
      {
        day: { type: String, default: "" },
        classes: { type: Array, default: [] },
      },
    ],
    default: [
      { day: "", classes: [] },
      { day: "", classes: [] },
      { day: "", classes: [] },
      { day: "", classes: [] },
      { day: "", classes: [] },
      { day: "", classes: [] },
      { day: "", classes: [] },
    ],
  },
  exmroutine: {
    type: [
      {
        day: { type: String, default: "" },
        date: { type: String, default: "" },
        sub: { type: String, default: "" },
        room: { type: String, default: "" },
        time: { type: String, default: "" },
      },
    ],
    default: [],
  },
});

export const userModel = model("user", UserSchema);
