import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Backdrop,
} from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { register } from "../../services/authService";
import swal from "sweetalert2";// alert library
import "ldrs/infinity";  //loading spinner

// Default values shown

const Login = () => {
  //use states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //styles
  const paperStyle = {
    padding: 30,
    height: "60vh",
    width: 290,
    margin: "15vh auto",
    opacity: 0.9,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  //main auth handler
  const handleLogin = async (e) => {
    e.preventDefault();
    //chack username and password size
    if (username.length < 4 || password.length < 4) {
      swal.fire({
        title: "Oops!",
        text: "Username and password must be atleast 4 characters long",
        icon: "warning",
        confirmButtonText: "Okay",
      });
      return;
    }
    setLoading(true);
    const success = await register(username, password);
    setLoading(false);
    if (success) {
      console.log("Registeration successful!");
      swal.fire({
        title: "Registration Successful!!",
        icon: "success",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } else {
      swal.fire({
        title: "registration Failed",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <HowToRegOutlinedIcon />
          </Avatar>
          <h2>Register</h2>
        </Grid>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            placeholder="Enter username"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Register
          </Button>
        </form>
        <Typography>
          {" "}
          Want to Login ? <Link href="/login">Login</Link>
        </Typography>
      </Paper>
      <Backdrop
        open={loading}
        style={{ zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <l-infinity
          size="55"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="white"
        ></l-infinity>
      </Backdrop>
    </Grid>
  );
};

export default Login;
