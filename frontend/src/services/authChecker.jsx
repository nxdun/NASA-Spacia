import { useEffect, useState } from "react";
import axios from "axios"; // or any library for making HTTP requests
import PropTypes from "prop-types";
import DynamicBackdrop from "src/components/common/backdrop";
const AuthChecker = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        //if local storage auth token is not present, set authenticated to false
        if (!localStorage.getItem("auth")) {
          setAuthenticated(false);
          window.location.href = "/login";
          return;
        } else {
          console.log(":::::::poopiels", localStorage.getItem("auth"));

          const headers = {
            "Content-Type": "application/json",
            auth: localStorage.getItem("auth"),
          };

          axios
            .get(
              `${import.meta.env.VITE_AUTH_SERVER}/v1/auth/validate`,
              { headers }
            )
            .then((response) => {
              console.log(":::::::poopie RES", JSON.stringify(response));
              // Handle response
              if (response.status === 200) {
                setAuthenticated(true);
              }
            })
            .catch((error) => {
              //check error code and redirect to login page
              if (error.response.status === 401) {
                alert("Session expired. Please login again.");
                window.location.href = "/logout";
              }
              // Handle error
              setAuthenticated(true);
            });
        }
      } catch (error) {

        console.error("Auth Error:", error);
        window.location.href = "/login";
        // Handle error
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return authenticated ? children : <DynamicBackdrop open={!authenticated} />;
};

AuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthChecker;
