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
  Backdrop,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../../services/authService";
import swal from "sweetalert2";
import "ldrs/infinity";

// Default values shown

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      console.log("Login successful!");
      swal.fire({
        title: "Login Successful",
        icon: "success",
        confirmButtonText: "Continue",
      });
    } else {
      console.log("Login failed. Please try again.");
      swal.fire({
        title: "Login Failed",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
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
          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?<Link href="#">Sign Up</Link>
        </Typography>
      </Paper>
      <Backdrop
        open={loading}
        style={{ zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <l-infinity
          size="55"
          stroke="4"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.3"
          color="black"
        ></l-infinity>
      </Backdrop>
    </Grid>
  );
};

export default Login;
