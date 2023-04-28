import React, { useEffect, useState } from 'react'
import './admin.css'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { DeleteOutline} from '@mui/icons-material';
export default function Admin() {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const res = await axios.get("/booking/all")
        let booking = res.data;
        for (let index = 0; index < booking.length; index++) {
          const date = dayjs(booking[index].date ).format('DD/MM/YYYY');
          booking[index].date = date
        }
        setData(booking);
      };
      fetchData();
    }, []);
    const hanledelete = async (id) => {
      await axios.delete(`/booking/${id}`)
      window.location.reload();
   }
    
    console.log(data);

    const columns = [
      {
        field: "roll_no",
        headerName: "Roll Number",
        width: 200,
      },
      {
        field: 'sport',
        headerName: 'Court/Ground',
        width: 150,
      },
      {
        field: 'date',
        headerName: 'Date',
        width: 150,
      },
      {
        field: 'time',
        headerName: 'Time',
        width: 150,
      },
      {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {
          return (
            <>
              <DeleteOutline
                className="userListDelete"
                onClick={() => hanledelete(params.row._id)}
              />
            </>
          );
        },
      },
    ];
  return (
    <div className="booking">
    <Link to='/' >
  <Button className="bookingList" variant="contained" color="info">
Add Booking
  </Button>
  </Link>
  <div className="list">
  <DataGrid
        getRowId={(row) => row._id}
          rows={data}
          columns={columns}
          pageSize={8}
          // rowsPerPageOptions={[8]}
            // checkboxSelection
          />
  </div>
  </div>
  )
}
