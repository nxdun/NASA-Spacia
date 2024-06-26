/*
response code cheatsheet

400 : no cookies, unpw required
200 : cookies set, login successful
500 : internal server error
*/
import axios from 'axios';
import Swal from 'sweetalert2';

export const login = async (username, password) => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_AUTH_SERVER}/v1/auth/login/`, {
            username: username,
            password: password
        });
        //console log the response
        console.log("login res:",JSON.stringify(response));
  
  
      if (response.status === 200) {
        
        const data = response.data;
        localStorage.setItem('auth', data.token);
        localStorage.setItem('username', username);
        return true; // Return true if login is successful
      } else {
        return false; // Return false if login fails
      }
    } catch (error) {
      console.error('Login failed:', error);
      Swal.fire({
        title: "Oops!",
        text: "Username or password is incorrect",
        icon: "error",
        confirmButtonText: "Try again",
      });

      return false; // Return false if an error occurs during login
    }
  };
  
  export const register = async (username, password) => {
    try {


        const response = await axios.post('https://auth-server-x-fab950a2305f.herokuapp.com/v1/auth/register/', {
            username: username,
            password: password
        });
  
        console.log(JSON.stringify("register res:",response));
  
  
      if (response.status === 200) {
        const data = response.data;
        console.log("reg data",JSON.stringify(data));
        return true; // Return true if login is successful
      } else {
        // Handle authentication errors
        
        return false; // Return false if login fails
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false; // Return false if an error occurs during login
    }
  };

  export const isAuthenticated = () => {
    return !!localStorage.getItem('auth');
  };
