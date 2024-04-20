import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogoutHandler } from 'src/services/logoutHandler';
import LoginScreen from 'src/components/auth/login';
import RegisterScreen from 'src/components/auth/register';
import UserSpace from 'src/components/userSpace/userspace';
import AuthChecker from 'src/services/authChecker';
import Particle from 'src/components/common/particles';


const App = () => {
  return (
    <>
    <Particle /> {/* particles background */}
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/logout" element={<LogoutHandler />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/userspace" element={<AuthChecker><UserSpace /></AuthChecker>} />
      </Routes>
    </Router>
    </>
  );

};

export default App;
