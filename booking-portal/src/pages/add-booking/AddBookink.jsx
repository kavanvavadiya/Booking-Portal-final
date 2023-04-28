import React, { useEffect, useRef, useState } from 'react'
import './addBooking.css'
import { Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

const slots = [
  "7:30 AM",
  "8:30 AM",
  "7:30 PM",
  "8:30 PM"
]
export default function AddBookink() {

  const tommorow = dayjs().add(1, "day");
  const dayafter = dayjs().add(2, "day");
  const [court, setCourt] = useState('');

  const [date, setDate] = useState();
  // const [isMessage, setIsMessage] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [timeSlot, setTimeSlot] = useState('');
  const [isSlotBooked, setIsSlotBooked] = useState([false, false, false, false, false, false, false, false]);
  const [exceed_dates, setExceed_dates] = useState([]);

  let badmintonslot_ex = [6, 10, 9, 8, 15, 15, 15, 15];
  let squashslot_ex = [3, 5, 6, 2, 15, 15, 15, 15];
  let gymslot_ex = [4, 0, 3, 2, 15, 15, 15, 15];
  let swimmingslot_ex = [1, 8, 7, 5, 15, 15, 15, 15];
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("booking/all")
      console.log(res)
      setData(res.data);

    };
    fetchData();
  }, []);


  function countFreq(arr, n) {
    console.log(arr)
    let visited = Array.from({ length: n }, (_, i) => false);
    // Traverse through array elements and
    // count frequencies
    for (let i = 0; i < n; i++) {

      // Skip this element if already processed
      if (visited[i] === true)
        continue;

      // Count frequency
      let count = 1;
      for (let j = i + 1; j < n; j++) {
        if (arr[i] === arr[j]) {
          visited[j] = true;
          count++;
          if (count >= 2) {
            console.log("this is count")

            setExceed_dates(
              exceed_dates => [
                ...exceed_dates,
                arr[j]
              ]

            )
            console.log(exceed_dates)
            console.log("yess")

          }
        }

      }

    }
  }
  useEffect(() => {
    let dates = []
    const message = async () => {
      dates = data.map(function (item) {
        return dayjs(item.date).format('DD/MM/YYYY');
      })
      countFreq(dates, dates.length)
    };
    message();
  }, [data]);
  const badmintonslot = useRef(badmintonslot_ex)
  const squashlot = useRef(squashslot_ex)
  const gymslot = useRef(gymslot_ex)
  const swimmingslot = useRef(swimmingslot_ex)

  useEffect(() => {
    badmintonslot.current = badmintonslot_ex;
    squashlot.current = squashslot_ex;
    gymslot.current = gymslot_ex;
    swimmingslot.current = swimmingslot_ex;
    const fetch = async () => {
      for (let index = 0; index < data.length; index++) {
        if (data[index].sport === 'badminton') {
          for (let i = 0; i < slots.length; i++) {
            if (data[index].time === slots[i]) {
              if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(dayafter).format('DD/MM/YYYY')) {
                badmintonslot.current[i + 4]--;
                let temp = isSlotBooked;
                temp[i + 4] = true;
                setIsSlotBooked(temp);

              }
              else if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(tommorow).format('DD/MM/YYYY')) {

                badmintonslot.current[i]--;
                let temp = isSlotBooked;
                temp[i] = true;
                setIsSlotBooked(temp);
              }
            }
          }
        }
        if (data[index].sport === 'gym') {
          for (let i = 0; i < slots.length; i++) {
            if (data[index].time === slots[i]) {
              if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(dayafter).format('DD/MM/YYYY')) {
                gymslot.current[i + 4]--;
                let temp = isSlotBooked;
                temp[i + 4] = true;
                setIsSlotBooked(temp);
              }
              else if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(tommorow).format('DD/MM/YYYY')) {
                gymslot.current[i]--;
                let temp = isSlotBooked;
                temp[i] = true;
                setIsSlotBooked(temp);
              }
            }
          }
        }
        if (data[index].sport === 'squash') {
          for (let i = 0; i < slots.length; i++) {
            if (data[index].time === slots[i]) {
              if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(dayafter).format('DD/MM/YYYY')) {
                squashlot.current[i + 4]--;
                let temp = isSlotBooked;
                temp[i + 4] = true;
                setIsSlotBooked(temp);
              }
              else if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(tommorow).format('DD/MM/YYYY')) {
                squashlot.current[i]--;
                let temp = isSlotBooked;
                temp[i] = true;
                setIsSlotBooked(temp);
              }
            }
          }
        }


        if (data[index].sport === 'swimming') {
          for (let i = 0; i < slots.length; i++) {
            if (data[index].time === slots[i]) {
              if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(dayafter).format('DD/MM/YYYY')) {
                swimmingslot.current[i + 4]--;
                let temp = isSlotBooked;
                temp[i + 4] = true;
                setIsSlotBooked(temp);
              }
              else if (dayjs(data[index].date).format('DD/MM/YYYY') === dayjs(tommorow).format('DD/MM/YYYY')) {
                swimmingslot.current[i]--;
                let temp = isSlotBooked;
                temp[i] = true;
                setIsSlotBooked(temp);
              }
            }
          }
        }
      }
    };




    fetch();

  }, [data]);

  const handleSubmit = async () => {
    const newBooking = {
      sport: court,
      date: date,
      time: timeSlot
    };
    try {
      await axios.post("/booking/add", newBooking);
      window.location.reload();
    } catch (err) {
      setIsErr(true);
    }
  };
  return (
    <>
      <div className="addBooking">
        <div className="head"> Available Slots</div>
        <form onSubmit={handleSubmit} className='form'>
          <div className="startContain">
            <div className="court">
              <InputLabel id="demo-simple-select-label" fullWidth>Court</InputLabel>
              <Select
                style={{ width: '300px' }}
                width="100"
                required
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={court}
                label="Age"
                defaultValue='badminton'
                onChange={(e) => { setCourt(e.target.value); }}
              >
                <MenuItem value='badminton'>Badminton</MenuItem>
                <MenuItem value='squash'>Squash</MenuItem>
                <MenuItem value='gym'>Gym</MenuItem>
                <MenuItem value='swimming'>Swimming</MenuItem>
              </Select>
            </div>
            <Link to='booking' >
              <Button className="bookingList" variant="contained" color="info">
                My Bookings
              </Button>
            </Link>
          </div>
          <div className="slotContainer">
            {slots.map(function (slot, index) {
              return <>
                {court === 'badminton' && (<>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(tommorow).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(tommorow).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {badmintonslot.current[index]}/15 slots left !!!
                      </div>


                      {badmintonslot.current[index] && !exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) && !isSlotBooked[index]
                        ? <div className="book-btn"
                          onClick={() => {
                            setDate(tommorow);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}

                    </div>
                    <div className="err">
                      {!isSlotBooked[index] && exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) ? "You exceed your booking for this date" : ""}
                      {isSlotBooked[index] ? "You already booked for this time Slot" : ""}
                    </div>

                  </div>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(dayafter).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(dayafter).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {badmintonslot.current[index + 4]}/15 slots left !!!
                      </div>

                      {badmintonslot.current[index + 4] && !exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) && !isSlotBooked[index + 4]
                        ? <div className="book-btn"
                          onClick={() => {
                            setDate(dayafter);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}
                    </div>
                    <div className="err">
                      {!isSlotBooked[index + 4] && exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) ? "You Exceed your booking for this date" : ""}
                      {isSlotBooked[index + 4] ? "You already booked for this time Slot" : ""}
                    </div>
                  </div>
                </>)}
                {court === 'squash' && (<>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(tommorow).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(tommorow).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {squashlot.current[index]}/15 slots left !!!
                      </div>

                      {squashlot.current[index] && !exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) && !isSlotBooked[index]
                        ? <div className="book-btn"
                          onClick={() => {
                            setDate(tommorow);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}
                    </div>
                    <div className="err">
                      {!isSlotBooked[index] && exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) ? "You Exceed your booking for this date" : ""}
                      {isSlotBooked[index] ? "You already booked for this time Slot" : ""}
                    </div>
                  </div>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(dayafter).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(dayafter).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {squashlot.current[index + 4]}/15 slots left !!!
                      </div>


                      {squashlot.current[index + 4] && !exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) && !isSlotBooked[index + 4]
                        ? <div className="book-btn"
                          onClick={() => {
                            setDate(dayafter);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}
                    </div>
                    <div className="err">
                      {!isSlotBooked[index + 4] && exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) ? "You Exceed your booking for this date" : ""}
                      {isSlotBooked[index + 4] ? "You already booked for this time Slot" : ""}
                    </div>
                  </div>
                </>)}
                {court === 'gym' && (<>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(tommorow).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(tommorow).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {gymslot.current[index]}/15 slots left !!!
                      </div>


                      {gymslot.current[index] && !exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) && !isSlotBooked[index] ?
                        <div className="book-btn"
                          onClick={() => {
                            setDate(tommorow);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}
                    </div>
                    <div className="err">
                      {!isSlotBooked[index] && exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) ? "You Exceed your booking for this date" : ""}
                      {isSlotBooked[index] ? "You already booked for this time Slot" : ""}
                    </div>
                  </div>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(dayafter).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(dayafter).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {gymslot.current[index + 4]}/15 slots left !!!
                      </div>


                      {gymslot.current[index + 4] && !exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) && !isSlotBooked[index + 4] ?
                        <div className="book-btn"
                          onClick={() => {
                            setDate(dayafter);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}
                    </div>
                    <div className="err">
                      {!isSlotBooked[index + 4] && exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) ? "You Exceed your booking for this date" : ""}
                      {isSlotBooked[index + 4] ? "You already booked for this time Slot" : ""}
                    </div>
                  </div>
                </>)}
                {court === 'swimming' && (<>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(tommorow).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(tommorow).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {swimmingslot.current[index]}/15 slots left !!!
                      </div>


                      {swimmingslot.current[index] && !exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) && !isSlotBooked[index]
                        ? <div className="book-btn"
                          onClick={() => {
                            setDate(tommorow);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}
                    </div>
                    <div className="err">
                      {!isSlotBooked[index] && exceed_dates.includes(dayjs(tommorow).format('DD/MM/YYYY')) ? "You Exceed your booking for this date" : ""}
                      {isSlotBooked[index] ? "You already booked for this time Slot" : ""}
                    </div>
                  </div>
                  <div className="cardContainer">
                    <div className="section1">
                      <div className="time">
                        {slot}
                      </div>
                      <div className="date">
                        {dayjs(dayafter).format('DD/MM/YYYY')}
                      </div>
                      <div className="day">
                        ({dayjs(dayafter).format('ddd')})
                      </div>
                    </div>
                    <div className="section2">
                      <div className="slotsleft">

                        {swimmingslot.current[index + 4]}/15 slots left !!!
                      </div>


                      {swimmingslot.current[index + 4] && !exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) && !isSlotBooked[index + 4]
                        ? <div className="book-btn"
                          onClick={() => {
                            setDate(dayafter);
                            setTimeSlot(slot);
                            handleSubmit();

                          }}>
                          Book Slot
                        </div> : ""}
                    </div>
                    <div className="err">
                      {!isSlotBooked[index + 4] && exceed_dates.includes(dayjs(dayafter).format('DD/MM/YYYY')) ? "You Exceed your booking for this date" : ""}
                      {isSlotBooked[index + 4] ? "You already booked for this time Slot" : ""}
                    </div>
                  </div>
                </>)}
              </>
            })}
          </div>
        </form>
      </div>


      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label="Choose Date for Booking"
  
        minDate={today}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
          console.log(String(dayjs(newValue).format('DD/MM/YYYY')))
          console.log(exceed_dates)
          console.log(exceed_dates.includes(dayjs(newValue).format('DD/MM/YYYY')))
          if(exceed_dates.includes(dayjs(newValue).format('DD/MM/YYYY'))){

            setIsMessage(true);
          }
          else {
            setIsMessage(false);
          }
        }
        }
        slotProps={{
          textField: {
            helperText: 'MM/DD/YYYY',
          },
        }}
        required
        />
      </DemoContainer>
    </LocalizationProvider> */}



    </>
  )
}
