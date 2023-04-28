import React, { useEffect, useState } from 'react'
import './mybooking.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { Table } from '@mui/joy'
import axios from 'axios';
import dayjs from 'dayjs'
export default function MyBooking() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("booking/all")
      console.log(res)
      setData(res.data);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="booking">
      <Table className="table" style={{

        right: '85px',
        minWidth: '375px',

      }} aria-label="table sizes" variant="outlined" stripe='odd' stickyHeader hoverRow>
        <thead>
          <tr>
            <th style={{ width: '40%' }}>Sports Court/Ground</th>
            <th>Date</th>
            <th>Time Slot&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id}>
              <td>{row.sport}</td>
              <td>{dayjs(row.date).format('DD/MM/YYYY')}</td>
              <td>{row.time}</td>

            </tr>
          ))}
        </tbody>
      </Table>
      <div className="add-btn">

        <Link to='/' >
          <Button className="add-btn" variant="contained" color="info">
            Add Booking
          </Button>
        </Link>
      </div>
    </div>
  )
}
