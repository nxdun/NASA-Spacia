import axios from 'axios';
export const login = async (username, password) => {
    try {

        const response = await axios.post('https://auth-server-x-fab950a2305f.herokuapp.com/v1/auth/login/', {
            username: username,
            password: password
        });
        //console log the response
        console.log(JSON.stringify(response));
  
  
      if (response.status === 200) {
        const data = response.data;
        //get the cookie from the response
        localStorage.setItem('auth', data.token);
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
  
  export const logout = () => {
    localStorage.removeItem('auth');
  };
  
  export const isAuthenticated = () => {
    return !!localStorage.getItem('auth');
  };