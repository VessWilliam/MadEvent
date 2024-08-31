import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  thumbnail: string;
  status: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  thumbnail: { type: String, required: true },
  status: {
    type: String,
    enum: ["Ongoing", "Completed"],
    default: "Ongoing",
  },
});

const Event = mongoose.model<IEvent>("Event", EventSchema);

export default Event;
