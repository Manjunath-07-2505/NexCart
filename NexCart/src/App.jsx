import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;