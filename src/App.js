import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { Home, Journey, Navbar, Bookmark } from "./pages/Index";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/journey" element={<Journey />} />
        <Route exact path="/bookmark" element={<Bookmark />} />
      </Routes>
    </Router>
  );
}
