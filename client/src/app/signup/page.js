"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Register } from "@/createSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { api } from "@/apiURL";
import CircularProgress from "@mui/material/CircularProgress";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Page() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [FirstName, setFirstName] = React.useState();
  const [LastName, setLastName] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [Email, setEmail] = React.useState(null);
  // const[phone,setPhone]=React.useState()
  const [load, setLoad] = React.useState(false);
  const [isEmailed, setIsEmailed] = React.useState(false);
  const [university, setUniversity] = React.useState();
  const[id,setId]=React.useState()

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!FirstName || !LastName || !password || !confirmPassword || !Email) {
      setLoading(false);
      alert("plas fill all details");
    } else {
      if (password === confirmPassword) {
        try {
          const data = await {
            FirstName,
            LastName,
            password,
            confirmPassword,
            Email,
            university,
          };

          const response = await axios.post(`${api}register`, {
            Userdata: data,
          });

          // setId(response.data)
          response.data.result? setId(response.data.result._id):""
          console.log("response", response);

          if (response.data.alreadyExist) {
            setLoading(false);
            alert("Credentials are already ussed");
          } else {
            setLoading(false);
            setSuccess(true);
          }
        } catch (err) {
          setLoading(false);
          console.log("error in registration frotend", err);
        }
      }
    }
  };

  console.log("jjjjjjjjj",id)

  const resendEmail=async()=>{
    try{
       const response=await axios.get(`${api}resendEmail/${id}/${Email}`)
       console.log(response)
    }catch(error){
      console.log("error in resend Email",error)
    }
  }

  const emailVerify = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);
    const patternEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    setIsEmailed(patternEmail.test(enteredEmail));
  };
  console.log(isEmailed);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="bg-blue-50 mt-20">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={emailVerify}
                  style={{ borderColor: isEmailed ? "initial" : "green" }}
                />
                {!isEmailed && Email !== null ? (
                  <p style={{ color: "red" }}>Please enter a valid email</p>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                required
                  fullWidth
                  label="Your University"
                  variant="outlined"
                  inputProps={{
                    list: "input",
                  }}
                  onChange={(e)=>setUniversity(e.target.value)}
                />
                <datalist id="input">
                  <option value="LNCT University Bhopal">LNCT University Bhopal</option>
                  <option value="LNCT University indore">LNCT University indore</option>
                  <option value="RKDF University Bhopal">RKDF University Bhopal</option>
                  <option value="LPU University Chandigarh">LPU University Chandigarh</option>
                  <option value="IIT Indore">IIT Indore</option>
                  <option value="IIT Mumbai">IIT Mumbai</option>
                  <option value="IIT Madras">IIT Madras</option>
                  <option value="IIT Chennai">IIT Chennai</option>
                  <option value="IIT Bengaluru">IIT Bengaluru</option>
                  <option value="IES Bhopal">IES Bhopal</option>
                  <option value="JLU Bhopal">JLU Bhopal</option>
                  <option value="Oriental Bhopal">Oriental Bhopal</option>
                  <option value="SAGE Bhopal">SAGE Bhopal</option>
                  <option value="MANIT Bhopal">MANIT Bhopal</option>
                </datalist>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>{" "}
            <br />
            {success && (
              <p style={{ color: "blue" }}>
                To verify Pls Click On the Link sent to your Email <br />
                  <b className="cursor-pointer" onClick={resendEmail}>resend Email</b>
              </p>
            )}
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              ""
            )}
            <Button
              className="bg-green-500"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" style={{ color: "blue" }}>
                  {"Already Have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
