import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Landing from "./components/layout/Landing";
import Auth from "./components/views/Auth";
import AuthContextProvider from "./context/authContext";
import PostContextProvider from "./context/postContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./components/views/About";
import DashBoard from "./components/views/DashBoard";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route index path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute component={DashBoard} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoute component={About} />}
            />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
