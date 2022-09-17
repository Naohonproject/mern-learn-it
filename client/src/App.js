import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Landing from "./components/layout/Landing";
import Auth from "./components/views/Auth";
import DashBoard from "./components/views/DashBoard";
import AuthContextProvider from "./context/authContext";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route index path="/" element={<Landing />} />
          <Route path="/login" element={<Auth authRoute="login" />} />
          <Route path="/register" element={<Auth authRoute="register" />} />
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;