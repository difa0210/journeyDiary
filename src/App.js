import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import {
  Home,
  Navbar,
  Bookmark,
  Profile,
  DetailJourney,
  NewJourney,
  EditJourney,
} from "./pages/Index";
import ModalRegister from "./components/ModalRegister";
import ModalLogin from "./components/ModalLogin";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import UserRoute from "./components/UserRoute";
import ModalEditProfile from "./components/ModalEditProfile";

export default function App() {
  const [user, setUser] = useContext(UserContext);
  const token = localStorage.getItem("token");

  const checkUser = async () => {
    try {
      setAuthToken(token);
      const response = await API.get("/check-auth");
      let payload = response.data.user;
      setUser(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) checkUser();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route
          exact
          path="/bookmarks"
          element={
            <UserRoute>
              <Bookmark />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/my-journeys"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        />

        <Route
          exact
          path="/detailJourney/:journeyId"
          element={<DetailJourney />}
        />
        <Route
          exact
          path="/journey"
          element={
            <UserRoute>
              <NewJourney />
            </UserRoute>
          }
        />
        <Route
          exact
          path="/journey/:journeyId"
          element={
            <UserRoute>
              <EditJourney />
            </UserRoute>
          }
        />
      </Routes>
      <ModalEditProfile />
      <ModalRegister />
      <ModalLogin />
    </Router>
  );
}
