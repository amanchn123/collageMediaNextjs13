'use client'
import React, { useState } from "react";
import HouseIcon from '@mui/icons-material/House';
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";
import { useSelector } from "react-redux";

export  function Sidebar() {

  return (
    <div class="grid-rows-2">
      <div class=" bg-re-600 flex place-center p-7">
        <img src="profileimg.jpg" className="rounded-full h-16 w-16" /> &nbsp;
        &nbsp;{" "}
        <p className="mt-2">
          Radhe Krishn
          <br />
          @Radhe Radhe{" "}
        </p>
      </div><hr />
      <div class="grid pl-10 text-xl" style={{minHeight:"70vh"}}>
        <span className="place-center" ><HouseIcon style={{fontSize:"40px"}}/>Home</span>
        <span className="place-center" ><PersonIcon style={{fontSize:"40px"}}/>People</span>
        <span className="place-center" ><LibraryBooksTwoToneIcon style={{fontSize:"40px"}}/>Collage Notes</span>
        <span className="place-center" ><ContentPasteTwoToneIcon style={{fontSize:"40px"}}/>Collage Syllabus</span>
        <span className="place-center" ><CalendarMonthIcon style={{fontSize:"40px"}}/>Events</span>
        <span className="place-center" ><GroupsIcon style={{fontSize:"40px"}}/>Groups</span>
        <span className="place-center" ><BookmarksIcon style={{fontSize:"40px"}}/>Saved</span>
      </div>
    </div>
  );
}

export const SmallSidebar=()=>{

  const [open, setOpen] = useState(false);
  return(
    <>
      <div
          className={`z-10 fixed bg-purple-400 ${
            open ? "w-72" : "w-10 -left-10"
          } h-screen duration-300`}
        >
          <MenuOpenTwoToneIcon
            onClick={() => setOpen(!open)} style={{fontSize:"30px"}}
            className={`rounded-full bg-blue-50 cursor-pointer top-3 absolute h-20 ${
              open ? "-right-2" : "-right-8"
            } ${open && "rotate-180"}`}
          />
          {open?<Sidebar />:""}
        </div>
    </>
  )
}


