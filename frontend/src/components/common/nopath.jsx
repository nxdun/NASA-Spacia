import { Paper, Typography } from "@mui/material";

const ErrorPath = () => {
  const hasToken = localStorage.getItem("username");

  return (
    <Paper
      sx={{
        backgroundColor: "#000", // Black background
        padding: "20px",
        color: "#fff", // White text
        textAlign: "center",
        maxWidth: "400px",
        margin: "0 auto", // Center horizontally
        position: "fixed",
        top: "50%", // Center vertically
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      data-testid="error-paper"
    >
      <Typography variant="h6" gutterBottom data-testid="error-message">
        Error!! invalid path <br/><br/><br/> {hasToken ? `${localStorage.getItem("username")} !! You are already logged in` : "Not a valid path."}
      </Typography>
      <Typography data-testid="possible-routes">
        Possible routes 
        <br />
        <a href="/login" data-testid="login-link">Login</a>
        <br />
        <a href="/register" data-testid="register-link">Register</a>
        {hasToken && <span><br/><a href="/userspace" data-testid="userspace-link">User Space</a></span>}
      </Typography>
    </Paper>
  );
  
};

export default ErrorPath;
