import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "src/components/auth/login";
function App() {
  return (
    <Router>
      <Routes>
        {/* login */}
        <Route path="/login" exact element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
