"use client";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Sidebar, SmallSidebar } from "./components/sidebar";
import Slider from "./components/slider";
import TextField from "@mui/material/TextField";
import Timeline from "./components/timeline";
import UploadPost from "./components/uploadPost";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";


export default function Home() {
  const userdata = useSelector((state) => state.auth.user && state.auth.user);
  const [open, setOpen] = useState(false);

  const [scrl, setScrl] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrl(window.screenY);
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const portsize = useMediaQuery("(max-width: 1000px)");

  return (
    <Grid
      container
      lg={12}
      style={{
        color: "black",
        marginTop: "60px",
        padding: portsize ? "0px" : "50px",
        display: "flex",
      }}
    >
      <Grid
        // onClick={() => setOpen(false)}
        item
        lg={8}
        sx={12}
        className="px-10"
        style={{
          zIndex: "1",
          width: "100%",
          flex: "1",
          marginLeft: portsize ? "" : "230px",
        }}
      >
        <div
          className="bg-blue-50"
          style={{ padding: portsize ? "20px" : "10px", borderRadius: "10px" }}
        >
          <Slider />
        </div>
        <div
          className="lg:mt-10 mt-10 bg-blue-50 p-4"
          style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.7)" }}
        >
          <UploadPost />{" "}
        </div>
        <div>
          <Timeline />{" "}
        </div>
      </Grid>
      {portsize ? (
        ""
      ) : (
        <Grid
          item
          lg={2}
          sx={12}
          className="bg-blue-50 "
          style={{
            position: "fixed",
            flex: "0 0 250px",
            right: "30px",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="bg-red-400">Suggestion</div>
        </Grid>
      )}
    </Grid>
  );
}
