import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "src/services/authService";
import swal from "sweetalert2";
import DynamicBackdrop from "src/components/common/backdrop";
import ReCAPTCHA from "react-google-recaptcha";
import Axios from "axios";
const Login = () => {
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
    background: "rgba(255, 255, 255, 0.5)", // Semi-transparent background color
    backdropFilter: "blur(30px)", // Apply background blur
    WebkitBackdropFilter: "blur(30px)", // Webkit version for Safari
    boxShadow: "none", // Remove box shadow to maintain the glass effect,
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const handleLogin = async () => {
    if (username.length < 4 || password.length < 4) {
      swal.fire({
        title: "Oops!",
        text: "Username and password must be at least 4 characters long",
        icon: "warning",
        confirmButtonText: "Go back",
      });
      return;
    }
    //axios request to backend
    const success = await login(username, password);
    setLoading(false);
 
    if (success) {
      console.log("Login successful!");
      let timerInterval;
      swal
        .fire({
          title: "Login successful!",
          text: `Redirecting to user space`,
          icon: "success",
          showCancelButton: false,
          timer: 2000,
          timerProgressBar: true,
          confirmButtonColor: "#FF2E63",
          cancelButtonColor: "#08D9D6",
          didOpen: () => {
            swal.showLoading();
            // Access the timer element within the Swal popup
            const timerElement = document.querySelector(
              ".swal2-timer-progress-bar"
            );
            timerInterval = setInterval(() => {
              if (timerElement) {
                timerElement.style.width = `${swal.getTimerLeft()}%`;
              }
            }, 400);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        })
        .then((result) => {
          if (result.dismiss === swal.DismissReason.timer) {
            window.location.href = "/userspace";
          }
        });
    }
  };

  const onSignUp = (e) => {
    e.preventDefault();

    if (!captcha) {
      swal.fire({
        title: "Oops!",
        text: "Please complete the captcha",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    } else {
      setLoading(true);
      Axios.post(
        "https://auth-server-x-fab950a2305f.herokuapp.com/v1/auth/capcheck",
        {
          captcha: captcha,
        }
      )
        .then((response) => {
          console.log("succesfull captcha response  ", response.data);
          setCaptcha("");
          //now handles login
          handleLogin();
        })
        .catch((error) => {
          console.log("error in captcha response ", error);
          swal.fire({
            title: "Oops!",
            text: "Captcha verification failed",
            icon: "error",
            confirmButtonText: "Okay",
          });
          setLoading(false);
        });
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle} data-testid="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
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
          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
            data-testid="remember-checkbox"
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
            data-testid="signin-button"
          >
            Sign in
          </Button>
        </form>
        <Typography data-testid="forgot-password">
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography data-testid="signup-link">
          {" "}
          Do you have an account ?<Link href="/register">Sign Up</Link>
        </Typography>
      </Paper>
      <DynamicBackdrop open={loading} />
    </Grid>
  );
  
};

export default Login;
