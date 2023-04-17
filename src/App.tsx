import "./App.css";
// import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";
import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import LoginForm from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
