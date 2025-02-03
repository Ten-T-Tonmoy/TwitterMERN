import mongoose from "mongoose";

const notifSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like"], //allowed values
    },
  },
  { timestamps: true }
);

//database capital latre>!>
const Notification = mongoose.model("Notification", notifSchema);
export default Notification;
