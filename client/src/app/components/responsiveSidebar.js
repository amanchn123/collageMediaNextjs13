'use client'
import React from 'react'
import { useMediaQuery } from "@mui/material";
import { Sidebar, SmallSidebar } from './sidebar';
import {Grid} from '@mui/material'

export default function ResponsiveSidebar() {
    const portsize = useMediaQuery("(max-width: 1000px)");
  return (
    <>
            {portsize ? (
  <SmallSidebar />
) : (
  <Grid
    item
    lg={2}
    md={12}
    className="bg-blue-50"
    style={{ position: "fixed", flex: "0 0 250px", height: "100%",top:"110px",left:"30px" }}
  >
    <Sidebar />
  </Grid>
)}
    </>
  )
}
