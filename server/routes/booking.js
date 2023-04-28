const router = require('express').Router();
const Booking = require('../models/booking');

//Register
router.post("/add", async (req, res) => {
    try {
      //create new user
      const newBooking = new Booking({
        // roll_no: req.body.username,
        date: req.body.date,
        time: req.body.time,
        sport: req.body.sport,
      });
  
      //save user and respond
      const booking = await newBooking.save();
      res.status(200).json(booking);

    } catch (err) {
        console.log(err)
      res.status(500).json(err)
    }
});
router.get("/all", async (req, res) => {
    try {
      // const currentUser = await User.findById(req.body.userId);
      const Bookings = await Booking.find();
      res.json(Bookings)
    } catch (err) {
        console.log(err)
      res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
  
    try {
      await Booking.findByIdAndDelete(req.params.id);
      res.status(200).json("Booking has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
});


module.exports = router;