'use client'

import { Grid,Typography } from '@mui/material'
import React, { useState } from 'react'
import {useMediaQuery} from "@mui/material";
import { SmallSidebar,Sidebar } from '../components/sidebar';
import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";
import UniversitySlider from './slides';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import EventsProg from './events&prog';
import Timeline from '../components/timeline';


export default function page() {
  const[open,setOpen]=useState(false)
    const portsize=useMediaQuery('(max-width: 1000px)')

  return (
<Grid
      container
      lg={12}
      style={{
        color: "black",
        marginTop: "60px",
        padding: portsize ? "0px" : "50px",
        // display: "flex",
       
      }}
    >

      <Grid
        // onClick={() => setOpen(false)}
        item
        lg={6}
        sx={12}
        className="px-10"
        style={{
          zIndex: "1",
          width: "100%",
          flex: "1",
          marginLeft: portsize ? "" : "230px"
          
        }}
      >
             <Typography variant="h4" component="h2" align='center' color="Highlight">
  Top Performer 
</Typography>
       
      <Typography variant="h4" component="h2" mt={6}>
  CodingNinja Rank
</Typography>
        <div
          className="bg-blue-50"
          style={{ padding: portsize ? "20px" : "10px", borderRadius: "10px" }}
        >
             
          <UniversitySlider />
          
        </div> <br /> <br />
        <Typography variant="h4" component="h2">
  HackeRank
</Typography>
        <div
          className="bg-blue-50"
          style={{ padding: portsize ? "20px" : "10px", borderRadius: "10px" }}
        >
             
          <UniversitySlider />
          
        </div>

        <div>
          <Timeline />
        </div>
      </Grid>

        <Grid
          item
          lg={4}
          sx={12}
          className="bg-blue-50 "
          style={{
            position: "fixed",
            flex: "0 0 250px",
            right: "30px",
            height: "100%",
            width: "100%",
            backgroundColor:"#eff6ff",
            overflowY:"scroll"
          }}
        >
              <Typography variant="h4" component="h2" align='center' mb={4}>
  Upcomming Events
</Typography> 
          <div className='grid justify-center'><EventsProg /><br /> <EventsProg /><br /> <EventsProg /></div>
        </Grid>
    </Grid>

  )
}