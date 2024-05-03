import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { register } from "src/services/authService";
import swal from "sweetalert2";
import DynamicBackdrop from 'src/components/common/backdrop'; // Import the backdrop component
import ReCAPTCHA from "react-google-recaptcha";
import Axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState("");

  const paperStyle = {
    padding: 30,
    height: "60vh",
    width: 290,
    margin: "15vh auto",
    opacity: 0.8,
    background: "rgba(234, 234, 234, 0.7)", // Semi-transparent background color
    backdropFilter: "blur(20px)", // Apply background blur
    WebkitBackdropFilter: "blur(10px)", // Webkit version for Safari
    boxShadow: "none", // Remove box shadow to maintain the glass effect,
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const handleRegister = async () => {
    setLoading(true);
    const success = await register(username, password);
    setLoading(false);
    if (success) {
      console.log("Registration successful!");
      swal.fire({
        title: "Registration Successful!",
        icon: "success",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } else {
      swal.fire({
        title: "Registration Failed",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  //handle register called in on signup..
  const onSignUp = (e) => {
    e.preventDefault();

    if (username.length < 4 || password.length < 4) {
      swal.fire({
        title: "Oops!",
        text: "Username and password must be at least 4 characters long",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    }

    console.log("captcha is ", captcha);
    if(!captcha){
      swal.fire({
        title: "Oops!",
        text: "Please complete the captcha",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
      
    }else{
      setLoading(true);
      Axios.post("https://auth-server-x-fab950a2305f.herokuapp.com/v1/auth/capcheck", {
        captcha: captcha
      }).then((response) => {
        console.log("succesfull captcha response  ", response.data);
        setCaptcha("");
        //now handles login.
        handleRegister();
      }).catch((error) => {
        console.log("error in captcha response ", error);
        swal.fire({
          title: "Oops!",
          text: "Captcha verification failed",
          icon: "warning",
          confirmButtonText: "Okay",
        });
        setLoading(false);
      });
    }
  }

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} data-testid="avatar">
            <HowToRegOutlinedIcon />
          </Avatar>
          <h2>Register</h2>
        </Grid>
        <form onSubmit={onSignUp}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="username-input"
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="password-input"
          />
          <ReCAPTCHA
            sitekey="6Leca74pAAAAALKX8Ze8i7OvxtOmrWyoRc6WS8vE"
            onChange={(token) => setCaptcha(token)}
            onExpired={() => setCaptcha("")}
            data-testid="recaptcha"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            data-testid="register-button"
          >
            Register
          </Button>
        </form>
        <Typography data-testid="login-link">
          {" "}
          Want to Login ? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
      <DynamicBackdrop open={loading} />
    </Grid>
  );
  
};

export default Register;
