'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { api } from '@/apiURL';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Login } from '@/createSlice';
import CircularProgress from '@mui/material/CircularProgress';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © CollageMedia'}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Page() {

  const router=useRouter()
  const dispatch=useDispatch()

  const[loading,setLoading]=React.useState(false)
  const[Email,setEmail]=React.useState()
  const[password,setPassword]=React.useState()
  const[success,setSuccess]=React.useState(false)
  const[tokenAgainsend,setTokenAgainsend]=React.useState(false)
  const[loginFailed,setLoginFailed]=React.useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!Email || !password) {
      alert("pls select all field");
    } else {

      try {
        const response = await axios.post(`${api}login`, {
          Email,
          password,
        });
        console.log("response", response);
        if (response.data.tokenAgainSend) {
          setTokenAgainsend(true);
          setLoading(false);
          setLoginFailed(false)
          
        } 
        else {
          setLoading(false);
        }

        if (response.data.response) {
          await dispatch(Login({ payload: response.data }));
          await localStorage.setItem(
            "LoginDetails",
            JSON.stringify(response.data)
          );
          setLoading(false);
          router.push("/");
        } else {
          setLoginFailed(true);
        }

      } catch (err) {
        setLoading(false);
        console.log(err);
      }

    }
  };

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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <br />



            {tokenAgainsend && (
              <p style={{ color: "blue" }}>
                To verify Pls Click On the Link sent to your Email
              </p>
            )}

            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              ""
            )}

            {loginFailed && (
              <div style={{ color: "red" }}>Please Check your Credentials</div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="bg-blue-600"
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" style={{ color: "blue" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}