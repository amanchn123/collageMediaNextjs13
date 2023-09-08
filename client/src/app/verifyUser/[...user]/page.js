"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Typography, Paper } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function page({ params }) {
  const[mount,setMount]=useState(false)
  const [tokenValid, setTokenValid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const url = `http://localhost:5000/api/verifyUser/${params.user[0]}/verify/${params.user[2]}`;

        console.log("urlllll", url);
        const responose = await axios.get(url);
        console.log("rrr",responose)
        if (responose.data.tokenStatus) {
          setTokenValid(true);
        }
      } catch (err) {
        console.log(err);
      }
    };

    verify();
    setMount(true)
  });

  if(!mount){
    return <h1 style={{fontSize:"200px"}}>Loading....</h1>
  }

 console.log('ffff',tokenValid)

  const containerStyle = {
    textAlign: "center",
    padding: "20px",
    border: "2px solid #4caf50",
    borderRadius: "8px",
    backgroundColor: "#f2f2f2",
    maxWidth: "400px",
    margin: "0 auto",
  };

  const iconStyle = {
    fontSize: "48px",
    color: "#4caf50",
    marginBottom: "20px",
  };

  const styles = {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    paper: {
      padding: "16px",
      textAlign: "center",
    },
    icon: {
      fontSize: "4rem",
      color: "orange",
    },
  };




  if (tokenValid) {
    return (
      <div style={{ display: "grid", placeItems: "center", height: "90vh" }}>
        <div style={containerStyle}>
          <CheckCircle style={iconStyle} />
          <Typography variant="h4">Congratulations!</Typography>
          <Typography variant="body1">
            Your email has been successfully verified for signup.
          </Typography>
          <button
            className="bg-green-500 text-white rounded h-10 w-32"
            onClick={() => router.push("/login")}
          >
            Pls Login
          </button>
        </div>
      </div>
    );
  }else{
    return (
      <div style={styles.root}>
        <Paper style={styles.paper} elevation={3}>
          <div style={{ display: "grid", justifyContent: "center" }}>
            <img style={{ height: "70px" }} src="/invalid.png" />
          </div>
          <Typography variant="h5" gutterBottom>
            Invalid Request
          </Typography>
          <Typography variant="body1">
            The request you made is invalid. Please check the details and try
            again.
          </Typography>
        </Paper>
      </div>
    );
  }


}
