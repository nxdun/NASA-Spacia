import { useEffect, useState } from "react";
import axios from "axios"; // or any library for making HTTP requests
import PropTypes from "prop-types";

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
              "https://auth-server-x-fab950a2305f.herokuapp.com/v1/auth/validate",
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
              console.error("Error:", error);
              // Handle error
              setAuthenticated(true);
            });
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error
        setAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return authenticated ? children : null;
};

AuthChecker.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthChecker;
