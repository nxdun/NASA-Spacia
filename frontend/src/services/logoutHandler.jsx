
import axios from "axios";
import swal from "sweetalert2";

export const LogoutHandler = () => {
  try {
      console.log("logout initated");
      //no need to wait for the response, just log out
      localStorage.removeItem("auth");
      localStorage.removeItem("username");
      const response = axios.get(
        `${import.meta.env.VITE_AUTH_SERVER}/v1/auth/logout/`
      );
      console.log("logout res:", JSON.stringify(response));
      //return logout alert in return statement
      return swal.fire({
        title: "User Logged Out",
        icon: "success",
        confirmButtonText: "Okay"
      
    }).then((result) => {
      if (result.isConfirmed) {
        //navigate to login page
        window.location.href = "/login";
      }
    });
    
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
