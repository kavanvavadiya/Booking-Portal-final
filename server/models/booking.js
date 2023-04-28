const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    roll_no: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      default: "210100166",
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    sport: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);